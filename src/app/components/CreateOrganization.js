"use client";
import * as React from "react";
import { Container, Button } from "@mui/material";
import Image from "next/image";
import NextLink from "next/link";
import { ORGANIZATION_IMAGES } from "../../../constant";
import { styled } from "@mui/material";

const StyledContainer = styled(Container)(({ theme }) => ({
  position: "relative",
  width: "100%",
  height: "500px",
  display: "flex",
  justifyContent: "center",
  borderRadius: "5px",
  marginRight: "15px",
}));

const StyledButton = styled(Button)(({ theme }) => ({
  position: "absolute",
  bottom: theme.spacing(5),
  left: theme.spacing(5),
  fontSize: "1.8rem",
  color: theme.palette.primary.light,
}));

export default function Organization() {
  return (
    <StyledContainer>
      <Image
        src={ORGANIZATION_IMAGES.img.src}
        alt={ORGANIZATION_IMAGES.img.alt}
        layout="fill"
        objectFit="cover"
        style={{ borderRadius: "5px" }}
      />
      <NextLink href="/tech-talks/organization/new" passHref>
        <StyledButton>Create Organization</StyledButton>
      </NextLink>
    </StyledContainer>
  );
}
