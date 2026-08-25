import React, { useState } from 'react';
import { SAMPLE_JOURNALS } from '../data/samples';
import { Sparkles, FileText, Trash2, ClipboardPaste, ArrowRight, Loader2, BookOpen } from 'lucide-react';

interface JournalInputProps {
  text: string;
  setText: (val: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  onSelectSample: (sampleId: string) => void;
}

export const JournalInput: React.FC<JournalInputProps> = ({
  text,
  setText,
  onSubmit,
  isLoading,
  onSelectSample,
}) => {
  const [selectedSampleId, setSelectedSampleId] = useState<string>('');

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const charCount = text.length;

  const handlePaste = async () => {
    try {
      const clipText = await navigator.clipboard.readText();
      if (clipText) {
        setText(clipText);
        setSelectedSampleId('');
      }
    } catch {
      // Fallback
    }
  };

  const handleSampleClick = (sampleId: string) => {
    setSelectedSampleId(sampleId);
    onSelectSample(sampleId);
  };

  const handleClear = () => {
    setText('');
    setSelectedSampleId('');
  };

  return (
    <div className="flex flex-col flex-1 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Top Bar Header */}
      <div className="px-4 py-2.5 border-b border-slate-100 bg-slate-50/70 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-slate-500" />
          <h2 className="text-xs font-bold text-slate-600 uppercase tracking-wider">
            Input Jurnal Akademik
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-medium text-slate-400">
            {wordCount} kata • {charCount} kar
          </span>
          <button
            type="button"
            id="paste-clipboard-btn"
            onClick={handlePaste}
            className="inline-flex items-center gap-1 px-2 py-1 text-[11px] font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded transition-colors cursor-pointer"
            title="Tempel dari Clipboard"
          >
            <ClipboardPaste className="w-3 h-3 text-slate-500" />
            <span>Tempel</span>
          </button>
        </div>
      </div>

      {/* Preset sample buttons */}
      <div className="px-4 py-2 bg-slate-50/40 border-b border-slate-100 flex items-center gap-1.5 flex-wrap text-xs">
        <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
          <BookOpen className="w-3 h-3 text-slate-400" />
          Sampel:
        </span>
        {SAMPLE_JOURNALS.map((sample) => {
          const isSelected = selectedSampleId === sample.id;
          return (
            <button
              key={sample.id}
              type="button"
              onClick={() => handleSampleClick(sample.id)}
              disabled={isLoading}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition-all cursor-pointer ${
                isSelected
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200/60'
              }`}
            >
              {sample.field.split('&')[0].trim()}
            </button>
          );
        })}
      </div>

      {/* Textarea */}
      <div className="relative flex-1 p-3.5 sm:p-4 flex flex-col">
        <textarea
          id="journal-input-textarea"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            setSelectedSampleId('');
          }}
          disabled={isLoading}
          rows={11}
          placeholder="Tempelkan teks lengkap jurnal di sini untuk dianalisis oleh AI (Abstrak, Metode, Hasil, Kesimpulan)..."
          className="w-full flex-1 p-2 text-xs sm:text-sm text-slate-700 bg-transparent resize-y focus:outline-none leading-relaxed placeholder:text-slate-300 font-mono border-0 focus:ring-0"
          spellCheck={false}
        />
      </div>

      {/* Footer Actions */}
      <div className="p-3 sm:p-4 border-t border-slate-100 bg-slate-50/50 flex items-center gap-3">
        <button
          type="button"
          id="extract-journal-btn"
          onClick={onSubmit}
          disabled={isLoading || text.trim().length < 30}
          className="flex-1 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] text-white font-semibold py-2.5 px-4 rounded-lg text-xs sm:text-sm shadow-md shadow-indigo-200 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-white" />
              <span>Menganalisis...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-indigo-200" />
              <span>Ekstrak Ringkasan</span>
              <ArrowRight className="w-4 h-4 ml-0.5 opacity-80" />
            </>
          )}
        </button>

        {text.length > 0 && (
          <button
            type="button"
            id="clear-text-btn"
            onClick={handleClear}
            disabled={isLoading}
            className="p-2.5 border border-slate-200 bg-white text-slate-500 hover:text-rose-600 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
            title="Bersihkan Teks"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

