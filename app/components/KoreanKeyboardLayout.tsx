const keyboardRows = [
  ['ㅂ', 'ㅈ', 'ㄷ', 'ㄱ', 'ㅅ', 'ㅛ', 'ㅕ', 'ㅑ', 'ㅐ', 'ㅔ'],
  ['ㅁ', 'ㄴ', 'ㅇ', 'ㄹ', 'ㅎ', 'ㅗ', 'ㅓ', 'ㅏ', 'ㅣ'],
  ['ㅋ', 'ㅌ', 'ㅊ', 'ㅍ', 'ㅠ', 'ㅜ', 'ㅡ'],
];

export default function KoreanKeyboardLayout() {
  return (
    <div className="border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-6">
      <div className="space-y-3">
        {keyboardRows.map((row, rowIndex) => (
          <div
            key={row.join('')}
            className={`flex flex-wrap gap-2 ${
              rowIndex === 1 ? 'sm:pl-6' : rowIndex === 2 ? 'sm:pl-12' : ''
            }`}
          >
            {row.map(key => (
              <div
                key={key}
                className="flex h-14 w-14 items-center justify-center border border-[var(--border)] text-2xl font-medium text-zinc-950 sm:h-16 sm:w-16 sm:text-3xl"
                aria-label={`Korean key ${key}`}
              >
                {key}
              </div>
            ))}
          </div>
        ))}

        <div className="flex items-center gap-2 pt-2 sm:pl-16">
          <div className="flex h-12 w-24 items-center justify-center border border-[var(--border)] text-xs uppercase tracking-[0.2em] text-zinc-500">
            Shift
          </div>
          <div className="flex h-12 min-w-[12rem] flex-1 items-center justify-center border border-[var(--border)] text-xs uppercase tracking-[0.2em] text-zinc-500">
            Space
          </div>
          <div className="flex h-12 w-24 items-center justify-center border border-[var(--border)] text-xs uppercase tracking-[0.2em] text-zinc-500">
            Enter
          </div>
        </div>
      </div>
    </div>
  );
}
