"use client";
import {
  Box,
  List,
  ListItem,
  Avatar,
  Stack,
  ListItemText,
  Typography,
} from "@mui/material";
import Image from "next/image";
import GradeIcon from "@mui/icons-material/Grade";
import AddIcon from "@mui/icons-material/Add";
import ShareIcon from "@mui/icons-material/Share";
import { POST } from "../../../constant";
import { styled } from "@mui/system";
import NextLink from "next/link";

const ListItemHeader = styled(Typography)(({ theme }) => {
  return {
    fontWeight: theme.typography.fontWeightBold,
    color: "inherit",
  };
});
const ListItemContainer = styled(ListItem)(() => {
  return {
    pb: 5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
});

export default function TechTalk() {
  return (
    <List>
      {POST.map(({ id, nickName, title, logo, img }, index) => (
        <div key={index}>
          <ListItemContainer>
            <NextLink href={`/`}>
              <Box display="flex" justifyContent="center" alignItems="center">
                <Image
                  style={{
                    cursor: "pointer",
                    borderRadius: "5px",
                    marginRight: "15px",
                  }}
                  src={img.src}
                  alt={img.alt}
                  width={200}
                  height={150}
                />
              </Box>
            </NextLink>

            <Box sx={{ width: "60%", height: "150px" }}>
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
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
                <ListItemText secondary={nickName} />
                <NextLink href={`/tech-talks/${id}`}>
                  <Box>
                    <GradeIcon fontSize="small" color="action" sx={{ mr: 1 }} />
                    <AddIcon fontSize="small" color="action" sx={{ mr: 1 }} />
                    <ShareIcon fontSize="small" color="action" sx={{ mr: 1 }} />
                  </Box>
                </NextLink>
              </Stack>
              <NextLink
                href={`/tech-talks/${id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <ListItemHeader variant="h5">{title}</ListItemHeader>
              </NextLink>
              <NextLink
                href={`/tech-talks/${id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Typography variant="inherit">
                  Yazılım, bilgisayarların çalışmasını sağlayan programların ve
                  verilerin bir araya gelerek bir işlevi yerine getirmesini
                  sağlayan kodların genel adıdır. Bu kodlar, bir programın nasıl
                  çalışacağını belirleyen talimatlar içerir.
                </Typography>
              </NextLink>
            </Box>
          </ListItemContainer>
        </div>
      ))}
    </List>
  );
}
