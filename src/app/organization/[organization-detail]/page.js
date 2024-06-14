"use client";
import * as React from "react";
import {
  Container,
  Box,
  Typography,
  Stack,
  Link,
  Avatar,
  Tab,
  Tabs,
  Grid,
  Tooltip,
  IconButton,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import AddIcon from "@mui/icons-material/Add";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { styled } from "@mui/material";
import Image from "next/image";
import { TECH_TALK } from "../../../../constant";
import LOGO from "../../../../public/images/organization-logo.jpeg";
import NextLink from "next/link";

const ImageLogo = styled(Image)(({ theme }) => ({
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

const OrganizationProfileContent = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "start",
  padding: theme.spacing(0, 2, 0, 0),
}));
export default function Organization() {
  const [value, setValue] = React.useState("one");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container>
      <Box display="flex" justifyContent="center" alignItems="center">
        <ImageLogo
          src={LOGO}
          alt="organization LOGO"
          width={130}
          height={130}
        />
        <Stack ml={5} flex="1">
          <Typography variant="h4">Teknoloji Dünyasi</Typography>
          <Typography variant="body1">members . 1903</Typography>
          <Stack direction="row">
            <Tooltip title="Join the Organization">
              <IconButton>
                <AddIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Follow the Organization">
              <IconButton>
                <FavoriteIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>
      </Box>
      <Grid container sx={{ display: "flex" }}>
        <Grid item sm={12} md={8}>
          <OrganizationProfileContent>
            <Box sx={{ marginBottom: "30px" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                textColor="secondary"
                indicatorColor="secondary"
                aria-label="secondary tabs example"
              >
                <Tab value="one" label="All" />
                <Tab value="two" label="Popular" />
                <Tab value="three" label="New" />
              </Tabs>
            </Box>
            {TECH_TALK.map(({ id, nickName, title, logo }, index) => (
              <BoxStyle key={index}>
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
                    <Typography variant="inherit">
                      Yazılım, bilgisayarların çalışmasını sağlayan programların
                      ve verilerin bir araya gelerek bir işlevi yerine
                      getirmesini sağlayan kodların genel adıdır. Bu kodlar, bir
                      programın nasıl çalışacağını belirleyen talimatlar içerir.
                    </Typography>
                  </NextLink>
                </Box>
              </BoxStyle>
            ))}
          </OrganizationProfileContent>
        </Grid>
        <Grid item sm={12} md={4}>
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
        </Grid>
      </Grid>
    </Container>
  );
}
