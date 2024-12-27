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
} from '@/assets/icons';
import { useEffect } from 'react';

interface BasicInformationFormValues {
  email: string;
  displayName: string;
  username: string;
  birthDay: string;
  location: string;
  about: string;
  facebook?: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
  github?: string;
}

const InputField = ({ name, label, icon }) => (
  <Grid item xs={12} md={6}>
    <InputLabel required>{label}</InputLabel>
    <RHFTextField
      name={name}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            {icon}
          </InputAdornment>
        ),
      }}
    />
  </Grid>
);

const SocialInputField = ({ name, label, icon }) => (
  <Grid item xs={12}>
    <InputLabel>{label}</InputLabel>
    <RHFTextField
      name={name}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            {icon}
          </InputAdornment>
        ),
      }}
    />
  </Grid>
);

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
    facebook: Yup.string(),
    twitter: Yup.string(),
    instagram: Yup.string(),
    linkedin: Yup.string(),
    github: Yup.string(),
  });

  const defaultValues = {
    email: '',
    displayName: '',
    username: '',
    birthDay: '',
    location: '',
    about: '',
    facebook: '',
    twitter: '',
    instagram: '',
    linkedin: '',
    github: '',
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

  useEffect(() => {
    if (user) {
      reset({
        email: user.email || '',
        displayName: user.displayName || '',
        username: user.username || '',
        birthDay: user.birthDay || '',
        location: user.location || '',
        about: user.about || '',
        facebook: user.social?.facebook || '',
        twitter: user.social?.twitter || '',
        instagram: user.social?.instagram || '',
        linkedin: user.social?.linkedin || '',
        github: user.social?.github || '',
      });
    }
  }, [user, reset]);

  const onSubmit = async (values: BasicInformationFormValues) => {
    try {
      console.log('values: ', values);
      await update('users', user.id, values);
      enqueueSnackbar('Profile updated successfully', { variant: 'success' });
    } catch (error) {
      console.error(error);
      enqueueSnackbar('An error occurred while updating the profile', { variant: 'error' });
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
                <InputField name="displayName" label="Display Name" icon={<AccountCircleIcon />} />
                <InputField name="username" label="Username" icon={<PersonIcon />} />
                <InputField name="birthDay" label="Birth Day" icon={<CalendarTodayIcon />} />
                <InputField name="location" label="Location" icon={<LocationOnIcon />} />
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
                <SocialInputField name="facebook" label="Facebook" icon={<FacebookIcon />} />
                <SocialInputField name="twitter" label="Twitter" icon={<TwitterIcon />} />
                <SocialInputField name="instagram" label="Instagram" icon={<InstagramIcon />} />
                <SocialInputField name="linkedin" label="LinkedIn" icon={<LinkedInIcon />} />
                <SocialInputField name="github" label="Github" icon={<GitHubIcon />} />
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
