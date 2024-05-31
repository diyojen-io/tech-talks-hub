import { styled, alpha, useTheme } from "@mui/material/styles";
import { POST } from "../../../../constant";
import {
  Box,
  Stack,
  ListItemText,
  Avatar,
  Typography,
  Chip,
} from "@mui/material";
import RecommendIcon from "@mui/icons-material/Recommend";
import ChatIcon from "@mui/icons-material/Chat";
import TurnedInIcon from "@mui/icons-material/TurnedIn";
export default function Page({ params }) {
  const post = POST.find((post) => post.id === params.techtalk);

  return (
    <>
      {post && (
        <Box
          pt={5}
          maxWidth={1200}
          sx={{
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "75%",
          }}
        >
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
            <Stack direction="column">
              <Stack direction="row" alignItems="center">
                <Avatar
                  alt={post.title}
                  src={post.logo.src}
                  sx={{
                    width: "40px",
                    height: "40px",
                    marginRight: "5px",
                  }}
                />
                <ListItemText secondary={post.nickName} />
              </Stack>
              <Typography p={1} sx={{ fontSize: "12px" }} variant="inherit">
                Upload date: {post.date}
              </Typography>
            </Stack>
            <Chip label="Following" color="success" sx={{ height: 30 }} />
          </Box>
          <Box
            sx={{
              borderTop: "1px solid black",
              borderBottom: "1px solid black",
              p: 2,
              m: 2,
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Stack direction="row" spacing={2}>
              <RecommendIcon color="action" />
              <ChatIcon color="action" />
            </Stack>
            <TurnedInIcon color="action" />
          </Box>
          <Box
            component="img"
            p={2}
            src={post.img.src}
            alt={post.img.alt}
            sx={{
              width: "100%",
              borderRadius: "50px",
            }}
          />

          <Typography mb={4} variant="h6" component="h2" textAlign={"justify"}>
            {post.contents}
          </Typography>
          <Box
            sx={{
              borderTop: "1px solid black",
              borderBottom: "1px solid black",
              p: 2,
              m: 2,
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Stack direction="row" spacing={2}>
              <RecommendIcon color="action" />
              <ChatIcon color="action" />
            </Stack>
            <TurnedInIcon color="action" />
          </Box>
        </Box>
      )}
    </>
  );
}
