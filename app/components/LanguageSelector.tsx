import { useState, useMemo } from 'react';
import { Language } from '../data/dictionaries';

interface Option { code: Language; name: string; emoji: string }

interface Props {
  options: Option[];
  value: Language;
  onChange: (lang: Language) => void;
}

export default function LanguageSelector({ options, value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const currentIndex = useMemo(() =>
    options.findIndex(o => o.code === value), [options, value]);
  const len = options.length;

  const displayed = useMemo(() => {
    return [-2, -1, 0, 1, 2].map(offset => options[(currentIndex + offset + len) % len]);
  }, [currentIndex, len, options]);

  const rotate = (dir: number) => {
    const newIndex = (currentIndex + dir + len) % len;
    onChange(options[newIndex].code);
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (e.deltaX > 0 || e.deltaY > 0) rotate(1);
    else rotate(-1);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStart === null) return;
    const diff = e.changedTouches[0].clientX - touchStart;
    if (Math.abs(diff) > 30) {
      rotate(diff < 0 ? 1 : -1);
    }
    setTouchStart(null);
  };

  return (
    <div className="relative w-full flex justify-center">
      {/* Carousel when closed */}
      {!open && (
        <div
          className="relative flex items-center select-none px-10"
          onWheel={handleWheel}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-white pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-white pointer-events-none" />
          <div className="flex gap-6">
            {displayed.map((opt, idx) => (
              <button
                key={opt.code}
                className={
                  'transition transform ' +
                  (idx === 2 ? 'text-blue-600 font-bold scale-110' : 'text-gray-500')
                }
                onClick={() => setOpen(true)}
              >
                {opt.name}
              </button>
            ))}
          </div>
        </div>
      )}
      {/* Popup when open */}
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
          <div className="bg-white p-4 rounded shadow max-w-sm w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold">Select Language</h2>
              <button onClick={() => setOpen(false)} className="text-xl">×</button>
            </div>
            <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto">
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
