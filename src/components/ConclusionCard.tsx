import React, { useState } from 'react';
import { JournalSummaryResponse } from '../types';
import { Lightbulb, AlertTriangle, ArrowUpRight, Copy, Check } from 'lucide-react';

interface ConclusionCardProps {
  kesimpulan: JournalSummaryResponse['kesimpulan'];
}

export const ConclusionCard: React.FC<ConclusionCardProps> = ({ kesimpulan }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const text = `KESIMPULAN & REKOMENDASI:
- Ringkasan: ${kesimpulan.ringkasan}
- Implikasi Praktis:
${kesimpulan.implikasiPraktis.map((i) => `  * ${i}`).join('\n')}
- Keterbatasan Studi:
${kesimpulan.keterbatasan.map((k) => `  * ${k}`).join('\n')}
- Saran Riset Lanjutan:
${kesimpulan.saranPenelitianLanjutan.map((s) => `  * ${s}`).join('\n')}`;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // ignore
    }
  };

  return (
    <div className="bg-white rounded-xl border-l-4 border-l-amber-500 border border-slate-200 p-4 sm:p-5 shadow-sm transition-all hover:shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 bg-amber-50 rounded-lg text-amber-600 border border-amber-100">
            <Lightbulb className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600">
              Bagian 03
            </span>
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Kesimpulan & Implikasi
            </h3>
          </div>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          title="Salin bagian Kesimpulan"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Narrative Summary */}
      <p className="mt-3 text-sm text-slate-600 leading-relaxed">
        {kesimpulan.ringkasan}
      </p>

      {/* Implikasi Praktis */}
      <div className="mt-3.5">
        <h4 className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
          Implikasi Praktis & Kebijakan
        </h4>
        <ul className="space-y-1.5">
          {kesimpulan.implikasiPraktis.map((item, idx) => (
            <li
              key={idx}
              className="text-xs text-slate-600 flex items-start gap-2 bg-amber-50/30 p-2 rounded-lg border border-amber-100/50"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Keterbatasan Studi */}
      <div className="mt-3.5">
        <h4 className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
          Keterbatasan Penelitian
        </h4>
        <ul className="space-y-1.5">
          {kesimpulan.keterbatasan.map((item, idx) => (
            <li
              key={idx}
              className="text-xs text-slate-600 flex items-start gap-2 bg-slate-50 p-2 rounded-lg border border-slate-100"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Saran Penelitian Lanjutan */}
      <div className="mt-3.5">
        <h4 className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <ArrowUpRight className="w-3.5 h-3.5 text-indigo-500" />
          Saran Riset Lanjutan (Future Work)
        </h4>
        <ul className="space-y-1.5">
          {kesimpulan.saranPenelitianLanjutan.map((item, idx) => (
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

