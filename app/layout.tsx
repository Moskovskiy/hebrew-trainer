import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Hebrew Letter Sound Trainer',
  description: 'Learn the sounds of the Hebrew alphabet with an interactive quiz.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen w-full bg-slate-100/80 text-gray-900">
        <div className="mx-auto flex min-h-screen w-full max-w-5xl items-stretch justify-center px-2 sm:px-6">
          {children}
        </div>
      </body>
    </html>
  );
}
