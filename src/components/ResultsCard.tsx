import React, { useState } from 'react';
import { JournalSummaryResponse } from '../types';
import { TrendingUp, Award, Activity, Sparkles, Copy, Check } from 'lucide-react';

interface ResultsCardProps {
  hasil: JournalSummaryResponse['hasil'];
}

export const ResultsCard: React.FC<ResultsCardProps> = ({ hasil }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const text = `HASIL & TEMUAN PENELITIAN:
- Ringkasan: ${hasil.ringkasan}
- Temuan Kunci:
${hasil.temuanKunci.map((t) => `  * ${t}`).join('\n')}
- Data Signifikan:
${hasil.dataSignifikan.map((d) => `  * ${d}`).join('\n')}
- Dampak: ${hasil.dampakTemuan}`;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // ignore
    }
  };

  return (
    <div className="bg-white rounded-xl border-l-4 border-l-emerald-500 border border-slate-200 p-4 sm:p-5 shadow-sm transition-all hover:shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 bg-emerald-50 rounded-lg text-emerald-600 border border-emerald-100">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">
              Bagian 02
            </span>
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Hasil & Temuan
            </h3>
          </div>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          title="Salin bagian Hasil"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Narrative Summary */}
      <p className="mt-3 text-sm text-slate-600 leading-relaxed">
        {hasil.ringkasan}
      </p>

      {/* Temuan Kunci */}
      <div className="mt-3.5">
        <h4 className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <Award className="w-3.5 h-3.5 text-emerald-600" />
          Temuan Kunci
        </h4>
        <ul className="space-y-1.5">
          {hasil.temuanKunci.map((item, idx) => (
            <li
              key={idx}
              className="text-xs text-slate-600 flex items-start gap-2 bg-emerald-50/30 p-2 rounded-lg border border-emerald-100/50"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Data & Statistik Signifikan */}
      <div className="mt-3.5">
        <h4 className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
          Data & Statistik Signifikan
        </h4>
        <div className="grid grid-cols-1 gap-1.5">
          {hasil.dataSignifikan.map((stat, idx) => (
            <div
              key={idx}
              className="text-xs text-slate-700 bg-slate-50 p-2 rounded-lg border border-slate-100 flex items-start gap-2"
            >
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span className="leading-relaxed font-mono text-[11px] font-medium">{stat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Dampak Temuan */}
      {hasil.dampakTemuan && (
        <div className="mt-3.5 p-2.5 rounded-lg bg-slate-50 border border-slate-100">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1 mb-0.5">
            <Sparkles className="w-3 h-3 text-emerald-600" />
            Nilai Tambah & Dampak
          </div>
          <p className="text-xs text-slate-700 leading-relaxed font-medium">
            {hasil.dampakTemuan}
          </p>
        </div>
      )}
    </div>
  );
};

