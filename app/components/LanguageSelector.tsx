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

  return (
    <div className="relative w-full flex justify-center">
      {/* Carousel when closed */}
      {!open && (
        <div className="relative flex items-center select-none px-10 overflow-x-auto gap-6 scroll-smooth">
          {options.map(opt => (
            <button
              key={opt.code}
              className={'whitespace-nowrap transition ' + (opt.code === value ? 'text-blue-600 font-bold' : 'text-gray-500')}
              onClick={() => setOpen(true)}
            >
              {opt.name}
            </button>
          ))}
        </div>
      )}
      {/* Popup when open */}
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
          <div className="bg-white p-6 rounded-2xl shadow max-w-2xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold">Select Language</h2>
              <button onClick={() => setOpen(false)} className="text-xl">×</button>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {options.map(opt => (
                <button
                  key={opt.code}
                  onClick={() => { onChange(opt.code); setOpen(false); }}
                  className={'border rounded p-2 flex items-center gap-1 ' + (value === opt.code ? 'bg-blue-500 text-white border-blue-500' : 'bg-white hover:bg-gray-100')}
                >
                  <span>{opt.emoji}</span>
                  <span>{opt.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
