import "./globals.css";

export const metadata = {
  title: "Minted Paws Creator — Your Pet. Your Card. Your Legend.",
  description: "Transform your pet into an elemental fantasy creature trading card with AI.",
  openGraph: {
    title: "Minted Paws Creator",
    description: "Transform your pet into an elemental fantasy creature trading card with AI.",
    siteName: "Minted Paws",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
