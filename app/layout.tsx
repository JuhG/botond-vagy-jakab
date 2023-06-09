import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Botond vagy Jakab",
  description: "Juhász tesók küzdelme",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hu">
      <body className={`${inter.className} text-white`}>{children}</body>
    </html>
  );
}
