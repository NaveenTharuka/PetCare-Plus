import "./globals.css";

export const metadata = {
  title: "PetCare+ | Your Pet Deserves the Best Care",
  description: "Store medical reports, track treatments, and manage your pet's health anytime, anywhere with PetCare+.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
