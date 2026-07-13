import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"

export const metadata: Metadata = {
  title: {
    default: "ExpeditionLocal",
    template: "%s | ExpeditionLocal",
  },
  description: "Bilingual tours marketplace for Ethiopian and international trips.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
      <Toaster />
    </html>
  );
}
