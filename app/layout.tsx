import './globals.css';
import { ReactNode } from 'react';
import {
  Heebo,
  Noto_Naskh_Arabic,
  Noto_Nastaliq_Urdu,
  Noto_Sans,
  Noto_Sans_Armenian,
  Noto_Sans_Canadian_Aboriginal,
  Noto_Sans_Cherokee,
  Noto_Sans_Coptic,
  Noto_Sans_Devanagari,
  Noto_Sans_Ethiopic,
  Noto_Sans_Georgian,
  Noto_Sans_Gujarati,
  Noto_Sans_Javanese,
  Noto_Sans_JP,
  Noto_Sans_KR,
  Noto_Sans_Khmer,
  Noto_Sans_Myanmar,
  Noto_Sans_Osage,
  Noto_Sans_SC,
  Noto_Sans_Thaana,
  Noto_Sans_Thai,
  Noto_Serif_Tibetan,
} from 'next/font/google';

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

const notoSansSc = Noto_Sans_SC({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-sans-chinese',
});

const notoSansJp = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-sans-japanese',
});

const notoSansThai = Noto_Sans_Thai({
  subsets: ['thai'],
  weight: ['400', '500', '700'],
  variable: '--font-sans-thai',
});

const notoSansArmenian = Noto_Sans_Armenian({
  subsets: ['armenian'],
  weight: ['400', '500', '700'],
  variable: '--font-sans-armenian',
});

const notoSansGeorgian = Noto_Sans_Georgian({
  subsets: ['georgian'],
  weight: ['400', '500', '700'],
  variable: '--font-sans-georgian',
});

const notoSansGujarati = Noto_Sans_Gujarati({
  subsets: ['gujarati'],
  weight: ['400', '500', '700'],
  variable: '--font-sans-gujarati',
});

const notoSansJavanese = Noto_Sans_Javanese({
  subsets: ['javanese'],
  weight: ['400', '500', '700'],
  variable: '--font-sans-javanese',
});

const notoSansCherokee = Noto_Sans_Cherokee({
  subsets: ['cherokee'],
  weight: ['400', '500', '700'],
  variable: '--font-sans-cherokee',
});

const notoSansCanadianAboriginal = Noto_Sans_Canadian_Aboriginal({
  subsets: ['canadian-aboriginal'],
  weight: ['400', '500', '700'],
  variable: '--font-sans-qaniujaaqpait',
});

const notoSansCoptic = Noto_Sans_Coptic({
  subsets: ['coptic'],
  weight: ['400'],
  variable: '--font-sans-coptic',
});

const notoSansOsage = Noto_Sans_Osage({
  subsets: ['osage'],
  weight: ['400'],
  variable: '--font-sans-osage',
});

const notoSansDevanagari = Noto_Sans_Devanagari({
  subsets: ['devanagari'],
  weight: ['400', '500', '700'],
  variable: '--font-sans-devanagari',
});

const notoSansKhmer = Noto_Sans_Khmer({
  subsets: ['khmer'],
  weight: ['400', '500', '700'],
  variable: '--font-sans-khmer',
});

const notoSansThaana = Noto_Sans_Thaana({
  subsets: ['thaana'],
  weight: ['400', '500', '700'],
  variable: '--font-sans-maldivian',
});

const notoSerifTibetan = Noto_Serif_Tibetan({
  subsets: ['tibetan'],
  weight: ['400', '500', '700'],
  variable: '--font-serif-tibetan',
});

const notoNastaliqUrdu = Noto_Nastaliq_Urdu({
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans-urdu',
});

export const metadata = {
  title: 'Script Trainer',
  description:
    'Practice English, Hebrew, Chinese, Japanese, Korean, Russian, Ethiopian, Greek, Coptic, Qaniujaaqpait, Thai, Armenian, Georgian, Gujarati, Javanese, Khmer, Sanskrit, Tibetan, Urdu, Maldivian, Marathi, Arabic, Farsi, Myanmar, Cherokee, Osage, and emoji in a clean minimalist interface.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${notoSans.variable} ${heebo.variable} ${notoSansKr.variable} ${notoNaskhArabic.variable} ${notoSansMyanmar.variable} ${notoSansEthiopic.variable} ${notoSansSc.variable} ${notoSansJp.variable} ${notoSansThai.variable} ${notoSansArmenian.variable} ${notoSansGeorgian.variable} ${notoSansGujarati.variable} ${notoSansJavanese.variable} ${notoSansCherokee.variable} ${notoSansCanadianAboriginal.variable} ${notoSansCoptic.variable} ${notoSansOsage.variable} ${notoSansDevanagari.variable} ${notoSansKhmer.variable} ${notoSansThaana.variable} ${notoSerifTibetan.variable} ${notoNastaliqUrdu.variable} min-h-screen bg-[var(--page-background)] text-[var(--foreground)]`}
      >
        {children}
      </body>
    </html>
  );
}
