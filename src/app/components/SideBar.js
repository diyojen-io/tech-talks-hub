"use client";
import { Stack, Box, Switch, Typography } from "@mui/material";
import Image from "next/image";
import { FEATURES, COMMUNITIES, DIYOJEN } from "../../../constant";
import useSettings from "../hooks/useSettings";
import React, { useState } from "react";
import Logo from "../../../public/images/logo.png";
import Link from "next/link";
import { styled } from "@mui/material/styles";

export default function SideBar() {
  const { themeMode, onChangeMode } = useSettings();
  const [isSwitchOn, setIsSwitchOn] = useState(themeMode === "light");

  const handleThemeChange = (event) => {
    const switchValue = event.target.checked;
    setIsSwitchOn(switchValue);
    onChangeMode(switchValue ? "light" : "dark");
  };

  return (
    <Box>
      <Stack
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          height: "50vh",
        }}
      >
        <Stack direction="row" pb={1} spacing={0} alignItems="center">
          <Switch defaultChecked={isSwitchOn} onChange={handleThemeChange} />
        </Stack>
        <Stack direction="row" spacing={1} alignItems="center">
          <Image src={Logo} alt="logo" width={15} height={15} />
          <Typography sx={{ fontSize: "10px" }}>Desing by Diyojen</Typography>
        </Stack>
      </Stack>
    </Box>
  );
}
