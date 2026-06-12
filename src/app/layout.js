import "./globals.css";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { AuthProvider } from '@/auth/AuthProvider';

export const metadata = {
  title: "Get Started | PetCare+",
  description: "The all-in-one sanctuary for your pet's medical history, daily routines, and wellness journey.",
  icons: {
    icon: '/public/Logo.png'
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className="scroll-smooth"
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@300;400;500;600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-background text-on-surface font-body selection:bg-primary-container selection:text-on-primary-container">
        <AuthProvider>
          <NavBar />
          {children}
          {/* Footer was here */}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}