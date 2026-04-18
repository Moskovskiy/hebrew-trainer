'use client';

import { createContext, useContext } from 'react';

export const VirtualKeyboardContext = createContext<((key: string) => void) | null>(null);

export function useVirtualKeyboard() {
  return useContext(VirtualKeyboardContext);
}
