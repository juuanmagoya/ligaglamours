import type { Metadata } from "next";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { Providers } from "./providers"; // 👈 IMPORTANTE
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Liga Glamour Admin",
  description: "Panel de gestión de la liga Glamour",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="relative min-h-screen bg-[#0a0615] text-white overflow-x-hidden">

        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0">

          {/* Glow detrás */}
          <div className="absolute w-700px h-700px bg-purple-500/20 rounded-full blur-3xl" /> 

          {/* Logo */}
          <Image
            src="/img/imgLogoLiga.png"
            alt="Logo fondo"
            width={700}
            height={700}
            className="opacity-25 select-none"
            priority
          />
        </div>

        {/* 🌌 Luces estilo esports */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl" />
        </div>

        {/* 📦 CONTENIDO */}
        <div className="relative z-10 flex flex-col min-h-screen">
          <Providers>
            {children}
          </Providers>
        </div>

        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}