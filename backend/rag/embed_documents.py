import os
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Chroma
from langchain_openai import OpenAIEmbeddings
from dotenv import load_dotenv

load_dotenv()

CHROMA_DB_DIR = os.path.join(os.path.dirname(__file__), '..', 'chroma_db')
DOCS_DIR = os.path.join(os.path.dirname(__file__), '..', 'data', 'documents')

def embed_documents():
    print("Starting document embedding process...")
    from langchain_core.documents import Document

    # Ensure directory exists, even if empty
    os.makedirs(DOCS_DIR, exist_ok=True)
    
    # Try to load documents
    documents = []
    
    if os.path.exists(DOCS_DIR):
        for fname in os.listdir(DOCS_DIR):
            fpath = os.path.join(DOCS_DIR, fname)
            if fname.endswith(".txt") and os.path.isfile(fpath):
                try:
                    with open(fpath, "r", encoding="utf-8") as f:
                        text = f.read()
                    if text.strip():
                        documents.append(Document(page_content=text, metadata={"source": fname}))
                except Exception as e:
                    print(f"Error reading {fname}: {e}")

    if not documents:
        print("No documents found in 'data/documents/'. Creating a sample document for RAG testing...")
        sample_doc_path = os.path.join(DOCS_DIR, "sample_wasa_rules.txt")
        sample_text = (
            "Mirpur City AJK Regulations:\n"
            "1. All water leaks must be reported to Public Health Engineering Mirpur.\n"
            "2. Standard SLA for MCM sewage fix is 48 hours.\n"
            "3. Contact: complaints@mcm.ajk.gov.pk\n"
        )
        with open(sample_doc_path, "w", encoding="utf-8") as f:
            f.write(sample_text)
        documents.append(Document(page_content=sample_text, metadata={"source": "sample_wasa_rules.txt"}))

    # Split documents into chunks
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=100)
    docs = text_splitter.split_documents(documents)
    
    print(f"Split {len(documents)} documents into {len(docs)} chunks.")

    # Create embeddings and store in Chroma
    # Make sure OPENAI_API_KEY is in .env
    embeddings = OpenAIEmbeddings(model="text-embedding-3-small")
    vectorstore = Chroma.from_documents(docs, embeddings, persist_directory=CHROMA_DB_DIR)
    
    print("Documents embedded and vector database saved to:", CHROMA_DB_DIR)

if __name__ == "__main__":
    embed_documents()
