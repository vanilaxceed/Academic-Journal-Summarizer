import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { JournalInput } from './components/JournalInput';
import { OverviewHeader } from './components/OverviewHeader';
import { MethodCard } from './components/MethodCard';
import { ResultsCard } from './components/ResultsCard';
import { ConclusionCard } from './components/ConclusionCard';
import { SAMPLE_JOURNALS } from './data/samples';
import { JournalSummaryResponse } from './types';
import { AlertCircle, Cpu, Sparkles, RefreshCw, Layers, Compass, Activity, Lightbulb, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [text, setText] = useState<string>(SAMPLE_JOURNALS[0].text);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<JournalSummaryResponse | null>(null);
  const [loadingStep, setLoadingStep] = useState<string>('');

  const handleSelectSample = (sampleId: string) => {
    const sample = SAMPLE_JOURNALS.find((s) => s.id === sampleId);
    if (sample) {
      setText(sample.text);
      setError(null);
    }
  };

  const handleExtract = async () => {
    if (!text.trim() || text.trim().length < 30) {
      setError('Mohon masukkan teks jurnal minimal 30 karakter.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setLoadingStep('Menghubungkan ke Endpoint Serverless SSR...');

    const stepTimer1 = setTimeout(() => {
      setLoadingStep('Mengekstrak Metode, Hasil, dan Kesimpulan dengan Gemini AI...');
    }, 900);

    const stepTimer2 = setTimeout(() => {
      setLoadingStep('Memformat kartu informasi terstruktur...');
    }, 2200);

    try {
      const response = await fetch('/api/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
        }),
      });

      const json = await response.json();

      if (!response.ok || !json.success) {
        throw new Error(json.error || 'Gagal memproses jurnal.');
      }

      setResult(json.data);
      // Smooth scroll to results on small screens
      setTimeout(() => {
        const resultsEl = document.getElementById('results-section');
        if (resultsEl) {
          resultsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Terjadi kesalahan pada jaringan atau server.');
    } finally {
      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);
      setIsLoading(false);
      setLoadingStep('');
    }
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9] text-slate-800 flex flex-col font-sans antialiased selection:bg-indigo-600 selection:text-white">
      <Navbar />

      {/* Main High Density Workspace */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-5 flex flex-col gap-4">
        {/* Top Info Banner */}
        <div className="bg-white rounded-xl border border-slate-200 p-3 sm:p-4 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200">
                Astro SSR + Cloudflare
              </span>
              <h2 className="text-sm sm:text-base font-bold text-slate-800 tracking-tight">
                Ekstraksi 3 Bagian Inti Jurnal Akademik
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Analisis instan naskah ilmiah menjadi kartu terstruktur: <span className="font-semibold text-indigo-600">Metode</span>, <span className="font-semibold text-emerald-600">Hasil</span>, dan <span className="font-semibold text-amber-600">Kesimpulan</span>.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 shrink-0">
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 rounded-lg border border-slate-200 text-[11px] font-medium text-slate-600">
              <Cpu className="w-3.5 h-3.5 text-slate-500" />
              <span>Edge Worker</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-indigo-50/70 rounded-lg border border-indigo-100 text-[11px] font-medium text-indigo-700">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Gemini 3.7 Flash</span>
            </div>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5 shrink-0">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <div className="font-semibold">Gagal Memproses Jurnal</div>
              <div className="text-rose-700 mt-0.5">{error}</div>
            </div>
            <button
              type="button"
              onClick={handleExtract}
              className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-1 bg-rose-100 hover:bg-rose-200 text-rose-900 rounded transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" />
              Coba Lagi
            </button>
          </div>
        )}

        {/* 2-Column High Density Grid on Large Screens */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1 items-stretch">
          {/* Left Column: Input (5 cols) */}
          <div className="lg:col-span-5 flex flex-col">
            <JournalInput
              text={text}
              setText={setText}
              onSubmit={handleExtract}
              isLoading={isLoading}
              onSelectSample={handleSelectSample}
            />
          </div>

          {/* Right Column: Output / Stream (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {/* Loading State */}
            {isLoading && (
              <div className="flex-1 p-6 sm:p-8 rounded-xl bg-white border border-slate-200 shadow-sm text-center flex flex-col items-center justify-center space-y-3 min-h-[300px]">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full border-3 border-slate-200 border-t-indigo-600 animate-spin" />
                  <Sparkles className="w-4 h-4 text-indigo-600 absolute inset-0 m-auto animate-pulse" />
                </div>
                <div className="text-sm font-bold text-slate-800">
                  {loadingStep || 'Sedang Memproses Jurnal...'}
                </div>
                <p className="text-xs text-slate-500 max-w-sm">
                  Gemini 3.7 Flash sedang membedah metodologi, temuan empiris, dan implikasi naskah.
                </p>
              </div>
            )}

            {/* Results State */}
            {result && !isLoading && (
              <div id="results-section" className="space-y-4">
                <OverviewHeader data={result} />
                <div className="grid grid-cols-1 gap-4">
                  <MethodCard metode={result.metode} />
                  <ResultsCard hasil={result.hasil} />
                  <ConclusionCard kesimpulan={result.kesimpulan} />
                </div>
              </div>
            )}

            {/* Empty / Placeholder Guidance State */}
            {!result && !isLoading && (
              <div className="flex-1 flex flex-col gap-4">
                <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
                  <div className="flex items-center gap-2 pb-2.5 border-b border-slate-100">
                    <Layers className="w-4 h-4 text-indigo-600" />
                    <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Struktur Ringkasan 3 Bagian Inti
                    </h3>
                  </div>
                  <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
                    Setelah menekan tombol <span className="font-semibold text-indigo-600">Ekstrak Ringkasan</span>, model AI akan menghasilkan 3 kartu informasi berdensitas tinggi:
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 flex-1">
                  {/* Card 1 Preview */}
                  <div className="bg-white rounded-xl border-l-4 border-l-indigo-500 border border-slate-200 p-3.5 shadow-xs flex flex-col justify-between">
                    <div>
                      <div className="p-1.5 bg-indigo-50 rounded-lg text-indigo-600 w-fit mb-2">
                        <Compass className="w-4 h-4" />
                      </div>
                      <div className="text-[10px] font-bold text-indigo-600 uppercase">Bagian 01</div>
                      <h4 className="text-xs font-bold text-slate-800">Metode Penelitian</h4>
                      <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                        Pendekatan riset, sampling, teknik instrumen, dan model analisis.
                      </p>
                    </div>
                    <span className="text-[10px] font-semibold text-slate-400 mt-3 pt-2 border-t border-slate-100 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-indigo-500" /> Siap Diekstrak
                    </span>
                  </div>

                  {/* Card 2 Preview */}
                  <div className="bg-white rounded-xl border-l-4 border-l-emerald-500 border border-slate-200 p-3.5 shadow-xs flex flex-col justify-between">
                    <div>
                      <div className="p-1.5 bg-emerald-50 rounded-lg text-emerald-600 w-fit mb-2">
                        <Activity className="w-4 h-4" />
                      </div>
                      <div className="text-[10px] font-bold text-emerald-600 uppercase">Bagian 02</div>
                      <h4 className="text-xs font-bold text-slate-800">Hasil & Temuan</h4>
                      <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                        Temuan kunci, koefisien data, statistik, dan dampak signifikansi.
                      </p>
                    </div>
                    <span className="text-[10px] font-semibold text-slate-400 mt-3 pt-2 border-t border-slate-100 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500" /> Siap Diekstrak
                    </span>
                  </div>

                  {/* Card 3 Preview */}
                  <div className="bg-white rounded-xl border-l-4 border-l-amber-500 border border-slate-200 p-3.5 shadow-xs flex flex-col justify-between">
                    <div>
                      <div className="p-1.5 bg-amber-50 rounded-lg text-amber-600 w-fit mb-2">
                        <Lightbulb className="w-4 h-4" />
                      </div>
                      <div className="text-[10px] font-bold text-amber-600 uppercase">Bagian 03</div>
                      <h4 className="text-xs font-bold text-slate-800">Kesimpulan</h4>
                      <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                        Implikasi kebijakan/praktis, limitasi riset, dan agenda lanjutan.
                      </p>
                    </div>
                    <span className="text-[10px] font-semibold text-slate-400 mt-3 pt-2 border-t border-slate-100 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-amber-500" /> Siap Diekstrak
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* High Density Status Footer */}
      <footer className="h-8 bg-slate-800 flex items-center px-4 sm:px-6 justify-between shrink-0 text-[10px] text-slate-400 font-medium tracking-widest uppercase border-t border-slate-700">
        <div className="flex items-center gap-2">
          <span>SSR: ASTRO JS</span>
          <span className="text-slate-600">|</span>
          <span>RUNTIME: CLOUDFLARE WORKERS</span>
          <span className="text-slate-600">|</span>
          <span className="hidden sm:inline">ENGINE: GEMINI 3.7 FLASH</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>SYSTEM READY</span>
        </div>
      </footer>
    </div>
  );
}

