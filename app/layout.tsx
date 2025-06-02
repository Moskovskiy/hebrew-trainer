import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Multilingual Typing Trainer',
  description: 'Practice touch typing in multiple languages',
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
