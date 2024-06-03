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

const ButtonStyle = styled(Button)(({ theme }) => ({
  padding: "10px",
  color: theme.palette.background.paper,
  backgroundColor: theme.palette.primary.light,
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));

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
          <NextLink href="/tech-talks/login" passHref>
            <ButtonStyle sx={{ marginRight: "10px" }} size="large">
              Login
            </ButtonStyle>
          </NextLink>
          <NextLink href="/tech-talks/sign-up" passHref>
            <ButtonStyle>Sign up</ButtonStyle>
          </NextLink>
        </Stack>
      </WrapperBox>
    </NavbarBox>
  );
}
