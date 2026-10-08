import type { Metadata } from 'next';
import { IBM_Plex_Sans, IBM_Plex_Serif } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { Navbar } from '@/components/Navbar';

const sans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

const serif = IBM_Plex_Serif({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'AWAZ-e-MIRPUR (آوازِ میرپور) | Civic Reporting & Governance Platform',
  description: 'AWAZ-e-MIRPUR (آوازِ میرپور) — Autonomous AI-powered civic reporting & municipal governance platform for Mirpur City, Azad Jammu & Kashmir (AJK). Aligned with UN SDG 6 & SDG 11.',
  keywords: [
    'AWAZ-e-MIRPUR',
    'Mirpur City AJK',
    'Civic Reporting',
    'MCM',
    'MDA',
    'Water Board',
    'SDG 6',
    'SDG 11',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body
        className={`${sans.className} min-h-screen flex flex-col text-[15px] leading-[1.65] text-stone-900`}
      >
        <AuthProvider>
          <Navbar />
          <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8 lg:py-12">
            {children}
          </main>
          <footer className="mt-auto border-t border-stone-200/90 bg-stone-900 text-stone-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10 pb-10 border-b border-stone-800">
                <div className="md:col-span-2 space-y-3">
                  <div className="flex items-center gap-2.5">
                    <span className="font-display text-xl font-bold text-white tracking-tight">
                      AWAZ-e-MIRPUR
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      آوازِ میرپور
                    </span>
                  </div>
                  <p className="text-xs text-stone-400 max-w-md leading-relaxed">
                    Autonomous Multi-Agent Civic Reporting &amp; Governance Engine for Mirpur City, Azad Jammu &amp; Kashmir (AJK). Empowering citizens through multimodal Urdu/English complaint intake, bylaw synthesis, and dynamic authority dispatch.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    <span className="text-[11px] font-medium px-2 py-1 rounded bg-stone-800 text-stone-300 border border-stone-700">
                      🇺🇳 UN SDG 6: Clean Water
                    </span>
                    <span className="text-[11px] font-medium px-2 py-1 rounded bg-stone-800 text-stone-300 border border-stone-700">
                      🇺🇳 UN SDG 11: Sustainable Cities
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">Platform Navigation</h4>
                  <ul className="space-y-2 text-xs text-stone-400">
                    <li><a href="/submit" className="hover:text-white transition-colors">File a Civic Report (درخواست)</a></li>
                    <li><a href="/heatmap" className="hover:text-white transition-colors">Geospatial Issue Heatmap</a></li>
                    <li><a href="/reports" className="hover:text-white transition-colors">Citizen Report Dashboard</a></li>
                    <li><a href="/login" className="hover:text-white transition-colors">Citizen / Official Sign In</a></li>
                    <li><a href="/admin" className="hover:text-white transition-colors">Municipal Command Center</a></li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">Mirpur Municipal Hub</h4>
                  <div className="space-y-2 text-xs text-stone-400">
                    <p><span className="text-stone-300 font-medium">MCM Helpline:</span> +92 (05827) 920-111</p>
                    <p><span className="text-stone-300 font-medium">MDA Works:</span> +92 (05827) 920-333</p>
                    <p><span className="text-stone-300 font-medium">Water Emergencies:</span> PHE Mirpur</p>
                    <p><span className="text-stone-300 font-medium">Emergency Rescue:</span> 1122</p>
                    <p className="text-[11px] text-stone-500 pt-1">Mirpur City, Azad Jammu &amp; Kashmir</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
                <p>
                  &copy; {new Date().getFullYear()} AWAZ-e-MIRPUR (آوازِ میرپور). Built for civic transparency and municipal accountability.
                </p>
                <p className="text-stone-500 text-[11px]">
                  Powered by OpenAI GPT-4o-mini &amp; Whisper STT
                </p>
              </div>
            </div>
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
