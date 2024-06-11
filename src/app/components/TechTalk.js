"use client";
import * as React from "react";
import {
  Box,
  Avatar,
  Stack,
  Typography,
  Container,
  List,
  ListItem,
  ListItemText,
  Tabs,
  Tab,
  Divider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ShareIcon from "@mui/icons-material/Share";
import { styled } from "@mui/system";
import NextLink from "next/link";
import { TECH_TALK } from "../../../constant";
import { FEATURES } from "../../../constant";

const BoxStyle = styled(Box)(() => ({
  paddingBottom: "20px",
  marginTop: "20px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

export default function TechTalk() {
  const [value, setValue] = React.useState("one");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Container sx={{ padding: "50px 0 0" }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <List sx={{ display: "flex" }}>
          {FEATURES.map((feature, index) => {
            return (
              <ListItem key={index} disablePadding sx={{ marginRight: "15px" }}>
                <NextLink
                  href={feature.linkTo}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    width: "100%",
                  }}
                >
                  <ListItemText primary={feature.title} />
                </NextLink>
              </ListItem>
            );
          })}
        </List>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
        >
          <Tab value="one" label="All" />
          <Tab value="two" label="Popular" />
          <Tab value="three" label="Recent" />
        </Tabs>
      </Box>
      <Divider />
      {TECH_TALK.map(({ id, nickName, title, logo }, index) => (
        <BoxStyle key={index}>
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
                <NextLink
                  href={`/organization/${id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Typography variant="body2">{nickName}</Typography>
                </NextLink>
              </Stack>
              <Stack direction="row" spacing={1}>
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
