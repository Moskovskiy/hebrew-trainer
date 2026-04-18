import './globals.css';
import { ReactNode } from 'react';
import { Heebo, Noto_Sans_KR } from 'next/font/google';

const heebo = Heebo({
  subsets: ['latin', 'hebrew'],
  weight: ['400', '500', '700', '800'],
  variable: '--font-sans-hebrew',
});

const notoSansKr = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '500', '700', '800'],
  variable: '--font-sans-korean',
});

export const metadata = {
  title: 'Script Trainer',
  description: 'Practice Hebrew and Korean sounds, plus Hebrew typing, in a clean minimalist interface.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${heebo.variable} ${notoSansKr.variable} min-h-screen bg-[var(--page-background)] text-[var(--foreground)]`}
      >
        {children}
      </body>
    </html>
  );
}
