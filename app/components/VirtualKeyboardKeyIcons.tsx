function keyIconClassName() {
  return 'h-3.5 w-3.5 fill-none stroke-current stroke-[1.8] sm:h-[18px] sm:w-[18px]';
}

export function ShiftKeyIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={keyIconClassName()}>
      <path d="M12 5 6.5 11h3.5v8h4v-8h3.5L12 5Z" />
    </svg>
  );
}

export function BackspaceKeyIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={keyIconClassName()}>
      <path d="M10 6H19a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H10l-6-6 6-6Z" />
      <path d="m12 10 4 4m0-4-4 4" />
    </svg>
  );
}

export function SpaceKeyIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={keyIconClassName()}>
      <path d="M6 15h12" />
    </svg>
  );
}
