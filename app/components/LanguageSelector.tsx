import { useState } from 'react';
import { Language } from '../data/dictionaries';

interface Option { code: Language; name: string; emoji: string }

interface Props {
  options: Option[];
  value: Language;
  onChange: (lang: Language) => void;
}

export default function LanguageSelector({ options, value, onChange }: Props) {
  const [open, setOpen] = useState(false);

  const preferred: Language[] = ['english', 'japanese', 'hebrew'];
  const current = options.find(o => o.code === value);
  const shortcutCodes = preferred.filter((c) => c !== value).slice(0, 2);
  const shortcuts: Option[] = [
    ...(current ? [current] : []),
    ...shortcutCodes
      .map((c) => options.find((o) => o.code === c))
      .filter(Boolean) as Option[],
  ];

  return (
    <div className="relative flex w-full justify-center">
      {/* Tabs when closed */}
      {!open && (
        <div className="flex flex-wrap items-center justify-center gap-2">
          {shortcuts.map((opt, idx) => (
            <button
              key={idx + opt.code}
              onClick={() => onChange(opt.code)}
              className={`whitespace-nowrap rounded-full border-2 px-4 py-2 text-sm font-semibold shadow-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 ${
                value === opt.code
                  ? 'border-slate-900 bg-slate-900 text-white shadow-slate-900/20'
                  : 'border-slate-200 bg-white/90 text-slate-600 hover:border-indigo-300 hover:text-slate-900'
              }`}
            >
              {opt.name}
            </button>
          ))}
          <button
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 rounded-full border-2 border-slate-200 bg-white/90 px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm transition hover:border-indigo-300 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2"
          >
            <span className="text-xl leading-none">&hellip;</span>
            <span className="hidden sm:inline">More</span>
          </button>
        </div>
      )}

      {/* Popup when open */}
      {open && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur">
          <div className="w-full max-h-[80vh] max-w-2xl overflow-y-auto rounded-3xl border border-slate-200 bg-white/95 p-4 shadow-xl shadow-slate-900/15 sm:p-6">
            <div className="mb-4 flex justify-end">
              <button
                onClick={() => setOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-2xl text-slate-500 transition hover:border-indigo-300 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2"
                aria-label="Close language selector"
              >
                ×
              </button>
            </div>
            <div className="grid w-full grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6">
              {options.map(opt => (
                <button
                  key={opt.code}
                  onClick={() => {
                    onChange(opt.code);
                    setOpen(false);
                  }}
                  className="flex aspect-square flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white/90 p-3 text-center text-sm font-medium text-slate-600 shadow-sm transition hover:border-indigo-300 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2"
                >
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-full border text-2xl transition ${
                      value === opt.code
                        ? 'border-slate-900 bg-slate-900 text-white shadow-inner shadow-slate-900/50'
                        : 'border-slate-200 bg-slate-50'
                    }`}
                  >
                    {opt.emoji}
                  </span>
                  <span className="mt-2 text-sm">{opt.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
