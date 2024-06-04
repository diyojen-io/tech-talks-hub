"use client";
import React from "react";
import { Formik, Field, Form } from "formik";
import { TextField, Button, Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import * as Yup from "yup";
import { styled } from "@mui/material";
import Head from "next/head";
import useLocalStorage from "../../../hooks/useLocalStorage";

const CreateBox = styled(Box)(({ theme }) => ({
  height: "80vh",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
}));

const organizationSchema = Yup.object().shape({
  organizationName: Yup.string().required("Organization name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  location: Yup.string().required("Location is required"),
  items: Yup.array().of(
    Yup.object().shape({
      Logo: Yup.mixed().required("Logo is required"),
    })
  ),
});

export default function CreateOrganizationForm() {
  const [organizationData, setOrganizationData] = useLocalStorage(
    "organization",
    {
      organizationName: "",
      occupation: "",
      email: "",
      location: "",
      items: [{ Logo: null }],
    }
  );

  const submitCreateForm = async (values, { setSubmitting }) => {
    values.createdBy = "ozkan";
    values.owner = "ozkan";
    values.createdAt = new Date().toISOString();
    setOrganizationData(values); // Yerel depolama işlemi
    setSubmitting(false);
  };

  return (
    <>
      <Head>
        <title>Create Organization</title>
      </Head>
      <CreateBox>
        <Typography variant="h4" component="h1" gutterBottom>
          Create Organization
        </Typography>
        <Formik
          validationSchema={organizationSchema}
          initialValues={organizationData}
          onSubmit={submitCreateForm}
          enableReinitialize
        >
          {({ handleSubmit, isSubmitting, errors, touched }) => (
            <Form onSubmit={handleSubmit} style={{ width: "100%" }}>
              <Box display="flex" flexDirection="column" gap={3}>
                <Field name="organizationName">
                  {({ field }) => (
                    <TextField
                      {...field}
                      id="organizationName"
                      label="Organization Name"
                      variant="outlined"
                      fullWidth
                      error={
                        touched.organizationName &&
                        Boolean(errors.organizationName)
                      }
                      helperText={
                        touched.organizationName && errors.organizationName
                      }
                    />
                  )}
                </Field>
                <Field name="occupation">
                  {({ field }) => (
                    <TextField
                      {...field}
                      id="occupation"
                      label="Occupation"
                      variant="outlined"
                      fullWidth
                      error={touched.occupation && Boolean(errors.occupation)}
                      helperText={touched.occupation && errors.occupation}
                    />
                  )}
                </Field>
                <Field name="location">
                  {({ field }) => (
                    <TextField
                      {...field}
                      id="location"
                      label="Location"
                      variant="outlined"
                      fullWidth
                      error={touched.location && Boolean(errors.location)}
                      helperText={touched.location && errors.location}
                    />
                  )}
                </Field>
                <Field name="email">
                  {({ field }) => (
                    <TextField
                      {...field}
                      id="email"
                      label="Email"
                      variant="outlined"
                      type="email"
                      fullWidth
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                    />
                  )}
                </Field>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                >
                  Submit
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </CreateBox>
    </>
  );
}
