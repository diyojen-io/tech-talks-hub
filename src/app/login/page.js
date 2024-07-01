"use client";
import * as React from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Avatar,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { styled } from "@mui/system";
import { useRouter } from "next/navigation";
import { useAuth } from "../contexts/AuthContext";

const LoginContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: `calc(100vh - 56px)`,
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  margin: theme.spacing(1),
  backgroundColor: theme.palette.secondary.main,
}));

const StyledForm = styled(Form)(({ theme }) => ({
  width: "100%",
  marginTop: theme.spacing(1),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
}));

export default function Login() {
  const { login } = useAuth();
  const router = useRouter();

  return (
    <LoginContainer maxWidth="xs">
      <StyledAvatar>
        <LockOutlinedIcon />
      </StyledAvatar>
      <Typography component="h1" variant="h5">
        Login
      </Typography>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values) => {
          console.log("values: ", values);
          await login(values);
          router.push("/");
        }}
      >
        {({ handleSubmit }) => (
          <StyledForm onSubmit={handleSubmit}>
            <Field
              as={TextField}
              variant="outlined"
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
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
            <StyledButton
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Login
            </StyledButton>
          </StyledForm>
        )}
      </Formik>
    </LoginContainer>
  );
}
