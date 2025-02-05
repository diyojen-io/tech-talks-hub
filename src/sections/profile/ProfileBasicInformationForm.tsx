'use client';

import {
  FormProvider,
  RHFTextField,
  RHFDatePicker,
} from '@/components/hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  InputLabel,
  InputAdornment,
  Alert,
} from '@mui/material';
import { useForm, useWatch } from 'react-hook-form';
import * as Yup from 'yup';
import useAuth from '@/context/AuthContext';
import { useSnackbar } from 'notistack';
import { LoadingButton } from '@mui/lab';
import {
  LocationOn,
  Email,
  AccountCircle,
  CalendarToday,
  Person,
  GitHub,
  Twitter,
  Instagram,
  LinkedIn,
} from '@mui/icons-material';

interface BasicInformationFormValues {
  email: string;
  displayName: string;
  username: string;
  birthDay: string;
  location: string;
  about: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
  github?: string;
}

export default function ProfileBasicInformationForm() {
  const { update, user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  const BasicInformationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Please enter a valid email')
      .required('Email is required'),
    displayName: Yup.string().required('Display Name is required'),
    username: Yup.string().required('Username is required'),
    birthDay: Yup.string().required('Birth Day is required'),
    location: Yup.string().required('Location is required'),
    about: Yup.string(),
    twitter: Yup.string(),
    instagram: Yup.string(),
    linkedin: Yup.string(),
    github: Yup.string(),
  });

  const defaultValues: BasicInformationFormValues = {
    email: user?.email || '',
    displayName: user?.displayName || '',
    username: user?.username || '',
    birthDay: user?.birthDay || '',
    location: user?.location || '',
    about: user?.about || '',
    twitter: user?.twitter || '',
    instagram: user?.instagram || '',
    linkedin: user?.linkedin || '',
    github: user?.github || '',
  };

  const methods = useForm<BasicInformationFormValues>({
    resolver: yupResolver(BasicInformationSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    setError,
    clearErrors,
    control,
    formState: { errors, isSubmitting },
  } = methods;

  const requiredFields = useWatch({
    control,
    name: ['email', 'displayName', 'username', 'birthDay', 'location'],
  });

  const isDisabled = requiredFields.some((value) => !value);

  const onSubmit = async (values: BasicInformationFormValues) => {
    try {
      clearErrors();
      await update('users', user?.id!, values);
      enqueueSnackbar('Profile updated successfully', { variant: 'success' });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'An unknown error occurred';
      setError('email', { type: 'manual', message: errorMessage });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Card
            sx={{
              p: 3,
              borderRadius: 2,
              boxShadow: 1,
              maxWidth: '100%',
              height: 'auto',
            }}
          >
            <CardHeader title="Basic Information" />
            <CardContent>
              {Object.keys(errors).length > 0 && (
                <Box mb={2}>
                  <Alert severity="error">
                    {errors.email?.message || 'Please fix the form errors.'}
                  </Alert>
                </Box>
              )}

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <InputLabel required>Email</InputLabel>
                  <RHFTextField
                    name="email"
                    type="email"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email sx={{ fontSize: '16px' }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={6}>
                  <InputLabel required>Username</InputLabel>
                  <RHFTextField
                    name="username"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircle sx={{ fontSize: '16px' }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={6}>
                  <InputLabel required>Display Name</InputLabel>
                  <RHFTextField
                    name="displayName"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person sx={{ fontSize: '16px' }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={6}>
                  <InputLabel required>Birth Day</InputLabel>
                  <RHFDatePicker
                    name="birthDay"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CalendarToday sx={{ fontSize: '16px' }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={6}>
                  <InputLabel required>Location</InputLabel>
                  <RHFTextField
                    name="location"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocationOn sx={{ fontSize: '16px' }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <InputLabel>About</InputLabel>
                  <RHFTextField
                    name="about"
                    multiline
                    rows={4}
                    placeholder="Tell us something about you."
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card
            sx={{
              p: 3,
              borderRadius: 2,
              boxShadow: 1,
              maxWidth: '100%',
              height: 'auto',
            }}
          >
            <CardHeader title="Socials" />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <InputLabel>Twitter</InputLabel>
                  <RHFTextField
                    name="twitter"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Twitter sx={{ fontSize: '16px' }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={6}>
                  <InputLabel>Instagram</InputLabel>
                  <RHFTextField
                    name="instagram"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Instagram sx={{ fontSize: '16px' }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={6}>
                  <InputLabel>Linkedin</InputLabel>
                  <RHFTextField
                    name="linkedin"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LinkedIn sx={{ fontSize: '16px' }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={6}>
                  <InputLabel>Github</InputLabel>
                  <RHFTextField
                    name="github"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <GitHub sx={{ fontSize: '16px' }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Box width="100%" display="flex" justifyContent="flex-end" mt={4}>
          <LoadingButton
            type="submit"
            loading={isSubmitting}
            variant="contained"
            disabled={isDisabled}
          >
            Save Changes
          </LoadingButton>
        </Box>
      </Grid>
    </FormProvider>
  );
}
