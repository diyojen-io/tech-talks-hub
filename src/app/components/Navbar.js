"use client";
import * as React from "react";
import {
  Box,
  Button,
  Stack,
  Typography,
  List,
  ListItem,
  ListItemText,
  Container,
} from "@mui/material";
import { FEATURES } from "../../../constant";
import { styled } from "@mui/material";
import NextLink from "next/link";

const NavbarBox = styled(Container)(({ theme }) => ({
  top: "0",
  right: "0",
  left: "0",
  position: "fixed",
  backgroundColor: theme.palette.background.paper,
  zIndex: "99",
}));

const WrapperBox = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

export default function TopNavbar() {
  return (
    <NavbarBox maxWidth="lg">
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
        <Box>
          <List sx={{ display: "flex" }}>
            {FEATURES.map((feature, index) => {
              return (
                <ListItem
                  key={index}
                  disablePadding
                  sx={{ marginRight: "15px" }}
                >
                  <NextLink
                    href={feature.linkTo}
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      width: "100%",
                    }}
                  >
                    <ListItemText primary={feature.title} />
                  </NextLink>
                </ListItem>
              );
            })}
          </List>
        </Box>

        <Stack direction="row" pt={2} pb={2}>
          <NextLink href="/login">
            <Button
              sx={{ marginRight: "10px" }}
              variant="outlined"
              color="primary"
            >
              Login
            </Button>
          </NextLink>
          <NextLink href="/signUp">
            <Button variant="contained" color="primary">
              Sign up
            </Button>
          </NextLink>
        </Stack>
      </WrapperBox>
    </NavbarBox>
  );
}
