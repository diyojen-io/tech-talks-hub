"use client";
import * as React from "react";
import {
  Avatar,
  Button,
  TextField,
  Box,
  Typography,
  Container,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Formik, Field, Form } from "formik";
import { styled } from "@mui/system";
import axios from "../utils/axios";

const SignupContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: `calc(100vh - 56px)`,
}));

const StyledForm = styled(Form)(({ theme }) => ({
  width: "100%",
  marginTop: theme.spacing(1),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
}));

export default function SignUp() {
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      localStorage.setItem("user", JSON.stringify(values));
      console.log("Form Values: ", values);
      setSubmitting(false);
    } catch (error) {
      console.error("Error saving to localStorage:", error);
      setSubmitting(false);
    }
  };

  return (
    <SignupContainer component="main" maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>

        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ handleSubmit }) => (
            <StyledForm onSubmit={handleSubmit}>
              <Field
                as={TextField}
                variant="outlined"
                margin="normal"
                fullWidth
                id="firstName"
                label="First Name"
                name="firstName"
                autoComplete="firstName"
                autoFocus
              />

              <Field
                as={TextField}
                variant="outlined"
                margin="normal"
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lastName"
              />

              <Field
                as={TextField}
                variant="outlined"
                margin="normal"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />

              <Field
                as={TextField}
                variant="outlined"
                margin="normal"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />

              <StyledButton type="submit" fullWidth variant="contained">
                Sign Up
              </StyledButton>
            </StyledForm>
          )}
        </Formik>
      </Box>
    </SignupContainer>
  );
}
