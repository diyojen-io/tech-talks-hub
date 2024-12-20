'use client';

import { FormProvider, RHFTextField } from '@/components/hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  InputLabel,
  InputAdornment,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import useAuth from '@/context/AuthContext';
import { useSnackbar } from 'notistack';
import {
  EmailIcon,
  AccountCircleIcon,
  PersonIcon,
  CalendarTodayIcon,
  LocationOnIcon,
  FacebookIcon,
  TwitterIcon,
  InstagramIcon,
  LinkedInIcon,
  InfoIcon,
  GitHubIcon,
} from '@/app/icons';

interface BasicInformationFormValues {
  email: string;
  displayName: string;
  username: string;
  birthDay: string;
  location: string;
  about: string;
}

export default function ProfileBasicInformationForm() {
  const { update, user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  const BasicInformationSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    displayName: Yup.string().required(),
    username: Yup.string().required(),
    birthDay: Yup.string().required(),
    location: Yup.string().required(),
    about: Yup.string(),
  });

  const defaultValues = {
    email: '',
    displayName: '',
    username: '',
    birthDay: '',
    location: '',
    about: '',
  };

  const methods = useForm({
    resolver: yupResolver(BasicInformationSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (values: BasicInformationFormValues) => {
    try {
      console.log('values: ', values);
      // await update('users', '23432', values);
      // reset(defaultValues);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={4}>
        <Grid item xs={8}>
          <Card
            sx={{
              p: 3,
              borderRadius: 2,
              boxShadow: 1,
              maxWidth: 800,
            }}
          >
            <CardHeader title="Basic Information" />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <InputLabel required>Email</InputLabel>
                  <RHFTextField
                    name="email"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <InputLabel required>Display Name</InputLabel>
                  <RHFTextField
                    name="displayName"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircleIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <InputLabel required>Username</InputLabel>
                  <RHFTextField
                    name="username"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <InputLabel required>Birth Day</InputLabel>
                  <RHFTextField
                    name="birthDay"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CalendarTodayIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <InputLabel required>Location</InputLabel>
                  <RHFTextField
                    name="location"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocationOnIcon />
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
                    rows={3}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <InfoIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card
            sx={{
              p: 3,
              borderRadius: 2,
              boxShadow: 1,
            }}
          >
            <CardHeader title="Socials" />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <InputLabel>Facebook</InputLabel>
                  <RHFTextField
                    name="facebook"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FacebookIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel>Twitter</InputLabel>
                  <RHFTextField
                    name="twitter"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <TwitterIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel>Instagram</InputLabel>
                  <RHFTextField
                    name="instagram"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <InstagramIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel>LinkedIn</InputLabel>
                  <RHFTextField
                    name="linkedin"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LinkedInIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel>Github</InputLabel>
                  <RHFTextField
                    name="linkedin"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <GitHubIcon/>
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
          <Button type="submit" disabled={isSubmitting}>
            Save Changes
          </Button>
        </Box>
      </Grid>
    </FormProvider>
  );
}
