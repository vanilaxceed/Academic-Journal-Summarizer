import React, { useState } from 'react';
import { JournalSummaryResponse } from '../types';
import { Compass, CheckCircle2, Database, BarChart3, Copy, Check } from 'lucide-react';

interface MethodCardProps {
  metode: JournalSummaryResponse['metode'];
}

export const MethodCard: React.FC<MethodCardProps> = ({ metode }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const text = `METODE PENELITIAN:
- Pendekatan: ${metode.pendekatan}
- Populasi/Sampel/Dataset: ${metode.populasiSampel}
- Ringkasan: ${metode.ringkasan}
- Teknik Pengumpulan Data: ${metode.teknikPengumpulanData.join(', ')}
- Metode Analisis: ${metode.metodeAnalisis.join(', ')}`;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // ignore
    }
  };

  return (
    <div className="bg-white rounded-xl border-l-4 border-l-indigo-500 border border-slate-200 p-4 sm:p-5 shadow-sm transition-all hover:shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 bg-indigo-50 rounded-lg text-indigo-600 border border-indigo-100">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">
              Bagian 01
            </span>
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Metode Penelitian
            </h3>
          </div>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          title="Salin bagian Metode"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Narrative Summary */}
      <p className="mt-3 text-sm text-slate-600 leading-relaxed">
        {metode.ringkasan}
      </p>

      {/* Meta badges */}
      <div className="mt-3.5 grid grid-cols-1 sm:grid-cols-2 gap-2">
        <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1 mb-0.5">
            <Compass className="w-3 h-3 text-indigo-500" />
            Pendekatan Riset
          </div>
          <div className="text-xs font-semibold text-slate-700">
            {metode.pendekatan}
          </div>
        </div>

        <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1 mb-0.5">
            <Database className="w-3 h-3 text-indigo-500" />
            Populasi / Sampel / Data
          </div>
          <div className="text-xs font-semibold text-slate-700 line-clamp-2">
            {metode.populasiSampel}
          </div>
        </div>
      </div>

      {/* Teknik Pengumpulan Data */}
      <div className="mt-3.5">
        <h4 className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500" />
          Teknik Pengumpulan Data
        </h4>
        <ul className="space-y-1.5">
          {metode.teknikPengumpulanData.map((item, idx) => (
            <li
              key={idx}
              className="text-xs text-slate-600 flex items-start gap-2 bg-indigo-50/30 p-2 rounded-lg border border-indigo-100/50"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Metode Analisis */}
      <div className="mt-3.5">
        <h4 className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <BarChart3 className="w-3.5 h-3.5 text-indigo-500" />
          Metode Analisis & Algoritma
        </h4>
        <ul className="space-y-1.5">
          {metode.metodeAnalisis.map((item, idx) => (
            <li
              key={idx}
              className="text-xs text-slate-600 flex items-start gap-2 bg-slate-50 p-2 rounded-lg border border-slate-100"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" />
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

