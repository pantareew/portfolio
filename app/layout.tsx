import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Great_Vibes,
  IM_Fell_English,
  Lumanosimo,
  Dancing_Script,
  Cormorant,
} from "next/font/google";
import "./globals.css";
//fonts
const greatVibes = Great_Vibes({
  subsets: ["latin"],
  variable: "--font-map-title",
  weight: "400",
});

const imFell = IM_Fell_English({
  subsets: ["latin"],
  variable: "--font-map-body",
  weight: "400",
});
const luman = Lumanosimo({
  subsets: ["latin"],
  variable: "--font-map-instruction",
  weight: "400",
});
const dancing = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-castle-instruction",
  weight: "400",
});
const cormorant = Cormorant({
  subsets: ["latin"],
  variable: "--font-map-content",
  weight: "400",
});
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pantaree's Portfolio",
  description:
    "This portfolio website is inspired by Maurauder's Map from Harry Potter. Explore my skills and experience journey through this map.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${greatVibes.variable} ${imFell.variable} ${luman.variable} ${dancing.variable} ${cormorant.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
