import type { Metadata } from "next";
import { sourceCodePro } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tech Talks Hub",
  description:
    "Tech Talks Hub is an open-source platform designed to organize, host, and share tech talks, bringing together speakers, organizers, and attendees in a community-driven environment.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={sourceCodePro.className}>{children}</body>
    </html>
  );
}
