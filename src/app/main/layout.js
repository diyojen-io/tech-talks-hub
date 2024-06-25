"use client";
import { Container } from "@mui/material";
import Navbar from "../components/Navbar";

export default function Main({ children }) {
  return (
    <>
      <Navbar />
      <Container sx={{ minHeight: `calc(100vh - 56px)` }} maxWidth="md">
        {children}
      </Container>
    </>
  );
}
