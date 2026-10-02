import type { Metadata } from "next";
import { JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";
import Providers from "@/components/providers/providers";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "GDGC DevFest Hackathon @ UCSC — Registration",
  description:
    "Join students and developers at UCSC for a hands-on hackathon. Find teammates, experiment with new tools, and build a prototype you can demo for a chance to win great prizes.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-white font-sans text-gray-900 antialiased selection:bg-[#4285F4]/20 selection:text-[#4285F4]">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
