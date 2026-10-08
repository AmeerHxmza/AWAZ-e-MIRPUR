"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LandingStats } from '@/components/LandingStats';

export default function Home() {
  const router = useRouter();
  const [trackId, setTrackId] = useState('');

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanId = trackId.trim().replace(/^#/, '');
    if (cleanId) {
      router.push(`/status/${cleanId}`);
    }
  };

  const problemCategories = [
    {
      title: 'Water Supply & Contamination',
      urdu: 'پانی کی قلت و سپلائی',
      desc: 'Pipeline bursts, dirty water contamination, low pressure, and supply cutoffs handled by Public Health Engineering.',
      authority: 'Public Health Engineering / Water Board',
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      bg: 'bg-blue-50/70 border-blue-200/80',
    },
    {
      title: 'Road Damage & Potholes',
      urdu: 'سڑکوں کی ٹوٹ پھوٹ و کھڈے',
      desc: 'Dangerous craters, cave-ins, damaged pavements, broken curbs, and unpaved sector thoroughfares.',
      authority: 'Mirpur Development Authority (MDA)',
      icon: (
        <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
      ),
      bg: 'bg-amber-50/70 border-amber-200/80',
    },
    {
      title: 'Sewage Overflows & Blockages',
      urdu: 'سیوریج و گندے پانی کی نکاسی',
      desc: 'Clogged main gutters, overflowing open drains, foul odor in residential streets, and manhole hazards.',
      authority: 'Municipal Corporation Mirpur (MCM)',
      icon: (
        <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      bg: 'bg-emerald-50/70 border-emerald-200/80',
    },
    {
      title: 'Solid Waste & Illegal Dumping',
      urdu: 'کوڑا کرکٹ اور کچرے کے ڈھیر',
      desc: 'Uncollected domestic trash, commercial dump sites, litter near schools and parks, and missing municipal bins.',
      authority: 'MCM Sanitation & Waste Dept',
      icon: (
        <svg className="w-6 h-6 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      ),
      bg: 'bg-rose-50/70 border-rose-200/80',
    },
  ];

  const agentSteps = [
    {
      num: '01',
      title: 'Multimodal Intake & NLP',
      subtitle: 'OpenAI Whisper & GPT-4o-mini',
      desc: 'Accepts Urdu voice memos or English/Urdu text. Transcribes native accents and structures problem parameters with strict JSON validation.',
      badge: 'Agent 1',
    },
    {
      num: '02',
      title: 'Municipal Knowledge RAG',
      subtitle: 'ChromaDB & Legal Bylaws',
      desc: 'Queries local Mirpur municipal regulations, Public Health Engineering bylaws, and official departmental SLAs for the specific crisis.',
      badge: 'Agent 2',
    },
    {
      num: '03',
      title: 'Bilingual Petition Drafter',
      subtitle: 'Formal Legal Generation',
      desc: 'Synthesizes professional, authoritative administrative petition letters in both Urdu and English formatted for immediate bureaucratic submission.',
      badge: 'Agent 3',
    },
    {
      num: '04',
      title: 'Authority Dispatcher',
      subtitle: 'Dynamic Department Routing',
      desc: 'Maps the issue directly to the responsible jurisdiction (MCM, MDA, PHE Water Board, or DC Office) and generates audit notifications.',
      badge: 'Agent 5',
    },
    {
      num: '05',
      title: 'Geospatial Density Clustering',
      subtitle: 'DBSCAN & Haversine Metric',
      desc: 'Clusters geo-tagged reports within 500m radius to pinpoint systemic municipal breakdowns on a real-time public heatmap.',
      badge: 'Agent 4',
    },
    {
      num: '06',
      title: 'Autonomous SLA Escalation',
      subtitle: 'APScheduler Background Cron',
      desc: 'Monitors ticket resolution clocks. Any unaddressed report exceeding 72 hours is automatically escalated to high-priority administrative audit.',
      badge: 'Agent 6',
    },
  ];

  const sectors = [
    'Sector F-1', 'Sector F-2', 'Sector F-3', 'Sector B-1', 'Sector B-2',
    'Sector B-3', 'Sector B-4', 'Sector C-1', 'Sector C-2', 'Sector C-3',
    'Sector C-4', 'Allama Iqbal Road', 'Mangla Dam Environs', 'New Mirpur City',
    'Chechian', 'Kalyal', 'Afzalpur', 'Pul Manda'
  ];

  const faqs = [
    {
      q: 'Can I record a voice note in Urdu or Pothwari?',
      a: 'Yes! AWAZ-e-MIRPUR includes an in-browser voice recorder tuned with OpenAI Whisper-1 specifically primed on Mirpur civic terms, Urdu vocabulary, and local municipal jargon.',
    },
    {
      q: 'How does the complaint reach municipal officials?',
      a: 'The autonomous pipeline classifies your issue, drafts an official legal petition letter, links local bylaws, and notifies the responsible authority (Public Health Engineering, MCM, or MDA) with full audit logging.',
    },
    {
      q: 'What happens if my complaint is not resolved within 72 hours?',
      a: 'Agent 6 runs an autonomous background tracker every hour. If an authority has not resolved or updated a ticket past the 72-hour threshold, it is automatically marked as Escalated and sent for administrative priority review.',
    },
    {
      q: 'Is my report visible to other residents of Mirpur?',
      a: 'Yes, complaints are displayed transparently on our public Geospatial Heatmap to expose civic hotspots, while personal identification details remain secure.',
    },
  ];

  return (
    <div className="space-y-20 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative pt-4 pb-12 border-b border-stone-200">
        <div className="hero-rule space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Civic Tech Innovation · Mirpur City, AJK · Aligned with UN SDG 6 &amp; SDG 11
          </div>

          <div className="space-y-3">
            <h1 className="text-[2.25rem] sm:text-[3rem] lg:text-[3.5rem] font-bold text-stone-900 leading-[1.1] tracking-tight">
              AWAZ-e-MIRPUR
              <span className="block text-[1.75rem] sm:text-[2.25rem] font-normal text-emerald-800 mt-1 font-serif">
                آوازِ میرپور — خودمختار بلدیاتی نظامِ انصاف
              </span>
            </h1>
            <p className="text-base sm:text-lg text-stone-600 max-w-3xl leading-relaxed">
              The autonomous AI civic governance platform built specifically for <strong>Mirpur City, Azad Jammu &amp; Kashmir</strong>. 
              Empowering citizens to report water outages, damaged roads, overflowing sewage, and garbage crises by typing or simply recording a native <strong>Urdu voice note</strong>.
            </p>
          </div>

          {/* Action Row */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3.5 items-stretch sm:items-center">
            <Link 
              href="/submit" 
              className="btn-civic-primary text-base !py-3.5 !px-6 shadow-sm hover:shadow transition-all text-center flex items-center justify-center gap-2"
            >
              <span>File a Civic Report</span>
              <span className="text-xs font-normal opacity-90">(شکایت درج کریں)</span>
              <svg className="w-4 h-4 ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>

            <Link 
              href="/heatmap" 
              className="btn-civic-secondary text-base !py-3.5 !px-6 text-center flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Explore Live Heatmap</span>
            </Link>
          </div>

          {/* Quick Ticket Tracker Tool */}
          <div className="pt-4 max-w-xl">
            <form onSubmit={handleTrackSubmit} className="surface-card p-3 flex flex-col sm:flex-row gap-2 items-center">
              <div className="relative flex-grow w-full">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400 text-xs font-semibold">
                  #
                </span>
                <input
                  type="text"
                  value={trackId}
                  onChange={(e) => setTrackId(e.target.value)}
                  placeholder="Have a Report ID? e.g. 1, 14, 25"
                  className="w-full pl-7 pr-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-sm focus:bg-white focus:outline-none focus:ring-1 focus:ring-[var(--app-navy)]"
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto px-4 py-2 text-xs sm:text-sm font-semibold rounded-sm bg-stone-800 text-white hover:bg-stone-900 transition-colors whitespace-nowrap"
              >
                Track Status
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* 2. REAL-TIME MUNICIPAL ACTIVITY BAR */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="label-caps">Platform Activity &amp; Municipal Metrics</h2>
            <p className="text-sm font-semibold text-stone-900 mt-1">Live civic progress across Mirpur City sectors</p>
          </div>
          <span className="text-xs text-stone-500 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" /> Real-time public database synchronization
          </span>
        </div>
        <LandingStats />
      </section>

      {/* 3. MULTIMODAL INTAKE SPOTLIGHT */}
      <section className="surface-card p-6 sm:p-10 border border-stone-300/80 rounded-sm space-y-8 bg-gradient-to-br from-white via-stone-50/50 to-emerald-50/30">
        <div className="max-w-3xl">
          <p className="label-caps text-emerald-800">Multimodal Accessibility</p>
          <h2 className="text-2xl sm:text-3xl font-semibold text-stone-900 mt-1">
            Built for Every Citizen: Speak in Urdu or Type in Any Script
          </h2>
          <p className="mt-2 text-sm sm:text-base text-stone-600 leading-relaxed">
            Many municipal reporting tools fail because they demand lengthy formal legal writing. AWAZ-e-MIRPUR solves this with in-browser native Urdu audio intake processed through OpenAI Whisper-1, transforming spontaneous citizen voice memos into legally robust petitions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Voice Memo Card */}
          <div className="p-6 rounded border border-stone-200 bg-white shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-violet-50 text-violet-800 text-xs font-semibold border border-violet-200">
                <svg className="w-3.5 h-3.5 text-violet-600 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M7 4a3 3 0 016 0v6a3 3 0 11-6 0V4z" />
                  <path d="M5.5 9.64A1 1 0 016.5 11a4.5 4.5 0 009 0 1 1 0 112 0 6.5 6.5 0 01-5.5 6.42V19h2a1 1 0 110 2H6a1 1 0 110-2h2v-1.58A6.5 6.5 0 014.5 11a1 1 0 011-1.36z" />
                </svg>
                Urdu Voice Intake (آواز سے اندراج)
              </span>
              <span className="text-[11px] font-medium text-stone-400">OpenAI Whisper-1</span>
            </div>

            <div className="p-4 rounded bg-stone-50 border border-stone-200/80 space-y-2 text-right">
              <p className="text-xs text-stone-500 font-sans">Citizen Audio Voice Note (مثال):</p>
              <p className="text-sm font-serif text-stone-800 leading-relaxed dir-rtl font-medium">
                &ldquo;سیکٹر ایف ون میں پچھلے چار دن سے پینے کا پانی بند ہے۔ مین پائپ لائن پھٹ گئی ہے اور گلی میں کیچڑ بن چکا ہے۔ بچے اور بزرگ شدید پریشان ہیں۔ برائے مہربانی فوری مرمت کروائی جائے۔&rdquo;
              </p>
            </div>

            <div className="pt-2 text-xs text-stone-600 space-y-1.5">
              <div className="flex items-center gap-2 text-emerald-700 font-medium">
                <span>✓</span> <span>Automatic 16kHz mono audio processing</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-700 font-medium">
                <span>✓</span> <span>Recognizes Mirpur local vocabulary &amp; municipal agencies</span>
              </div>
            </div>
          </div>

          {/* Bilingual Formal Drafting Output Card */}
          <div className="p-6 rounded border border-stone-200 bg-white shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-blue-50 text-blue-800 text-xs font-semibold border border-blue-200">
                <svg className="w-3.5 h-3.5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Autonomous Legal Petition
              </span>
              <span className="text-[11px] font-medium text-stone-400">GPT-4o-mini Synthesis</span>
            </div>

            <div className="p-4 rounded bg-stone-50 border border-stone-200/80 space-y-1.5 text-xs text-stone-700">
              <p className="font-semibold text-stone-900">Addressed To: Public Health Engineering Mirpur</p>
              <p className="text-stone-500 italic">Subject: Urgent Rectification of Potable Water Pipeline — Sector F-1</p>
              <p className="leading-relaxed line-clamp-3 text-stone-600">
                &ldquo;Formal petition under AJK Municipal Regulations regarding acute disruption of municipal water supply in Sector F-1. Structural pipeline rupture requires immediate dispatch within 48-hour statutory SLA...&rdquo;
              </p>
            </div>

            <div className="pt-2 text-xs text-stone-600 space-y-1.5">
              <div className="flex items-center gap-2 text-emerald-700 font-medium">
                <span>✓</span> <span>Includes both official English &amp; Urdu legal formats</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-700 font-medium">
                <span>✓</span> <span>Cites municipal bylaws &amp; statutory SLA benchmarks</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE 6-AGENT AUTONOMOUS AI ARCHITECTURE */}
      <section className="space-y-8">
        <div className="border-b border-stone-200 pb-5">
          <p className="label-caps">Engine Architecture</p>
          <h2 className="text-2xl sm:text-3xl font-semibold text-stone-900 mt-1">
            The 6-Agent Autonomous AI Governance Pipeline
          </h2>
          <p className="mt-2 text-sm sm:text-base text-stone-600 max-w-3xl leading-relaxed">
            Unlike conventional static forms, AWAZ-e-MIRPUR coordinates six specialized autonomous agents powered by OpenAI to analyze, research, draft, route, map, and enforce accountability on every single complaint.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {agentSteps.map((agent) => (
            <div key={agent.num} className="surface-card-interactive p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs font-bold text-stone-400">{agent.num}</span>
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-stone-100 text-stone-700 border border-stone-200">
                    {agent.badge}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-stone-900 mb-1">{agent.title}</h3>
                <p className="text-xs font-semibold text-emerald-800 mb-2.5">{agent.subtitle}</p>
                <p className="text-xs text-stone-600 leading-relaxed">{agent.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. CIVIC PROBLEMS & JURISDICTION COVERAGE */}
      <section className="space-y-8">
        <div className="border-b border-stone-200 pb-5">
          <p className="label-caps">Jurisdiction &amp; Municipal Scope</p>
          <h2 className="text-2xl sm:text-3xl font-semibold text-stone-900 mt-1">
            Key Civic Crises Handled in Mirpur City
          </h2>
          <p className="mt-2 text-sm sm:text-base text-stone-600 max-w-3xl leading-relaxed">
            Every submission is accurately categorized and routed directly to the designated authority responsible under Azad Jammu &amp; Kashmir municipal law.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {problemCategories.map((item) => (
            <div key={item.title} className={`p-6 rounded border ${item.bg} space-y-3 transition-shadow hover:shadow-sm`}>
              <div className="flex items-start justify-between">
                <div className="p-2.5 rounded bg-white shadow-xs border border-stone-200/60">
                  {item.icon}
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded bg-white/90 text-stone-800 border border-stone-200">
                  {item.authority}
                </span>
              </div>
              <div>
                <h3 className="text-base font-semibold text-stone-900">{item.title}</h3>
                <p className="text-xs font-medium text-stone-700 font-serif mt-0.5">{item.urdu}</p>
                <p className="text-xs text-stone-600 mt-2 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. SECTORS COVERED IN MIRPUR CITY */}
      <section className="surface-card p-6 sm:p-8 space-y-4">
        <div>
          <p className="label-caps">Geographic Scope</p>
          <h2 className="text-lg sm:text-xl font-semibold text-stone-900 mt-1">
            Coverage Across Mirpur City, AJK
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            The platform collects GPS coordinates and clusters civic complaints across all major residential sectors and urban arteries:
          </p>
        </div>
        <div className="flex flex-wrap gap-2 pt-2">
          {sectors.map((sec) => (
            <span 
              key={sec} 
              className="px-3 py-1.5 rounded text-xs font-medium bg-stone-50 border border-stone-200 text-stone-700 hover:bg-stone-100 transition-colors"
            >
              📍 {sec}
            </span>
          ))}
        </div>
      </section>

      {/* 7. GEOSPATIAL HEATMAP TRANSPARENCY TEASER */}
      <section className="surface-card p-6 sm:p-10 border border-stone-300/80 rounded-sm bg-gradient-to-br from-stone-900 to-stone-950 text-white space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-800">
              Live Transparency
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Interactive Geospatial Issue Heatmap
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              Every geo-tagged complaint is compiled onto a public interactive Leaflet/Folium map. When multiple complaints emerge within 500 meters of each other, Agent 4 automatically detects an active civic outbreak cluster.
            </p>
          </div>
          <Link
            href="/heatmap"
            className="px-6 py-3 rounded-sm bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-semibold text-sm transition-colors whitespace-nowrap shadow-sm"
          >
            Open Live Heatmap →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-stone-800 text-xs text-stone-400">
          <div>
            <p className="font-semibold text-white">DBSCAN Clustering</p>
            <p className="text-[11px] text-stone-400 mt-0.5">500m Haversine radius</p>
          </div>
          <div>
            <p className="font-semibold text-white">Zero Public Login Barrier</p>
            <p className="text-[11px] text-stone-400 mt-0.5">Open citizen scrutiny</p>
          </div>
          <div>
            <p className="font-semibold text-white">Public Health Protection</p>
            <p className="text-[11px] text-stone-400 mt-0.5">Water contamination alerts</p>
          </div>
          <div>
            <p className="font-semibold text-white">Interactive Controls</p>
            <p className="text-[11px] text-stone-400 mt-0.5">Sector zoom &amp; pin inspection</p>
          </div>
        </div>
      </section>

      {/* 8. CITIZEN FAQ */}
      <section className="space-y-6">
        <div className="border-b border-stone-200 pb-4">
          <p className="label-caps">Citizen Help Center</p>
          <h2 className="text-xl sm:text-2xl font-semibold text-stone-900 mt-1">
            Frequently Asked Questions
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {faqs.map((faq) => (
            <div key={faq.q} className="surface-card p-5 space-y-2">
              <h3 className="text-sm font-semibold text-stone-900 flex items-start gap-2">
                <span className="text-emerald-700 font-bold">Q:</span> {faq.q}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed pl-5">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 9. BOTTOM CIVIC CALL TO ACTION */}
      <section className="surface-card p-8 sm:p-12 text-center space-y-5 border-2 border-stone-300/90 bg-gradient-to-b from-white to-stone-100/60">
        <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
          Be the Voice for Your Street in Mirpur City
        </h2>
        <p className="text-sm sm:text-base text-stone-600 max-w-2xl mx-auto leading-relaxed">
          Clean drinking water, functioning roads, and sanitary neighborhoods are constitutional rights. 
          Record your voice or submit a report today to trigger autonomous administrative accountability.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-2">
          <Link href="/submit" className="btn-civic-primary text-sm !py-3 !px-6 w-full sm:w-auto">
            Submit a Report Now (شکایت درج کریں)
          </Link>
          <Link href="/register" className="btn-civic-secondary text-sm !py-3 !px-6 w-full sm:w-auto">
            Create Citizen Account
          </Link>
        </div>
      </section>
    </div>
  );
}
