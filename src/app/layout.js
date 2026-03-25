import "./globals.css";
import NavBar from "../components/NavBar";

export const metadata = {
  title: "PetCare+ | Your Pet Deserves the Best Care",
  description: "Store medical reports, track treatments, and manage your pet's health anytime, anywhere with PetCare+.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}