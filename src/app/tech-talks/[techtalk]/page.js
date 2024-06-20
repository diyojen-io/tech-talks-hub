"use client";
import {
  Box,
  Stack,
  Avatar,
  Typography,
  Tooltip,
  IconButton,
  Container,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddIcon from "@mui/icons-material/Add";
import { TECH_TALK } from "../../../../constant";
import Head from "next/head";
import { styled } from "@mui/system";
import NextLink from "next/link";
import Comment from "../../components/Comment";

const TechTalkBox = styled(Box)(({ theme }) => ({
  margin: "0 auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

export default function Page({ params }) {
  const techtalk = TECH_TALK.find(
    (techtalk) => techtalk.id === params.techtalk
  );

  return (
    <>
      <Head>
        <title>{techtalk.title}</title>
      </Head>
      <Container>
        {techtalk && (
          <TechTalkBox pt={5} maxWidth={1200}>
            <Container sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Tooltip title="Join the organization.">
                <IconButton>
                  <AddIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Follow the Tech Talk">
                <IconButton>
                  <FavoriteIcon />
                </IconButton>
              </Tooltip>
            </Container>
            <Typography pt={4} variant="h3">
              {techtalk.title}
            </Typography>
            <Box
              p={4}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <NextLink
                style={{ textDecoration: "none", color: "inherit" }}
                href={`../organization/organization-detail`}
              >
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Avatar
                    alt={techtalk.title}
                    src={techtalk.logo.src}
                    sx={{
                      width: "40px",
                      height: "40px",
                    }}
                  />
                  <Typography>{techtalk.nickName}</Typography>
                </Stack>
              </NextLink>
              <Stack>
                <Typography p={1} sx={{ fontSize: "12px" }} variant="inherit">
                  Upload date: {techtalk.date}
                </Typography>
              </Stack>
            </Box>
            <Typography
              mb={4}
              variant="body1"
              component="h2"
              textAlign={"justify"}
            >
              {techtalk.contents}
            </Typography>
            <Comment />
          </TechTalkBox>
        )}
      </Container>
    </>
  );
}
