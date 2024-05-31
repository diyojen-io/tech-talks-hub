import * as React from "react";
import {
  Box,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Avatar,
  ListItemText,
  Typography,
  Stack,
} from "@mui/material/";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import { COMING } from "../../../constant";

export default function RecipeReviewCard() {
  return (
    <></>
    // <Stack
    //   sx={{
    //     height: "100vh",
    //     padding: "20px",
    //   }}
    // >
    //   <Box
    //     sx={{
    //       padding: 2,
    //       display: "flex",
    //       justifyContent: "center",
    //     }}
    //   >
    //     <Typography variant="h5">Recent Posts</Typography>
    //   </Box>
    //   <Box
    //     style={{
    //       alignItems: "center",
    //       overflowY: "scroll",
    //     }}
    //   >
    //     {COMING.map(({ nickName, src, contents, subheader }, index) => (
    //       <Card
    //         key={index}
    //         sx={{
    //           width: "100%",
    //           height: 150,
    //           margin: 2,
    //         }}
    //       >
    //         <CardHeader
    //           avatar={<Avatar src={src}></Avatar>}
    //           action={<IconButton aria-label="settings"></IconButton>}
    //           title={nickName}
    //           subheader={subheader}
    //         />
    //         <CardMedia src={src} />
    //         <CardContent>
    //           <ListItemText secondary={contents} />
    //         </CardContent>
    //       </Card>
    //     ))}
    //   </Box>
    // </Stack>
  );
}
