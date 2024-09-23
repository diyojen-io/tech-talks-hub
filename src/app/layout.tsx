import type { Metadata } from "next";
import { sourceCodePro } from "./fonts";
import "./styles/globals.css";
import Navbar from "./Components/Navbar/Navbar";

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
      <header>
        <Navbar />
      </header>
      <body className={sourceCodePro.className}>{children}</body>
    </html>
  );
}
