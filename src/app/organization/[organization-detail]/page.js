"use client";
import * as React from "react";
import {
  Container,
  Box,
  Typography,
  Stack,
  Button,
  Link,
  IconButton,
  Avatar,
  Tab,
  Tabs,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { styled } from "@mui/material";
import Image from "next/image";
import LOGO from "../../../../public/images/organization-logo.jpeg";
import { TECH_TALK } from "../../../../constant";
import NextLink from "next/link";

const BgImage = styled(Container)(({ theme }) => ({
  width: "100%",
  height: "150px",
  display: "flex",
  borderRadius: "10px",
  background: `no-repeat center/cover url(${"/images/main-images-1.jpg"})`,
}));

const ImageLogo = styled(Image)(({ theme }) => ({
  transform: "translateY(-30px)",
  borderRadius: "20px",
}));

const IconContainer = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  justifyContent: "flex-start",
  alignItems: "center",
  gap: theme.spacing(1),
}));

const BoxStyle = styled(Box)(() => ({
  paddingBottom: "20px",
  display: "flex",
}));

const OrganizationProfileContent = styled(Box)(() => ({
  width: "70%",
  marginTop: "50px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "start",
}));
export default function Organization() {
  const [value, setValue] = React.useState("one");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container>
      <BgImage />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ margin: "0 30px" }}
      >
        <Stack>
          <ImageLogo
            src={LOGO}
            alt="organization LOGO"
            width={130}
            height={130}
          />
        </Stack>
        <Stack ml={5} flex="1">
          <Typography variant="h4">Teknoloji Dünyasi</Typography>
          <Typography variant="body1">members . 1903</Typography>
        </Stack>
        <Stack direction="row">
          <Button sx={{ marginRight: "10px" }} variant="contained">
            Follow
          </Button>
          <Button variant="contained" color="secondary">
            Join
          </Button>
        </Stack>
      </Box>
      <Stack direction="row">
        <OrganizationProfileContent>
          <Box sx={{ width: "100%", marginBottom: "30px" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              textColor="secondary"
              indicatorColor="secondary"
              aria-label="secondary tabs example"
            >
              <Tab value="one" label="Item One" />
              <Tab value="two" label="Item Two" />
              <Tab value="three" label="Item Three" />
            </Tabs>
          </Box>

          {TECH_TALK.map(({ id, nickName, title, logo, img }, index) => (
            <BoxStyle key={index}>
              <Box mr={3}>
                <NextLink href={`/tech-talks/${id}`}>
                  <Image
                    style={{
                      cursor: "pointer",
                      borderRadius: "5px",
                    }}
                    src={img.src}
                    alt={img.alt}
                    width={200}
                    height={150}
                  />
                </NextLink>
              </Box>
              <Box>
                <Stack direction="row">
                  <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={1}
                  >
                    <Avatar
                      alt={title}
                      src={logo.src}
                      sx={{
                        width: "20px",
                        height: "20px",
                        marginRight: "5px",
                      }}
                    />
                    <Typography variant="body2">{nickName}</Typography>
                  </Stack>
                </Stack>
                <NextLink
                  href={`/tech-talks/${id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Typography variant="h5">{title}</Typography>
                </NextLink>
              </Box>
            </BoxStyle>
          ))}
        </OrganizationProfileContent>
        <Stack spacing={3} sx={{ width: "30%" }}>
          <Box>
            <Typography mb={2} variant="h4">
              About
            </Typography>
            <Typography variant="body2">
              Teknoloji dünyasındaki en son gelişmeleri, yenilikleri ve
              trendleri takip eden bir platformuz. Amacımız, teknoloji
              meraklılarına, profesyonellere ve sıradan kullanıcılara değerli
              bilgi ve rehberlik sunmaktır.
            </Typography>
          </Box>
          <Box>
            <Typography mb={2} variant="h4">
              Website
            </Typography>
            <Typography
              variant="body2"
              sx={{ textDecoration: "underline", cursor: "pointer" }}
            >
              http://localhost:3000/
            </Typography>
          </Box>
          <IconContainer>
            <Link
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener"
            >
              <IconButton>
                <FacebookIcon />
              </IconButton>
            </Link>
            <Link href="https://www.twitter.com" target="_blank" rel="noopener">
              <IconButton>
                <TwitterIcon />
              </IconButton>
            </Link>
            <Link
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener"
            >
              <IconButton>
                <InstagramIcon />
              </IconButton>
            </Link>
            <Link
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener"
            >
              <IconButton>
                <LinkedInIcon />
              </IconButton>
            </Link>
          </IconContainer>
        </Stack>
      </Stack>
    </Container>
  );
}
