"use client";
import {
  Box,
  List,
  Divider,
  ListItem,
  Avatar,
  Stack,
  ListItemText,
  Container,
  Button,
  Typography,
} from "@mui/material";
import Image from "next/image";
import GradeIcon from "@mui/icons-material/Grade";
import AddIcon from "@mui/icons-material/Add";
import ShareIcon from "@mui/icons-material/Share";
import { POST } from "../../../constant";
import { useRouter } from "next/navigation";
import { styled } from "@mui/system";
import NextLink from "next/link";

const ListItemHeader = styled(Typography)(() => {
  return {
    fontWeight: 700,
    fontSize: 18,
    textDecoration: "none",
    color: "inherit",
  };
});

export default function Post() {
  const router = useRouter();

  const handleClick = (id) => {
    router.push(`/tech-talks/${id}`);
  };

  return (
    <Container>
      <List
        sx={{
          paddingTop: "60px",
        }}
      >
        {POST.map(({ id, nickName, title, logo, img }, index) => (
          <div key={index}>
            <ListItem
              sx={{
                pb: 9,
                pt: 8,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <NextLink href={`/tech-talks/${id}`}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
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
                  <Box>
                    <GradeIcon
                      onClick={() => handleClick(id)}
                      fontSize="small"
                      color="action"
                      sx={{ mr: 1 }}
                    />
                    <AddIcon
                      onClick={() => handleClick(id)}
                      fontSize="small"
                      color="action"
                      sx={{ mr: 1 }}
                    />
                    <ShareIcon
                      onClick={() => handleClick(id)}
                      fontSize="small"
                      color="action"
                      sx={{ mr: 1 }}
                    />
                  </Box>
                </Stack>
                <NextLink
                  href={`/tech-talks/${id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <ListItemHeader>{title}</ListItemHeader>
                </NextLink>
                <NextLink
                  href={"/tech-talks/${id}"}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Typography variant="inherit">
                    Yazılım, bilgisayarların çalışmasını sağlayan programların
                    ve verilerin bir araya gelerek bir işlevi yerine getirmesini
                    sağlayan kodların genel adıdır. Bu kodlar, bir programın
                    nasıl çalışacağını belirleyen talimatlar içerir.
                  </Typography>
                </NextLink>
              </Box>
            </ListItem>
          </div>
        ))}
      </List>
    </Container>
  );
}
