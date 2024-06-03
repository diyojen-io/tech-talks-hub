"use client";
import { Container } from "@mui/material";
import Navbar from "../components/Navbar";
import { usePathname } from "next/navigation";

export default function Main({ children }) {
  const pathname = usePathname();

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ padding: "75px" }}>
        <main>{children}</main>
      </Container>
    </>
  );
}
