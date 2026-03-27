import { Montserrat_Alternates, Catamaran, Lunasima, Niramit } from 'next/font/google';
import "./globals.css";
import NavBar from "../components/NavBar";

// Configure Montserrat Alternates
const montserratAlternates = Montserrat_Alternates({
  subsets: ['latin', 'latin-ext', 'cyrillic', 'cyrillic-ext', 'vietnamese'],
  weight: ['400', '700', '800'],
  variable: '--font-montserrat-alternates',
  display: 'swap',
});

// Configure Catamaran
const catamaran = Catamaran({
  subsets: ['latin', 'latin-ext', 'tamil'],
  weight: ['400', '700', '800'],
  variable: '--font-catamaran',
  display: 'swap',
});

// Configure Lunasima
const lunasima = Lunasima({
  subsets: ['latin', 'latin-ext', 'cyrillic', 'cyrillic-ext', 'greek', 'greek-ext', 'hebrew', 'vietnamese'],
  weight: ['400'],
  variable: '--font-lunasima',
  display: 'swap',
});

// Configure Niramit
const niramit = Niramit({
  subsets: ['latin', 'latin-ext', 'thai', 'vietnamese'],
  weight: ['300', '400', '700'],
  variable: '--font-niramit',
  display: 'swap',
});

export const metadata = {
  title: "PetCare+ | Your Pet Deserves the Best Care",
  description: "Store medical reports, track treatments, and manage your pet's health anytime, anywhere with PetCare+.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${montserratAlternates.variable} ${catamaran.variable} ${lunasima.variable} ${niramit.variable}`}
    >
      <body>
        <NavBar />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}