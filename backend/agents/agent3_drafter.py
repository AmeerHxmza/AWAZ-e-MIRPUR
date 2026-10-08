import json
import os
from dotenv import load_dotenv

load_dotenv()


def _run_with_openai_direct(complaint_text: str, context: str) -> dict:
    from openai import OpenAI
    client = OpenAI()

    system_prompt = (
        "You are a legal assistant drafting formal civic complaints for citizens of Mirpur City AJK (Azad Jammu & Kashmir).\n"
        "Use the original complaint details and refer to any relevant rules from the context.\n"
        "Draft a professional and formal complaint letter addressed to the relevant authority.\n"
        "Provide the letter in TWO languages: English and Urdu.\n"
        "Format your response as a JSON object with keys: 'letter_english', 'letter_urdu'.\n"
        "Ensure output is ONLY raw JSON."
    )

    user_prompt = f"Original Complaint: {complaint_text}\n\nOfficial Context / Regulations:\n{context}"

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt},
        ],
        response_format={"type": "json_object"},
        temperature=0.7,
    )
    content = response.choices[0].message.content or "{}"
    return json.loads(content)


def run(complaint_text: str, context: str) -> dict:
    print("Agent 3: Complaint Letter Drafter")

    # Try LangChain first if available; fall back gracefully to direct OpenAI SDK
    try:
        from langchain_openai import ChatOpenAI
        from langchain_core.prompts import PromptTemplate

        llm = ChatOpenAI(model="gpt-4o-mini", temperature=0.7)
        prompt = PromptTemplate.from_template(
            """
            You are a legal assistant drafting formal civic complaints for citizens of Mirpur City AJK (Azad Jammu & Kashmir).
            Use the original complaint details and refer to any relevant rules from the context.
            
            Original Complaint: {complaint_text}
            
            Official Context / Regulations:
            {context}
            
            Draft a professional and formal complaint letter addressed to the relevant authority.
            Provide the letter in TWO languages: English and Urdu.
            Separate them clearly with headers.
            
            Format your response as a JSON object with keys:
            - letter_english
            - letter_urdu
            
            Ensure output is ONLY raw JSON. No markdown blocks.
            """
        )
        chain = prompt | llm
        result = chain.invoke({"complaint_text": complaint_text, "context": context})
        data = json.loads(result.content.strip("`").removeprefix("json").strip())
        return data
    except Exception as e_langchain:
        print(f"Agent 3 LangChain fallback to direct OpenAI client: {e_langchain}")
        try:
            return _run_with_openai_direct(complaint_text, context)
        except Exception as e_direct:
            print(f"Agent 3 Error parsing JSON: {e_direct}")
            return {
                "letter_english": f"Formal Complaint:\n{complaint_text}",
                "letter_urdu": f"رسمی شکایت:\n{complaint_text}",
            }
