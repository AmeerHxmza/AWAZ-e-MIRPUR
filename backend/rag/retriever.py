import os
from dotenv import load_dotenv

load_dotenv()

CHROMA_DB_DIR = os.path.join(os.path.dirname(__file__), '..', 'chroma_db')
DOCS_DIR = os.path.join(os.path.dirname(__file__), '..', 'data', 'documents')

_vectorstore = None

def get_retriever():
    global _vectorstore
    
    if _vectorstore is None:
        if not os.path.exists(CHROMA_DB_DIR):
            return None
            
        try:
            from langchain_community.vectorstores import Chroma
            from langchain_openai import OpenAIEmbeddings

            embeddings = OpenAIEmbeddings(model="text-embedding-3-small")
            _vectorstore = Chroma(persist_directory=CHROMA_DB_DIR, embedding_function=embeddings)
            return _vectorstore.as_retriever(search_kwargs={"k": 3})
        except Exception as e:
            print(f"RAG Chroma vectorstore unavailable: {e}")
            return None
        
    return _vectorstore.as_retriever(search_kwargs={"k": 3})

def _fallback_keyword_context(query: str) -> str:
    """Reads txt documents directly if ChromaDB is not yet initialized or unavailable."""
    if not os.path.exists(DOCS_DIR):
        return "No external context available."
    texts = []
    for fname in os.listdir(DOCS_DIR):
        if fname.endswith(".txt"):
            fpath = os.path.join(DOCS_DIR, fname)
            try:
                with open(fpath, "r", encoding="utf-8") as f:
                    texts.append(f.read())
            except Exception:
                pass
    if texts:
        return "\n\n".join(texts)
    return "No external context available."

def retrieve_context(query: str):
    retriever = get_retriever()
    if not retriever:
        return _fallback_keyword_context(query)
        
    try:
        docs = retriever.invoke(query)
        context = "\n\n".join([doc.page_content for doc in docs])
        return context or _fallback_keyword_context(query)
    except Exception as e:
        print(f"Retriever invoke error: {e}")
        return _fallback_keyword_context(query)
