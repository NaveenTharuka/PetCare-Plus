import { Plus_Jakarta_Sans, Be_Vietnam_Pro } from 'next/font/google';
import "./globals.css";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

// Configure Plus Jakarta Sans
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

// Configure Be Vietnam Pro
const beVietnamPro = Be_Vietnam_Pro({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-be-vietnam',
  display: 'swap',
});

export const metadata = {
  title: "Get Started | PetCare+",
  description: "The all-in-one sanctuary for your pet's medical history, daily routines, and wellness journey.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${beVietnamPro.variable} scroll-smooth`}
    >
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-background text-on-surface font-body selection:bg-primary-container selection:text-on-primary-container">
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}