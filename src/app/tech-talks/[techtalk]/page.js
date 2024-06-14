"use client";
import { Box, Stack, Container, Avatar, Typography, Chip } from "@mui/material";
import RecommendIcon from "@mui/icons-material/Recommend";
import ChatIcon from "@mui/icons-material/Chat";
import TurnedInIcon from "@mui/icons-material/TurnedIn";
import { TECH_TALK } from "../../../../constant";
import Head from "next/head";
import { styled } from "@mui/system";

const TechTalkBox = styled(Box)(({ theme }) => {
  return {
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };
});
const IconBox = styled(Box)(({ theme }) => {
  return {
    borderBottom: "1px solid black",

    width: "100%",
  };
});

export default function Page({ params }) {
  const techtalk = TECH_TALK.find(
    (techtalk) => techtalk.id === params.techtalk
  );

  return (
    <Container sx={{ width: "100%" }}>
      {techtalk && (
        <TechTalkBox pt={5} maxWidth={1200}>
          <Typography pt={4} variant="h2">
            {techtalk.title}
          </Typography>
          <Box
            p={4}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Box display="flex" direction="column">
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar
                  alt={techtalk.title}
                  src={techtalk.logo.src}
                  sx={{
                    width: "40px",
                    height: "40px",
                  }}
                />
                <Typography secondary={techtalk.nickName} />
              </Stack>
              <Typography p={1} sx={{ fontSize: "12px" }} variant="inherit">
                Upload date: {techtalk.date}
              </Typography>
            </Box>
            <Chip label="Following" color="secondary" sx={{ height: 30 }} />
          </Box>
          <IconBox display="flex" justifyContent="space-between" m={2} p={2}>
            <Stack direction="row" spacing={2}>
              <RecommendIcon color="action" />
              <ChatIcon color="action" />
            </Stack>
            <TurnedInIcon color="action" />
          </IconBox>
          <Box
            component="img"
            p={2}
            src={techtalk.img.src}
            alt={techtalk.img.alt}
            sx={{
              width: "100%",
              borderRadius: "25px",
            }}
          />

          <Typography mb={4} variant="h6" component="h2" textAlign={"justify"}>
            {techtalk.contents}
          </Typography>
        </TechTalkBox>
      )}
    </Container>
  );
}
