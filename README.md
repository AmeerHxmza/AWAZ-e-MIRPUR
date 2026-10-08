# AWAZ-e-MIRPUR (آوازِ میرپور) 🏛️
### Autonomous Multi-Agent Civic Governance & Public Reporting Platform for Mirpur City, AJK

[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688.svg?style=flat&logo=fastapi)](https://fastapi.tiangolo.com)
[![Next.js](https://img.shields.io/badge/Frontend-Next.js_16-black.svg?style=flat&logo=next.js)](https://nextjs.org/)
[![OpenAI](https://img.shields.io/badge/AI-GPT--4o--mini_%7C_Whisper-412991.svg?style=flat&logo=openai)](https://openai.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**AWAZ-e-MIRPUR (آوازِ میرپور)** is an autonomous AI-driven civic reporting and municipal governance platform built specifically for **Mirpur City, Azad Jammu & Kashmir (AJK)**. Aligned with **UN Sustainable Development Goals (SDG 6: Clean Water and Sanitation & SDG 11: Sustainable Cities and Communities)**, AWAZ-e-MIRPUR empowers citizens to report civic crises—such as water supply shortages, damaged roads, sewage blockages, and waste dumping—either by **typing in Urdu/English** or simply recording a **native Urdu voice note** directly in their browser.

An autonomous **6-agent AI architecture** processes every report in real time, classifies the issue, retrieves relevant municipal bylaws, drafts formal bilingual petitions (English & Urdu), clusters geographic hotspots using Machine Learning, routes complaints to responsible authorities, and auto-escalates unresolved tickets.

---

## 🌟 Key Features

- 🗣️ **Multimodal Voice & Text Intake:** Citizens can type in English, Urdu, or Roman Urdu, or record voice memos. In-browser audio processing converts voice notes to 16kHz mono audio transcribed using OpenAI Whisper.
- 🤖 **6-Agent Autonomous AI Pipeline:** 
  1. **Agent 1 (Intake & NLP):** Analyzes and classifies the issue with Pydantic structured schemas.
  2. **Agent 2 (RAG Regulations):** Retrieves local municipal bylaws and agency SLAs (Public Health Engineering, MCM, MDA).
  3. **Agent 3 (Legal Drafter):** Synthesizes formal administrative petition letters in both Urdu and English.
  4. **Agent 4 (Geospatial Clustering):** Uses GPS coordinates and distance clustering (DBSCAN + Haversine) to detect localized civic outbreaks on interactive Folium heatmaps.
  5. **Agent 5 (Authority Router & Dispatcher):** Dynamically assigns and alerts authorities (e.g. *Public Health Engineering Mirpur*, *Municipal Corporation Mirpur (MCM)*, *Mirpur Development Authority (MDA)*).
  6. **Agent 6 (SLA Tracker & Escalation Engine):** Runs in the background via APScheduler to automatically escalate tickets stagnant for >72 hours.
- 🗺️ **Interactive Geographic Heatmap:** Live maps visualizing problem clusters across sectors of Mirpur City.
- 🔐 **Role-Based Authentication:** Citizen portal with complaint history and administrative command center for municipal officials.

---

## 🏗️ System Architecture

```
  Citizen Complaint (Text / Urdu Voice Note)
                     │
                     ▼
  ┌────────────────────────────────────────────────────────┐
  │         AWAZ-e-MIRPUR Multi-Agent AI Pipeline          │
  │                                                        │
  │  [Agent 1: Intake & NLP Classification]                │
  │       Categorizes into water, road, garbage, sewage    │
  │            │                                           │
  │            ▼                                           │
  │  [Agent 2: RAG Municipal Retrieval]                    │
  │       Retrieves municipal bylaws & response SLAs       │
  │            │                                           │
  │            ▼                                           │
  │  [Agent 3: Legal Complaint Letter Drafter]             │
  │       Drafts formal administrative letters (EN + UR)   │
  │            │                                           │
  │            ▼                                           │
  │  [Agent 5: Intelligent Router & Notifier]              │
  │       Routes to MCM, MDA, or Water Board               │
  │            │                                           │
  │            ▼                                           │
  │  [Agent 4: Geospatial Clustering (Geo Agent)]          │
  │       GPS Hotspot Detection (DBSCAN + Folium Heatmap)  │
  │                                                        │
  │  [Agent 6: Background SLA Escalation Engine]           │
  │       APScheduler cron job; auto-escalates >72h        │
  └────────────────────────────────────────────────────────┘
```

---

## 🛠️ Technology Stack

| Domain | Technologies |
|---|---|
| **Frontend** | Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS, Axios, Web Audio API |
| **Backend** | FastAPI, Python 3.12, Uvicorn, SQLAlchemy 2.0, SQLite / PostgreSQL |
| **AI & LLM Orchestration** | OpenAI API (`gpt-4o-mini`), LangChain, OpenAI Whisper STT |
| **RAG & Vector Search** | ChromaDB & Document Knowledge Base |
| **Geospatial & ML** | Folium (Leaflet), Scikit-Learn DBSCAN, Haversine metric |
| **Security & Auth** | JWT Authentication (`python-jose`), Bcrypt password hashing |
| **Background Jobs** | APScheduler, SMTPLib email dispatch |

---

## 🚀 Local Development Setup

### Prerequisites
- Node.js (v18+)
- Python (v3.10+)
- OpenAI API Key

### 1. Backend Setup
```bash
cd backend

# Create and activate virtual environment
python -m venv .venv

# Windows:
.\.venv\Scripts\activate
# macOS/Linux:
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Configure environment variables
cp .env.example .env
```

Open `backend/.env` and insert your API keys:
```env
SECRET_KEY=your_secret_key_here
ADMIN_SECRET=your_admin_secret_key
OPENAI_API_KEY=sk-...your_openai_key...
```

Run the backend server:
```bash
uvicorn main:app --reload --port 8000
```
API will be live at `http://127.0.0.1:8000` (Interactive Swagger docs at `http://127.0.0.1:8000/docs`).

### 2. Frontend Setup
```bash
cd frontend

# Install packages
npm install

# Configure environment variables
cp .env.example .env.local
```

Ensure `frontend/.env.local` has:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Start the frontend development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) (or `http://localhost:3001` if 3000 is busy) in your browser.

---

## ☁️ Deployment Guide

### Deploy Backend on Render
The project is pre-configured with [render.yaml](render.yaml):
1. Push your repository to GitHub.
2. In [Render Dashboard](https://dashboard.render.com), click **New +** → **Blueprint** and connect this repository.
3. Add your environment variables (`OPENAI_API_KEY`, `SECRET_KEY`, `ADMIN_SECRET`) in Render's environment settings.
4. Render will automatically build with `pip install -r requirements.txt` and start with `uvicorn main:app --host 0.0.0.0 --port $PORT`.

### Deploy Frontend on Vercel
1. Import the repository on [Vercel](https://vercel.com).
2. Set root directory to `frontend`.
3. Add Environment Variable:
   - `NEXT_PUBLIC_API_URL`: Your deployed Render API URL (e.g. `https://awaz-e-mirpur-api.onrender.com`).
4. Click **Deploy**.

---

## 🎯 Author & Acknowledgements
- **Author:** Ameer Hamza ([@AmeerHxmza](https://github.com/AmeerHxmza))
- Developed for civic innovation and AI-assisted governance in Mirpur City, Azad Jammu & Kashmir.
