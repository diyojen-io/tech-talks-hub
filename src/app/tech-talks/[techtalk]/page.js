"use client";
import { Box, Stack, Container, Avatar, Typography, Chip } from "@mui/material";
import RecommendIcon from "@mui/icons-material/Recommend";
import ChatIcon from "@mui/icons-material/Chat";
import TurnedInIcon from "@mui/icons-material/TurnedIn";
import { POST } from "../../../../constant";
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
  const post = POST.find((post) => post.id === params.techtalk);

  return (
    <Container sx={{ width: "100%" }}>
      <Head>
        <title>{post.title}</title>
      </Head>
      {post && (
        <TechTalkBox pt={5} maxWidth={1200}>
          <Typography pt={4} variant="h2">
            {post.title}
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
                  alt={post.title}
                  src={post.logo.src}
                  sx={{
                    width: "40px",
                    height: "40px",
                  }}
                />
                <Typography secondary={post.nickName} />
              </Stack>
              <Typography p={1} sx={{ fontSize: "12px" }} variant="inherit">
                Upload date: {post.date}
              </Typography>
            </Box>
            <Chip label="Following" color="success" sx={{ height: 30 }} />
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
            src={post.img.src}
            alt={post.img.alt}
            sx={{
              width: "100%",
              borderRadius: "25px",
            }}
          />

          <Typography mb={4} variant="h6" component="h2" textAlign={"justify"}>
            {post.contents}
          </Typography>
        </TechTalkBox>
      )}
    </Container>
  );
}
