import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Hebrew Typing Trainer',
  description: 'Practice touch typing in Hebrew',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="w-full">
        {children}
      </body>
    </html>
  );
}
