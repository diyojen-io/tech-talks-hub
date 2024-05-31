"use client";
import { Stack, Box, Container } from "@mui/material";
import TopNavbar from "../components/Navbar";
import SideBar from "../components/SideBar";
import Aside from "../components/Aside";
import { usePathname } from "next/navigation";

export default function Main({ children }) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <body>
        <Stack
          flexDirection="row"
          sx={{
            width: "100%",
          }}
        >
          <TopNavbar />

          <main style={{ flex: 1, width: "100%" }}>
            <Container
              sx={{
                width: "100%",
                padding: "72px",
              }}
            >
              {children}
            </Container>
          </main>

          {pathname === "/" && <Aside />}
        </Stack>
      </body>
    </html>
  );
}
