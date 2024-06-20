"use client";
import { useState } from "react";
import {
  TextField,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  InputAdornment,
  Box,
  Container,
  Typography,
  Tooltip,
  IconButton,
  Avatar,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { styled } from "@mui/system";

const CommentSection = styled(Box)(({ theme }) => ({
  width: "100%",
  marginTop: theme.spacing(4),
}));

const CommentsList = styled(List)(({ theme }) => ({
  width: "100%",
  backgroundColor: theme.palette.background.paper,
}));

export default function Comment() {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");

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
    <Container>
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
                  <Tooltip title="Send comment">
                    <IconButton type="submit">
                      <SendIcon />
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              ),
              sx: {
                display: "flex",
                alignItems: "center",
              },
            }}
          />
        </Box>
        <CommentsList>
          {comments.map((comment) => (
            <ListItem key={comment.id} alignItems="flex-start">
              <ListItemAvatar>
                <Avatar
                  alt="User Avatar"
                  src="/static/images/avatar/1.jpg" //
                  sx={{
                    width: "30px",
                    height: "30px",
                  }}
                />
              </ListItemAvatar>
              <ListItemText primary={comment.text} secondary={comment.date} />
            </ListItem>
          ))}
        </CommentsList>
      </CommentSection>
    </Container>
  );
}
