"use client";
import * as React from "react";
import { Box, Button, Stack, Typography, Container } from "@mui/material";
import { styled } from "@mui/material";
import NextLink from "next/link";
import { useAuth } from "../contexts/AuthContext";

const NavbarBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
}));

const WrapperBox = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

export default function TopNavbar() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <NavbarBox>
      <Container maxWidth="md">
        <WrapperBox>
          <Box>
            <NextLink
              style={{ textDecoration: "none", color: "inherit" }}
              href="/"
            >
              <Typography
                variant="h5"
                sx={{ letterSpacing: "-1.5px", fontWeight: "300" }}
              >
                TECHTALKSHUB
              </Typography>
            </NextLink>
          </Box>
          <Stack direction="row" pt={2} pb={2}>
            {isAuthenticated ? (
              <>
                <NextLink href="/organization/new" passHref>
                  <Button sx={{ marginRight: "20px" }} variant="contained">
                    Create Organization
                  </Button>
                </NextLink>
                <NextLink href="/" passHref>
                  <Button
                    sx={{ marginRight: "5px" }}
                    variant="outlined"
                    color="primary"
                    onClick={logout}
                  >
                    Logout
                  </Button>
                </NextLink>
              </>
            ) : (
              <>
                <NextLink href="/login" passHref>
                  <Button
                    sx={{ marginRight: "5px" }}
                    variant="outlined"
                    color="primary"
                  >
                    Login
                  </Button>
                </NextLink>
                <NextLink href="/signUp" passHref>
                  <Button variant="contained" color="primary">
                    Sign up
                  </Button>
                </NextLink>
              </>
            )}  
          </Stack>
        </WrapperBox>
      </Container>
    </NavbarBox>
  );
}
