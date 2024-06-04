"use client";
import { Box, Avatar, Stack, Typography, Container } from "@mui/material";
import Image from "next/image";
import GradeIcon from "@mui/icons-material/Grade";
import AddIcon from "@mui/icons-material/Add";
import ShareIcon from "@mui/icons-material/Share";
import { POST } from "../../../constant";
import { styled } from "@mui/system";
import NextLink from "next/link";

const BoxStyle = styled(Box)(() => ({
  paddingBottom: "20px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

export default function TechTalk() {
  return (
    <Container maxWidth="md" sx={{ padding: "50px 0 0" }}>
      {POST.map(({ id, nickName, title, logo, img }, index) => (
        <BoxStyle key={index}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            mr={3}
          >
            <NextLink href={`/tech-talks/${id}`}>
              <Image
                style={{
                  cursor: "pointer",
                  borderRadius: "5px",
                }}
                src={img.src}
                alt={img.alt}
                width={200}
                height={150}
              />
            </NextLink>
          </Box>

          <Box>
            <Stack direction="row" justifyContent="space-between">
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
              <Stack direction="row" spacing={1}>
                <GradeIcon fontSize="small" color="action" />
                <AddIcon fontSize="small" color="action" />
                <ShareIcon fontSize="small" color="action" />
              </Stack>
            </Stack>
            <NextLink
              href={`/tech-talks/${id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Typography variant="h5">{title}</Typography>
            </NextLink>
            <Typography variant="inherit">
              Yazılım, bilgisayarların çalışmasını sağlayan programların ve
              verilerin bir araya gelerek bir işlevi yerine getirmesini sağlayan
              kodların genel adıdır. Bu kodlar, bir programın nasıl çalışacağını
              belirleyen talimatlar içerir.
            </Typography>
          </Box>
        </BoxStyle>
      ))}
    </Container>
  );
}
