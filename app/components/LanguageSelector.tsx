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
  const current = options.find((o) => o.code === value);
  const shortcutCodes = preferred.filter((c) => c !== value).slice(0, 2);
  const shortcuts: Option[] = [
    ...(current ? [current] : []),
    ...shortcutCodes
      .map((c) => options.find((o) => o.code === c))
      .filter(Boolean) as Option[],
  ];

  return (
    <div className="relative w-full flex justify-center">
      {/* Tabs when closed */}
      {!open && (
        <div className="flex gap-2">
          {shortcuts.map((opt, idx) => (
            <button
              key={idx + opt.code}
              onClick={() => onChange(opt.code)}
              className={
                'px-3 py-1 rounded-full border whitespace-nowrap ' +
                (value === opt.code
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700')
              }
            >
              {opt.name}
            </button>
          ))}
          <button
            onClick={() => setOpen(true)}
            className="px-3 py-1 rounded-full border bg-white text-gray-700 flex items-center gap-1"
          >
            <span className="text-xl leading-none">&hellip;</span>
            <span className="hidden sm:inline">More</span>
          </button>
        </div>
      )}

      {/* Popup when open */}
      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-20 p-4">
          <div className="bg-white p-4 sm:p-6 rounded-2xl shadow w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-end mb-4">
              <button onClick={() => setOpen(false)} className="text-xl">×</button>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 w-full">
              {options.map((opt) => (
                <button
                  key={opt.code}
                  onClick={() => {
                    onChange(opt.code);
                    setOpen(false);
                  }}
                  className="flex flex-col items-center justify-center aspect-square"
                >
                  <span
                    className={
                      'flex items-center justify-center w-12 h-12 rounded-full border text-2xl ' +
                      (value === opt.code
                        ? 'bg-blue-500 text-white border-blue-500'
                        : 'bg-gray-100')
                    }
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
