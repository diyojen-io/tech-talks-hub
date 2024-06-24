"use client";
import React from "react";
import { useDropzone } from "react-dropzone";
import { Avatar, Typography, Box } from "@mui/material";

const AvatarUpload = ({ onDrop, logo, error, touched }) => {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
      <div
        {...getRootProps()}
        style={{
          border: "2px dashed #0087F7",
          padding: "20px",
          textAlign: "center",
          cursor: "pointer",
        }}
      >
        <input {...getInputProps()} />
        <p>Drag 'n' drop a logo here, or click to select one</p>
      </div>
      {logo && (
        <Avatar
          src={URL.createObjectURL(logo)}
          alt="Logo"
          sx={{ width: 100, height: 100, margin: "0 auto" }}
        />
      )}
      {touched && error && (
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default AvatarUpload;
