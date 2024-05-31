"use client";
import * as React from "react";
import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  Button,
  Stack,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { FEATURES } from "../../../constant";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { styled } from "@mui/material";
import NextLink from "next/link";

const ButtonStyle = styled(Button)(({ theme }) => ({
  margin: "5px",
  color: theme.palette.background.paper,
  backgroundColor: theme.palette.primary.light,
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const SideBarBox = styled(Box)(({ theme }) => ({}));

const WrapperBox = styled(Box)(({ theme }) => ({
  padding: "10px",
  height: "72px",
  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
  width: "100%",
  zIndex: "99",
  position: "fixed",
  display: "flex",
  backgroundColor: "white",
  justifyContent: "space-between",
  alignItems: "center",
}));

export default function TopNavbar() {
  const router = useRouter();

  const createOrganization = () => {
    router.push(`/tech-talks/organization/new`);
  };

  const login = () => {
    router.push("/tech-talks/login");
  };

  const singUp = () => {
    router.push("/tech-talks/sing-up");
  };

  return (
    <WrapperBox>
      <Box>
        <NextLink style={{ textDecoration: "none", color: "inherit" }} href="/">
          <Typography
            variant="h6"
            sx={{ letterSpacing: "-1.5px", fontWeight: "300" }}
          >
            TECHTALKSHUB
          </Typography>
        </NextLink>
      </Box>
      <SideBarBox>
        <List sx={{ display: "flex" }}>
          {FEATURES.map((feature, index) => {
            return (
              <ListItem key={index} disablePadding>
                <Link
                  href={feature.linkTo}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    width: "100%",
                  }}
                >
                  <ListItemButton sx={{ display: "flex", flex: "1" }}>
                    <ListItemText primary={feature.title} />
                  </ListItemButton>
                </Link>
              </ListItem>
            );
          })}
        </List>
      </SideBarBox>
      <ButtonStyle onClick={() => createOrganization()}>
        <AddIcon />
        Create Organization
      </ButtonStyle>
      <Stack direction="row">
        <ButtonStyle onClick={() => login()}>Log in</ButtonStyle>
        <ButtonStyle onClick={() => singUp()}>Sing up</ButtonStyle>
      </Stack>
    </WrapperBox>
  );
}
