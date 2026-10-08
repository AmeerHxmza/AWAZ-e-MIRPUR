# AWAZ-e-MIRPUR (آوازِ میرپور) 🏛️
### Autonomous Multi-Agent Civic Governance & Public Reporting Platform for Mirpur City, AJK

[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688.svg?style=flat&logo=fastapi)](https://fastapi.tiangolo.com)
[![Next.js](https://img.shields.io/badge/Frontend-Next.js_16-black.svg?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-3178C6.svg?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Python](https://img.shields.io/badge/Language-Python_3.12-3776AB.svg?style=flat&logo=python)](https://python.org)
[![OpenAI](https://img.shields.io/badge/AI-GPT--4o--mini_%7C_Whisper--1-412991.svg?style=flat&logo=openai)](https://openai.com/)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind_CSS_v4-38B2AC.svg?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![UN SDG 6](https://img.shields.io/badge/UN_SDG-6:_Clean_Water-00AED9.svg?style=flat)](https://sdgs.un.org/goals/goal6)
[![UN SDG 11](https://img.shields.io/badge/UN_SDG-11:_Sustainable_Cities-FD9D24.svg?style=flat)](https://sdgs.un.org/goals/goal11)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**AWAZ-e-MIRPUR (آوازِ میرپور)** is an enterprise-grade, autonomous AI-driven civic reporting and public municipal governance platform built specifically for **Mirpur City, Azad Jammu & Kashmir (AJK)**. 

Aligned with **UN Sustainable Development Goals (SDG 6: Clean Water and Sanitation & SDG 11: Sustainable Cities and Communities)**, AWAZ-e-MIRPUR eliminates traditional bureaucratic inertia. It empowers citizens to report critical municipal crises—such as water pipeline bursts, road collapses, open sewage overflows, and illicit waste dumping—either by **typing in Urdu/English/Roman Urdu** or simply recording a **native Urdu voice note** directly in their browser.

An autonomous **6-agent AI architecture** processes every report in real time: classifying the issue with structured Pydantic schemas, retrieving statutory municipal bylaws via RAG, drafting formal bilingual legal petitions (English & Urdu), detecting geographic outbreak clusters using unsupervised machine learning (DBSCAN + Haversine), dispatching complaints to responsible municipal authorities, and enforcing accountability via background SLA escalation watchdogs.

---

## 🌟 Key Highlights for Recruiters & Engineers

- 🧠 **Autonomous Multi-Agent Orchestration:** A sequential 6-agent AI pipeline designed with strict separation of concerns, resilient fallback mechanisms, and zero external dependency locking.
- 🎙️ **Multimodal Urdu Audio Pipeline:** In-browser Web Audio API converts citizen voice recordings to 16kHz mono WAV, processed through OpenAI Whisper-1 primed with a custom vocabulary tailored to Mirpur municipal agencies and local terminology.
- ⚡ **Ultra-Efficient Cost Architecture:** Production-engineered to deliver high throughput and low latency on minimal compute and API budgets:
  - **LLM Reasoning & Legal Drafting:** OpenAI `gpt-4o-mini` ($0.15 / 1M input tokens) with temperature-calibrated schemas.
  - **Vector Embeddings:** OpenAI `text-embedding-3-small` ($0.02 / 1M tokens) with instant in-memory fallback.
  - **Speech Transcription:** OpenAI `whisper-1` ($0.006 / minute audio).
- 📍 **Geospatial Hotspot Detection:** Machine learning clustering using **Scikit-Learn DBSCAN** with a spherical Haversine metric (500m epsilon) to automatically detect localized civic outbreaks on interactive Folium/Leaflet heatmaps.
- ⏱️ **Autonomous SLA Watchdog & Escalation Engine:** Background cron engine powered by APScheduler running hourly audits. Stagnant tickets exceeding 72 hours are automatically escalated with audit logs sent to administrative oversight.
- 🛡️ **Production-Ready Security & Modern Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, FastAPI, SQLAlchemy 2.0, JWT authentication (`python-jose`), and Bcrypt password hashing.

---

## 🏗️ System Architecture & Data Flow

```
                      CITIZEN SUBMISSION
               (Urdu Voice Note / Typed Description)
                                │
                                ▼
        ┌───────────────────────────────────────────────┐
        │        FASTAPI GATEWAY / BACKGROUND WORKER    │
        └───────────────────────┬───────────────────────┘
                                │
                                ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   AWAZ-e-MIRPUR 6-AGENT AI PIPELINE                    │
│                                                                        │
│   [AGENT 1: Multimodal Intake & NLP Classification]                    │
│   • OpenAI Whisper-1 Audio Transcriber (16kHz Urdu/English)            │
│   • GPT-4o-mini Classifier (Water, Road, Sewage, Garbage, Other)       │
│   • Pydantic v2 Strict JSON Schema Validation                          │
│                                │                                       │
│                                ▼                                       │
│   [AGENT 2: Municipal Knowledge RAG Agent]                             │
│   • ChromaDB Vector Store + text-embedding-3-small                     │
│   • Local Mirpur Municipal Bylaws, PHE Regulations, & SLA Benchmarks   │
│                                │                                       │
│                                ▼                                       │
│   [AGENT 3: Bilingual Administrative Petition Drafter]                 │
│   • GPT-4o-mini Legal Drafter (concise, authoritative persona)         │
│   • Generates formal bilingual legal petitions: English + Urdu         │
│                                │                                       │
│                                ▼                                       │
│   [AGENT 5: Intelligent Authority Router & Notifier]                   │
│   • Resolves jurisdiction: PHE Water Board / MCM / MDA / DC Office     │
│   • Formats dispatch audit trail & dispatches notifications            │
│                                │                                       │
│                                ▼                                       │
│   [AGENT 4: Geospatial Clustering (Geo Agent)]                         │
│   • Scikit-Learn DBSCAN + Haversine (500m Outbreak Radius)             │
│   • Renders dynamic Folium / Leaflet Heatmap                           │
│                                                                        │
│   [AGENT 6: Autonomous SLA Tracker & Escalation Engine]                │
│   • APScheduler background cron job (Hourly audit)                     │
│   • Auto-escalates stagnant complaints past 72h threshold              │
└────────────────────────────────────────────────────────────────────────┘
                                │
                                ▼
             MUNICIPAL RESOLUTION & CITIZEN TRACKING
            (Real-Time Public Heatmap + Status Tracker)
```

---

## 🤖 Deep Dive: The 6 Autonomous AI Agents

| Agent | Module | Primary Technologies | Core Responsibility |
|---|---|---|---|
| **Agent 1** | `agent1_intake.py` | OpenAI Whisper-1, GPT-4o-mini, Pydantic v2 | **Intake & NLP Classifier:** Transcribes raw voice audio; extracts issue keywords; determines language; classifies category with strict schema validation. |
| **Agent 2** | `agent2_rag.py` | ChromaDB, text-embedding-3-small, LangChain | **Regulatory RAG Retriever:** Queries local municipal bylaws, water authority acts, and statutory response SLAs for the specific crisis. |
| **Agent 3** | `agent3_drafter.py` | GPT-4o-mini, Prompt Engineering | **Legal Petition Drafter:** Synthesizes formal administrative petition letters addressed to department heads in both official English and Urdu. |
| **Agent 4** | `agent4_geo.py` | Scikit-Learn DBSCAN, Haversine, Folium | **Geospatial Clusterer:** Groups GPS coordinates into density clusters to identify multi-resident systemic failures; updates live map. |
| **Agent 5** | `agent5_router.py` | Python SMTP, Rule-based Dispatcher | **Authority Router & Dispatcher:** Routes complaints to PHE, Municipal Corporation Mirpur (MCM), or MDA; logs notification records. |
| **Agent 6** | `agent6_tracker.py` | APScheduler, SQLAlchemy 2.0 | **SLA Escalation Engine:** Periodic background worker identifying tickets pending >72h without progress and escalating them for audit. |

---

## 🏛️ Municipal Departments Covered

- **Public Health Engineering (PHE) / Water Board Mirpur:** Drinking water shortages, pipeline ruptures, water contamination, turbidity, and tube-well electrical failures.
- **Municipal Corporation Mirpur (MCM) - Works & Sanitation:** Open drainage overflows, sewer line blockages, street garbage dumps, sanitary disposal, and neighborhood hygiene.
- **Mirpur Development Authority (MDA):** Main road cave-ins, potholes, street infrastructure, sidewalks, road dividers, and urban development.
- **Deputy Commissioner Office Mirpur (District Administration):** Public property encroachments, urgent hazard emergencies, and multi-agency coordination.

---

## 💻 Tech Stack & Engineering Decisions

### Frontend
- **Framework:** Next.js 16 (App Router, Server & Client Components)
- **UI Library:** React 19, TypeScript
- **Styling:** Tailwind CSS v4, Custom CSS Design Tokens
- **Typography:** IBM Plex Sans & IBM Plex Serif (Institutional Civic Theme)
- **Audio Processing:** Web Audio API (in-browser float32 to 16kHz mono conversion)
- **API Client:** Axios with JWT interceptors

### Backend & AI Pipeline
- **API Gateway:** FastAPI (Asynchronous endpoints, CORS middleware, Dependency Injection)
- **ASGI Server:** Uvicorn
- **ORM & Database:** SQLAlchemy 2.0 with SQLite (configurable to PostgreSQL via DATABASE_URL)
- **AI Orchestration:** OpenAI Python SDK & LangChain
- **LLM Models:** `gpt-4o-mini` (temperature 0 to 0.2 for deterministic classification and drafting)
- **Speech-to-Text:** OpenAI `whisper-1` with custom Urdu/English vocabulary prompting
- **Vector Search:** ChromaDB with `text-embedding-3-small` (1536 dimensions)
- **Machine Learning:** Scikit-Learn DBSCAN with spherical radian Haversine metric
- **Mapping:** Folium / Leaflet HTML generation
- **Task Scheduling:** APScheduler (BackgroundScheduler)
- **Security:** JWT authentication (`python-jose`), Bcrypt password hashing, Pydantic v2 validation

---

## 📁 Repository Structure

```
d:\AWAZ\
├── backend/
│   ├── agents/
│   │   ├── agent1_intake.py       # Agent 1: Audio STT & NLP classification
│   │   ├── agent2_rag.py          # Agent 2: Municipal bylaw RAG retrieval
│   │   ├── agent3_drafter.py       # Agent 3: Bilingual legal petition drafter
│   │   ├── agent4_geo.py          # Agent 4: DBSCAN geospatial clustering
│   │   ├── agent5_router.py       # Agent 5: Authority routing & dispatch
│   │   ├── agent6_tracker.py      # Agent 6: 72h SLA escalation watchdog
│   │   └── pipeline.py            # Master agent pipeline orchestrator
│   ├── auth/                      # JWT auth router, tokens, & user dependencies
│   ├── data/
│   │   └── documents/             # Statutory municipal bylaws & regulations
│   ├── rag/                       # Chroma vectorstore & document embedder
│   ├── routers/
│   │   ├── admin.py               # Administrative oversight & metrics
│   │   ├── complaints.py          # Complaint CRUD & background trigger
│   │   ├── heatmap.py             # Geospatial heatmap endpoints
│   │   └── stt.py                 # Multipart audio upload & Whisper transcription
│   ├── utils/
│   │   ├── admin_notify.py        # SMTP email dispatch & notification logs
│   │   ├── notifications.py       # Dispatch wrappers
│   │   └── whisper_stt.py         # 16kHz audio conversion & Whisper client
│   ├── database.py                # SQLAlchemy engine & session maker
│   ├── models.py                  # User, Complaint, and Notification ORM models
│   ├── schemas.py                 # Pydantic v2 input/output schemas
│   ├── main.py                    # FastAPI entrypoint & scheduler lifespan
│   └── requirements.txt           # Python dependencies
│
├── frontend/
│   ├── app/
│   │   ├── (auth)/                # Citizen login & registration pages
│   │   ├── account/               # Citizen profile & history
│   │   ├── admin/                 # Municipal official oversight command center
│   │   ├── heatmap/               # Fullscreen interactive civic issue heatmap
│   │   ├── reports/               # Citizen submitted complaints dashboard
│   │   ├── status/[id]/           # Real-time ticket tracker & legal petition viewer
│   │   ├── submit/                # Multimodal voice & text complaint intake
│   │   ├── layout.tsx             # Root layout with responsive civic footer
│   │   └── page.tsx               # High-conversion AWAZ-e-MIRPUR landing page
│   ├── components/
│   │   ├── Navbar.tsx             # Bilingual navigation header
│   │   ├── LandingStats.tsx       # Live public metrics counter
│   │   └── ui/                    # Reusable Button, Card, and Input components
│   ├── lib/
│   │   ├── api.ts                 # Axios instance with auth headers
│   │   └── blobToWav.ts           # Browser Web Audio API 16kHz mono converter
│   └── package.json               # Next.js 16 dependencies
│
├── scripts/
│   └── ping_health.py             # Cloud keep-alive daemon for Render free tier
├── render.yaml                    # Infrastructure blueprint for Render
└── README.md                      # Engineering documentation
```

---

## ⚡ Quickstart & Local Development

### Prerequisites
- **Node.js:** v18+ (v20+ recommended)
- **Python:** v3.10+ (v3.12 recommended)
- **OpenAI API Key:** Paid key (with access to `gpt-4o-mini`, `whisper-1`, `text-embedding-3-small`)

---

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv .venv

# Activate virtual environment
# Windows:
.\.venv\Scripts\activate
# macOS/Linux:
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Configure environment variables
cp .env.example .env
```

Open `backend/.env` and supply your keys:
```env
SECRET_KEY=your_strong_secret_key_here
ADMIN_SECRET=your_admin_bootstrap_secret
OPENAI_API_KEY=sk-proj-...your_openai_key...

# Cheap model defaults
OPENAI_INTAKE_MODEL=gpt-4o-mini
OPENAI_DRAFT_MODEL=gpt-4o-mini

# Optional SMTP for email notifications
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
ADMIN_NOTIFY_EMAIL=
```

Start the FastAPI application:
```bash
uvicorn main:app --reload --port 8000
```
- API Gateway: `http://127.0.0.1:8000`
- Interactive Swagger API Documentation: `http://127.0.0.1:8000/docs`
- Health Check: `http://127.0.0.1:8000/health`

---

### 2. Frontend Setup

```bash
# In a separate terminal, navigate to frontend
cd frontend

# Install npm packages
npm install

# Configure environment variables
cp .env.example .env.local
```

Ensure `frontend/.env.local` contains:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Start the Next.js development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Validating the AI Pipeline

You can verify the backend multi-agent pipeline independently using Python:

```python
# Test Agent 1 (Intake & Classification)
from agents.agent1_intake import run as run_intake
print(run_intake("ہمارے سیکٹر ایف ون میں پینے کا پانی بند ہے"))
# Output: {'category': 'water', 'language': 'urdu', 'keywords': '...', 'summary': '...'}

# Test Agent 3 (Formal Legal Drafting)
from agents.agent3_drafter import run as run_drafter
drafts = run_drafter("Road in Sector B3 is broken with deep potholes", "MDA standard SLA is 72 hours")
print(drafts['letter_english'])
print(drafts['letter_urdu'])
```

---

## ☁️ Cloud Deployment

### Backend on Render
The repository includes a ready-to-deploy [render.yaml](render.yaml) blueprint:
1. Connect your repository to [Render](https://dashboard.render.com).
2. Create a new **Web Service** from Blueprint.
3. Configure `OPENAI_API_KEY`, `SECRET_KEY`, and `ADMIN_SECRET` in the dashboard.
4. Render builds via `pip install -r requirements.txt` and executes `uvicorn main:app --host 0.0.0.0 --port $PORT`.

### Keep-Alive Daemon
Render's free tier spins down idle instances after 15 minutes. A preconfigured script is included in `scripts/ping_health.py`:
```bash
python scripts/ping_health.py https://awaz-e-mirpur-api.onrender.com
```

### Frontend on Vercel
1. Import repository on [Vercel](https://vercel.com).
2. Set root directory to `frontend`.
3. Set environment variable: `NEXT_PUBLIC_API_URL=https://awaz-e-mirpur-api.onrender.com`.
4. Deploy.

---

## 🛣️ Roadmap & Future Enhancements

- 📱 **WhatsApp & Telegram Citizen Bot:** Enable citizens to forward WhatsApp audio voice memos directly to the ingestion pipeline.
- 👁️ **Computer Vision Damage Assessment:** Add lightweight vision models to verify photo uploads of potholes, water leaks, and waste piles.
- 📊 **Municipal Executive Dashboard:** Time-series analytics tracking agency resolution speeds across MCM, MDA, and PHE.
- 📡 **Direct SMS Alerts:** Local telecom integration (e.g. Jazz / Telenor / Zong SMS gateways) for low-bandwidth citizen updates.

---

## 👨‍💻 Author & Acknowledgements

- **Developer:** Ameer Hamza ([@AmeerHxmza](https://github.com/AmeerHxmza))
- **Mission:** Developed as a scalable civic technology solution to modernize municipal accountability and empower citizens across **Mirpur City, Azad Jammu & Kashmir**.
- **License:** MIT License. Free for open-source governance and academic research.
