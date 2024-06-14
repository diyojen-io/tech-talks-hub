"use client";
import { useState } from "react";
import {
  Box,
  Stack,
  Container,
  Avatar,
  Typography,
  Tooltip,
  IconButton,
  TextField,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  InputAdornment,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddIcon from "@mui/icons-material/Add";
import SendIcon from "@mui/icons-material/Send";
import { TECH_TALK } from "../../../../constant";
import Head from "next/head";
import { styled } from "@mui/system";
import NextLink from "next/link";

const TechTalkBox = styled(Box)(({ theme }) => ({
  margin: "0 auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const CommentSection = styled(Box)(({ theme }) => ({
  width: "100%",
  marginTop: theme.spacing(4),
}));

const CommentsList = styled(List)(({ theme }) => ({
  width: "100%",
  backgroundColor: theme.palette.background.paper,
}));

export default function Page({ params }) {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const techtalk = TECH_TALK.find(
    (techtalk) => techtalk.id === params.techtalk
  );

  const handleCommentSubmit = () => {
    if (commentText.trim() === "") return;

    const newComment = {
      id: comments.length + 1,
      text: commentText,
      date: new Date().toLocaleString(),
    };

    setComments([...comments, newComment]);
    setCommentText("");
  };

  return (
    <Container sx={{ width: "100%" }}>
      <Head>
        <title>{techtalk.title}</title>
      </Head>
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

          <CommentSection>
            <Typography variant="h6" gutterBottom>
              Comments
            </Typography>
            <Box
              component="form"
              onSubmit={(e) => {
                e.preventDefault();
                handleCommentSubmit();
              }}
              display="flex"
              flexDirection="column"
              alignItems="flex-end"
            >
              <TextField
                label="Write a comment"
                fullWidth
                variant="outlined"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                multiline
                rows={4}
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "flex-start",
                      }}
                    >
                      <Tooltip title="Join the organization.">
                        <IconButton type="submit">
                          <SendIcon />
                        </IconButton>
                      </Tooltip>
                    </InputAdornment>
                  ),
                  sx: {
                    display: "flex",
                    alignItems: "center",
                    padding: "0",
                    paddingRight: "7px",
                  },
                }}
              />
            </Box>
            <CommentsList>
              {comments.map((comment) => (
                <ListItem key={comment.id} alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar
                      alt={techtalk.title}
                      src={techtalk.logo.src}
                      sx={{
                        width: "30px",
                        height: "30px",
                      }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={comment.text}
                    secondary={comment.date}
                  />
                </ListItem>
              ))}
            </CommentsList>
          </CommentSection>
        </TechTalkBox>
      )}
    </Container>
  );
}
