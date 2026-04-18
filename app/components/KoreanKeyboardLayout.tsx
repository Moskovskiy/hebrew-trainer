import { VIRTUAL_BACKSPACE_KEY, useVirtualKeyboard } from './VirtualKeyboardContext';

const numberRow = ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='].map(key => ({
  main: '',
  sub: key,
}));

const keyboardRows = [
  [
    { main: 'ㅂ', sub: 'q' },
    { main: 'ㅈ', sub: 'w' },
    { main: 'ㄷ', sub: 'e' },
    { main: 'ㄱ', sub: 'r' },
    { main: 'ㅅ', sub: 't' },
    { main: 'ㅛ', sub: 'y' },
    { main: 'ㅕ', sub: 'u' },
    { main: 'ㅑ', sub: 'i' },
    { main: 'ㅐ', sub: 'o' },
    { main: 'ㅔ', sub: 'p' },
  ],
  [
    { main: 'ㅁ', sub: 'a' },
    { main: 'ㄴ', sub: 's' },
    { main: 'ㅇ', sub: 'd' },
    { main: 'ㄹ', sub: 'f' },
    { main: 'ㅎ', sub: 'g' },
    { main: 'ㅗ', sub: 'h' },
    { main: 'ㅓ', sub: 'j' },
    { main: 'ㅏ', sub: 'k' },
    { main: 'ㅣ', sub: 'l' },
    { main: '', sub: ';' },
    { main: '', sub: "'" },
  ],
  [
    { main: 'ㅋ', sub: 'z' },
    { main: 'ㅌ', sub: 'x' },
    { main: 'ㅊ', sub: 'c' },
    { main: 'ㅍ', sub: 'v' },
    { main: 'ㅠ', sub: 'b' },
    { main: 'ㅜ', sub: 'n' },
    { main: 'ㅡ', sub: 'm' },
    { main: '', sub: ',' },
    { main: '', sub: '.' },
    { main: '', sub: '/' },
  ],
];

export default function KoreanKeyboardLayout() {
  const onVirtualKeyPress = useVirtualKeyboard();

  return (
    <div className="px-1.5 py-2.5 sm:p-6">
      <div className="space-y-1.5 sm:space-y-3">
        <div className="flex flex-wrap justify-center gap-1 sm:gap-1.5">
          {numberRow.map(key => (
            <button
              key={`ko-number-${key.sub}`}
              type="button"
              onMouseDown={event => event.preventDefault()}
              onClick={() => onVirtualKeyPress?.(key.sub)}
              className="group relative flex h-8 min-w-[1.35rem] overflow-hidden rounded-lg border border-[var(--border)] px-1 py-0.5 text-zinc-950 transition-colors hover:bg-zinc-950 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 sm:h-12 sm:min-w-[3.2rem] sm:rounded-xl sm:px-2 sm:py-1"
              aria-label={`Korean key ${key.sub}`}
            >
              <span className="absolute bottom-0.5 left-1 text-[0.42rem] leading-none text-zinc-500 transition-colors group-hover:text-white sm:bottom-1 sm:left-1.5 sm:text-[0.62rem]">
                {key.sub}
              </span>
            </button>
          ))}
        </div>

        {keyboardRows.map(row => (
          <div
            key={row.map(key => key.main).join('')}
            className="flex flex-wrap justify-center gap-1 sm:gap-1.5"
          >
            {row.map(key => (
              <button
                key={`${key.main}-${key.sub}`}
                type="button"
                onMouseDown={event => event.preventDefault()}
                onClick={() => onVirtualKeyPress?.(key.main || key.sub)}
                className="group relative flex h-8 min-w-[1.35rem] overflow-hidden rounded-lg border border-[var(--border)] px-1 py-0.5 text-zinc-950 transition-colors hover:bg-zinc-950 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 sm:h-12 sm:min-w-[3.2rem] sm:rounded-xl sm:px-2 sm:py-1"
                aria-label={`Korean key ${key.main || key.sub}`}
              >
                {key.main ? (
                  <span className="absolute right-1 top-1 text-right text-[0.95rem] font-medium leading-none transition-colors group-hover:text-white sm:right-1.5 sm:top-1.5 sm:text-xl">
                    {key.main}
                  </span>
                ) : null}
                <span className="absolute bottom-0.5 left-1 text-[0.42rem] leading-none text-zinc-500 transition-colors group-hover:text-white sm:bottom-1 sm:left-1.5 sm:text-[0.62rem]">
                  {key.sub}
                </span>
              </button>
            ))}
          </div>
        ))}

        <div className="flex flex-wrap items-center justify-center gap-1 pt-1 sm:gap-1.5 sm:pt-1.5">
          <button
            type="button"
            className="flex h-7 w-12 items-center justify-center rounded-lg border border-[var(--border)] text-[0.46rem] uppercase tracking-[0.16em] text-zinc-500 sm:h-10 sm:w-20 sm:rounded-xl sm:text-[0.65rem] sm:tracking-[0.18em]"
          >
            Shift
          </button>
          <button
            type="button"
            onMouseDown={event => event.preventDefault()}
            onClick={() => onVirtualKeyPress?.(' ')}
            className="flex h-7 min-w-[6rem] items-center justify-center rounded-lg border border-[var(--border)] px-3 text-[0.46rem] uppercase tracking-[0.16em] text-zinc-500 transition-colors hover:bg-zinc-950 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 sm:h-10 sm:min-w-[14rem] sm:rounded-xl sm:px-4 sm:text-[0.65rem] sm:tracking-[0.18em]"
          >
            Space
          </button>
          <button
            type="button"
            onMouseDown={event => event.preventDefault()}
            onClick={() => onVirtualKeyPress?.(VIRTUAL_BACKSPACE_KEY)}
            className="flex h-7 w-12 items-center justify-center rounded-lg border border-[var(--border)] text-[0.46rem] uppercase tracking-[0.16em] text-zinc-500 sm:h-10 sm:w-20 sm:rounded-xl sm:text-[0.65rem] sm:tracking-[0.18em]"
          >
            Backspace
          </button>
        </div>
      </div>
    </div>
  );
}
