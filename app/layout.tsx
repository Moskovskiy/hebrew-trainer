import './globals.css';
import { ReactNode } from 'react';
import { Heebo, Noto_Naskh_Arabic, Noto_Sans, Noto_Sans_Ethiopic, Noto_Sans_KR, Noto_Sans_Myanmar } from 'next/font/google';

const heebo = Heebo({
  subsets: ['latin', 'hebrew'],
  weight: ['400', '500', '700', '800'],
  variable: '--font-sans-hebrew',
});

const notoSans = Noto_Sans({
  subsets: ['latin', 'cyrillic', 'greek'],
  weight: ['400', '500', '700', '800'],
  variable: '--font-sans-base',
});

const notoSansKr = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '500', '700', '800'],
  variable: '--font-sans-korean',
});

const notoNaskhArabic = Noto_Naskh_Arabic({
  subsets: ['arabic'],
  weight: ['400', '500', '700'],
  variable: '--font-sans-arabic',
});

const notoSansMyanmar = Noto_Sans_Myanmar({
  subsets: ['myanmar'],
  weight: ['400', '500', '700'],
  variable: '--font-sans-myanmar',
});

const notoSansEthiopic = Noto_Sans_Ethiopic({
  subsets: ['ethiopic'],
  weight: ['400', '500', '700'],
  variable: '--font-sans-ethiopic',
});

export const metadata = {
  title: 'Script Trainer',
  description:
    'Practice Hebrew, Korean, Russian, Ethiopian, Greek, Arabic, Farsi, and Myanmar in a clean minimalist interface.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${notoSans.variable} ${heebo.variable} ${notoSansKr.variable} ${notoNaskhArabic.variable} ${notoSansMyanmar.variable} ${notoSansEthiopic.variable} min-h-screen bg-[var(--page-background)] text-[var(--foreground)]`}
      >
        {children}
      </body>
    </html>
  );
}
