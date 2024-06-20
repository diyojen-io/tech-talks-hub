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
  padding: "10px 0",
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
          {isAuthenticated ? (
            <Stack direction="row" spacing={1}>
              <NextLink href="/organization/new" passHref>
                <Button variant="contained">Create Organization</Button>
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
            </Stack>
          ) : (
            <Stack direction="row" spacing={1}>
              <NextLink href="/login" passHref>
                <Button
                  sx={{ marginRight: "5px" }}
                  variant="outlined"
                  color="primary"
                >
                  Login
                </Button>
              </NextLink>
              <NextLink href="/sign-up" passHref>
                <Button variant="contained" color="primary">
                  Sign up
                </Button>
              </NextLink>
            </Stack>
          )}
        </WrapperBox>
      </Container>
    </NavbarBox>
  );
}
