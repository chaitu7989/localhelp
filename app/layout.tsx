import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LocalHelp - Bhimavaram Local Services",
  description: "Find trusted local service providers in Bhimavaram, West Godavari",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">{children}</body>
    </html>
  );
}
