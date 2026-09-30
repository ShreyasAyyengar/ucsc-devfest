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
  title: "Google DevFest Hackathon — Registration",
  description: "Join 5,000+ university students, engineers, and creators building solutions powered by Gemini, Cloud, and Web technologies.",
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
