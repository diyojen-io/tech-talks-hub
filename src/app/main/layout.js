"use client";
import { Container } from "@mui/material";
import Navbar from "../components/Navbar";

export default function Main({ children }) {
  return (
    <>
      <Navbar />
      <Container sx={{ paddingTop: 3 }} maxWidth="md">
        <main>{children}</main>
      </Container>
    </>
  );
}
