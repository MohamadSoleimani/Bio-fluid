import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Script from "next/script"; // Needed to load MathJax

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BioFluid Engineering - AI & Biomedical Systems",
  description:
    "Exploring the synergy between AI, mechanical design, and biomedical systems. Graduate research in microfluidics, biomedical engineering, and computational modeling.",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* ✅ Load MathJax synchronously before any interactive code runs */}
        <Script
          id="mathjax"
          strategy="beforeInteractive"
          src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}


