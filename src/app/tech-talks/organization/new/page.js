"use client";
import React, { useEffect, useState } from "react";
import { Formik, Field, Form } from "formik";
import { TextField, Button, Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import * as Yup from "yup";


const organizationSchema = Yup.object().shape({
  organizationName: Yup.string().required("Organization name is required"),
  occupation: Yup.string().required("Occupation is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("eMail is required"),
  location: Yup.string().required("Location is required"),
  items: Yup.array().of(
    Yup.object().shape({
      Logo: Yup.mixed().required("Logo is required"),
    })
  ),
});

const CreateOrganizationForm = () => {
  const [initialValues, setInitialValues] = useState({
    organizationName: "",
    occupation: "",
    email: "",
    location: "",
    items: [{ Logo: null }],
  });

  useEffect(() => {
    const savedOrganization = JSON.parse(
      window.localStorage.getItem("organization")
    );
    if (savedOrganization) {
      setInitialValues(savedOrganization);
    }
  }, []);

  return (
    <Container
      maxWidth="sm"
      sx={{
        height: "calc(100vh - 60px)",
      }}
    >
      <Box
        sx={{
          my: 4,
          height: "100%",
          width: "100%",
          display: "flex",
          justifyContent: " center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Create Organization
        </Typography>
        <Formik
          validationSchema={organizationSchema}
          initialValues={initialValues}
          onSubmit={async (values, { setSubmitting }) => {
            await new Promise((r) => setTimeout(r, 500));
            values.createdBy = "ozkan";
            values.owner = "ozkan";
            values.createdAt = new Date().toISOString();
            alert(JSON.stringify(values, null, 2));
            window.localStorage.setItem("organization", JSON.stringify(values));
            setSubmitting(false);
          }}
          enableReinitialize
        >
          {({ handleSubmit, isSubmitting, errors, touched }) => (
            <Form onSubmit={handleSubmit}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
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
      </Box>
    </Container>
  );
};

export default CreateOrganizationForm;
