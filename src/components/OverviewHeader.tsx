import React, { useState } from 'react';
import { JournalSummaryResponse } from '../types';
import { Check, Copy, Download, Tag, Clock, Layers } from 'lucide-react';

interface OverviewHeaderProps {
  data: JournalSummaryResponse;
}

export const OverviewHeader: React.FC<OverviewHeaderProps> = ({ data }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyMarkdown = async () => {
    const md = `# ${data.title}
**Bidang Studi:** ${data.fieldOfStudy}
**Kata Kunci:** ${data.kataKunci.join(', ')}

## Ringkasan Eksekutif
${data.abstractSummary}

---

## 1. METODE PENELITIAN
- **Pendekatan:** ${data.metode.pendekatan}
- **Populasi/Sampel/Dataset:** ${data.metode.populasiSampel}
- **Ringkasan:** ${data.metode.ringkasan}

### Teknik Pengumpulan Data:
${data.metode.teknikPengumpulanData.map((item) => `- ${item}`).join('\n')}

### Metode Analisis:
${data.metode.metodeAnalisis.map((item) => `- ${item}`).join('\n')}

---

## 2. HASIL & TEMUAN
${data.hasil.ringkasan}

### Temuan Kunci:
${data.hasil.temuanKunci.map((item) => `- ${item}`).join('\n')}

### Data Signifikan:
${data.hasil.dataSignifikan.map((item) => `- ${item}`).join('\n')}

**Dampak:** ${data.hasil.dampakTemuan}

---

## 3. KESIMPULAN & IMPLIKASI
${data.kesimpulan.ringkasan}

### Implikasi Praktis:
${data.kesimpulan.implikasiPraktis.map((item) => `- ${item}`).join('\n')}

### Keterbatasan:
${data.kesimpulan.keterbatasan.map((item) => `- ${item}`).join('\n')}

### Saran Penelitian Lanjutan:
${data.kesimpulan.saranPenelitianLanjutan.map((item) => `- ${item}`).join('\n')}
`;

    try {
      await navigator.clipboard.writeText(md);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  const handleDownloadTxt = () => {
    const element = document.createElement('a');
    const file = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    element.href = URL.createObjectURL(file);
    element.download = `${data.title.slice(0, 30).replace(/[^a-zA-Z0-9]/g, '_')}_ringkasan.json`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-2.5 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-indigo-600 text-white">
            <Layers className="w-3 h-3" />
            {data.fieldOfStudy || 'Jurnal Ilmiah'}
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-600 border border-slate-200">
            <Clock className="w-3 h-3 text-slate-400" />
            {data.stats.estimatedReadTime}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handleCopyMarkdown}
            className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded transition-colors cursor-pointer"
            title="Salin semua ringkasan sebagai Markdown"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
            <span>{copied ? 'Tersalin' : 'Salin Markdown'}</span>
          </button>

          <button
            type="button"
            onClick={handleDownloadTxt}
            className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded transition-colors cursor-pointer"
            title="Ekspor Data JSON"
          >
            <Download className="w-3 h-3" />
            <span>JSON</span>
          </button>
        </div>
      </div>

      <h2 className="text-base sm:text-lg font-bold text-slate-800 tracking-tight mt-3 leading-snug">
        {data.title}
      </h2>

      <div className="mt-2.5 p-3 rounded-lg bg-slate-50 border border-slate-100 text-xs sm:text-sm text-slate-600 leading-relaxed">
        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
          Ikhtisar Eksekutif
        </div>
        <p>{data.abstractSummary}</p>
      </div>

      {/* Keywords */}
      {data.kataKunci && data.kataKunci.length > 0 && (
        <div className="mt-2.5 flex items-center gap-1 flex-wrap">
          <Tag className="w-3 h-3 text-slate-400 mr-0.5" />
          {data.kataKunci.map((keyword, idx) => (
            <span
              key={idx}
              className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200/60"
            >
              #{keyword}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

