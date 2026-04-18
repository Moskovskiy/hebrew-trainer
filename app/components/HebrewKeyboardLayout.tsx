const keyboardRows = [
  ['ק', 'ר', 'א', 'ט', 'ו', 'ן', 'ם', 'פ'],
  ['ש', 'ד', 'ג', 'כ', 'ע', 'י', 'ח', 'ל', 'ך', 'ף'],
  ['ז', 'ס', 'ב', 'ה', 'נ', 'מ', 'צ', 'ת', 'ץ'],
];

export default function HebrewKeyboardLayout() {
  return (
    <div className="border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-6">
      <div className="space-y-3">
        {keyboardRows.map(row => (
          <div key={row.join('')} className="flex flex-wrap justify-center gap-2">
            {row.map(key => (
              <div
                key={key}
                className="flex h-14 w-14 items-center justify-center border border-[var(--border)] text-2xl font-medium text-zinc-950 sm:h-16 sm:w-16 sm:text-3xl"
                aria-label={`Hebrew key ${key}`}
              >
                {key}
              </div>
            ))}
          </div>
        ))}

        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          <div className="flex h-12 w-24 items-center justify-center border border-[var(--border)] text-xs uppercase tracking-[0.2em] text-zinc-500">
            Shift
          </div>
          <div className="flex h-12 min-w-[12rem] items-center justify-center border border-[var(--border)] px-6 text-xs uppercase tracking-[0.2em] text-zinc-500 sm:min-w-[18rem]">
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
