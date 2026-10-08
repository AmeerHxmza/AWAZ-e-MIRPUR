import json
import os
from typing import Literal

from dotenv import load_dotenv
from pydantic import BaseModel, Field

load_dotenv()


class IntakeSchema(BaseModel):
    category: Literal["water", "road", "garbage", "sewage", "other"] = Field(
        description="Single best category for this civic complaint in Mirpur City AJK",
    )
    keywords: str = Field(default="", description="Comma-separated keywords (Urdu or English)")
    language: Literal["urdu", "english", "mixed"] = Field(
        default="mixed",
        description="Main language of the complaint text",
    )
    summary: str = Field(default="", description="One short sentence summarizing the issue")


def _run_with_openai_direct(text: str, model: str) -> dict:
    from openai import OpenAI
    client = OpenAI()

    system_prompt = (
        "You classify civic complaints for Mirpur City AJK (MirpurAwaz). "
        "Text may be Urdu, English, or mixed.\n"
        "Categories:\n"
        "- water: water supply, pipes, taps, shortage (پانی، پائپ)\n"
        "- road: potholes, broken roads, traffic, footpaths (سڑک، گڑھا)\n"
        "- garbage: waste, bins, collection, dumping (کوڑا، صفائی)\n"
        "- sewage: drains, gutters, overflow, smell (نالی، سیوریج)\n"
        "- other: anything else\n"
        "Pick exactly one category. Fill summary in the same language as the complaint when possible.\n"
        "Respond in pure JSON matching this schema:\n"
        '{"category": "water"|"road"|"garbage"|"sewage"|"other", "keywords": "...", "language": "urdu"|"english"|"mixed", "summary": "..."}'
    )

    response = client.chat.completions.create(
        model=model,
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": f"Complaint:\n{text}"},
        ],
        response_format={"type": "json_object"},
        temperature=0,
    )
    content = response.choices[0].message.content or "{}"
    data = json.loads(content)
    validated = IntakeSchema(**data)
    return validated.model_dump()


def run(text: str) -> dict:
    text = (text or "").strip()
    if not text:
        return {
            "category": "other",
            "keywords": "",
            "language": "english",
            "summary": "",
        }

    print("Agent 1: Intake & Classification")
    model = os.getenv("OPENAI_INTAKE_MODEL", "gpt-4o-mini").strip() or "gpt-4o-mini"

    # Try LangChain first if available; fall back gracefully to direct OpenAI SDK
    try:
        from langchain_core.prompts import ChatPromptTemplate
        from langchain_openai import ChatOpenAI

        llm = ChatOpenAI(model=model, temperature=0)
        structured = llm.with_structured_output(IntakeSchema)
        prompt = ChatPromptTemplate.from_messages(
            [
                (
                    "system",
                    "You classify civic complaints for Mirpur City AJK (MirpurAwaz). "
                    "Text may be Urdu, English, or mixed.\n"
                    "Categories:\n"
                    "- water: water supply, pipes, taps, shortage (پانی، پائپ)\n"
                    "- road: potholes, broken roads, traffic, footpaths (سڑک، گڑھا)\n"
                    "- garbage: waste, bins, collection, dumping (کوڑا، صفائی)\n"
                    "- sewage: drains, gutters, overflow, smell (نالی، سیوریج)\n"
                    "- other: anything else\n"
                    "Pick exactly one category. Fill summary in the same language as the complaint when possible.",
                ),
                ("human", "Complaint:\n{text}"),
            ]
        )
        chain = prompt | structured
        out = chain.invoke({"text": text})
        data = out.model_dump()
        print(f"Agent 1: category={data.get('category')} language={data.get('language')}")
        return data
    except Exception as e_langchain:
        print(f"Agent 1 LangChain fallback to direct OpenAI client: {e_langchain}")
        try:
            data = _run_with_openai_direct(text, model)
            print(f"Agent 1 (Direct SDK): category={data.get('category')} language={data.get('language')}")
            return data
        except Exception as e_direct:
            print(f"Agent 1 error: {e_direct}")
            return {
                "category": "other",
                "keywords": "",
                "language": "mixed",
                "summary": text[:120],
            }
