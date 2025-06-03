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
  const pinned = ['english', 'japanese', 'hebrew'];
  const tabs = [value, ...pinned.filter(c => c !== value).slice(0, 2)] as Language[];

  return (
    <div className="relative w-full flex justify-center">
      {/* Tabs when closed */}
      {!open && (
        <div className="flex gap-2">
          {tabs.map(code => {
            const opt = options.find(o => o.code === code);
            if (!opt) return null;
            return (
              <button
                key={code}
                onClick={() => onChange(code)}
                className={'px-3 py-1 rounded-md border transition ' + (code === value ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100')}
              >
                {opt.name}
              </button>
            );
          })}
          <button
            onClick={() => setOpen(true)}
            className="px-3 py-1 rounded-md border bg-white text-gray-700 hover:bg-gray-100"
          >
            …
          </button>
        </div>
      )}
      {/* Popup when open */}
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20 p-4">
          <div className="bg-white p-6 rounded-2xl shadow w-full max-w-screen-lg">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {options.map(opt => (
                <button
                  key={opt.code}
                  onClick={() => {
                    onChange(opt.code);
                    setOpen(false);
                  }}
                  className="flex flex-col items-center justify-center aspect-square"
                >
                  <div
                    className={
                      'w-16 h-16 flex items-center justify-center rounded-full border ' +
                      (value === opt.code ? 'bg-blue-200' : 'bg-gray-100')
                    }
                  >
                    <span className="text-2xl">{opt.emoji}</span>
                  </div>
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
