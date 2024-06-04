"use client";
import { Container } from "@mui/material";
import Navbar from "../components/Navbar";

export default function Main({ children }) {
  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ padding: "75px 0 50px" }}>
        <main>{children}</main>
      </Container>
    </>
  );
}
