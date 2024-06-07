"use client";
import * as React from "react";
import { Container, Button, Typography, Box } from "@mui/material";
import NextLink from "next/link";
import { styled } from "@mui/material";

const StyledContainer = styled(Container)(({ theme }) => ({
  width: "100%",
  height: "350px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  alignItems: "start",
  background: `no-repeat center/cover url(${"/images/photo-Create.jpg"})`,
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginBottom: "20px",
  marginTop: "20px",
  fontSize: "1.2rem",
  opacity: "0.9",
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.white,
}));

export default function Hero() {
  return (
    <StyledContainer>
      <StyledTypography variant="h3">
        Start building your organization
      </StyledTypography>
      <StyledTypography variant="h6">
        All-in-One platform to easily manage your organization and organize
        virtual, hybrid or in-person events.
      </StyledTypography>
      <NextLink href="/organization/new" passHref>
        <StyledButton variant="contained">Create Organization</StyledButton>
      </NextLink>
    </StyledContainer>
  );
}
