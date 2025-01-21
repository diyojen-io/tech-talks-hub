'use client';

import { FormProvider, RHFTextField } from '@/components/hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
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
import { LoadingButton } from '@mui/lab';
import EmailIcon from '@mui/icons-material/Email';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Person from '@mui/icons-material/Person';
import CalendarToday from '@mui/icons-material/CalendarToday';
import LocationOn from '@mui/icons-material/LocationOn';
import Facebook from '@mui/icons-material/Facebook';
import Twitter from '@mui/icons-material/Twitter';
import Instagram from '@mui/icons-material/Instagram';
import LinkedIn from '@mui/icons-material/LinkedIn';
import GitHub from '@mui/icons-material/GitHub';
import Info from '@mui/icons-material/Info';
import FormInputField from '@/components/FormInputField';

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
    email: user?.email || '',
    displayName: user?.displayName || '',
    username: user?.username || '',
    birthDay: user?.birthDay || '',
    location: user?.location || '',
    about: user?.about || '',
    facebook: user?.social?.facebook || '',
    twitter: user?.social?.twitter || '',
    instagram: user?.social?.instagram || '',
    linkedin: user?.social?.linkedin || '',
    github: user?.social?.github || '',
  };

  const methods = useForm({
    resolver: yupResolver(BasicInformationSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (values: BasicInformationFormValues) => {
    try {
      await update('users', user.id, values);
      enqueueSnackbar('Profile updated successfully', { variant: 'success' });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      enqueueSnackbar(`Error: ${errorMessage}`, { variant: 'error' });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={4}>
        <Grid item xs={8}>
          <Card sx={{ p: 3, borderRadius: 2, boxShadow: 1, maxWidth: 800 }}>
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
                <FormInputField name="displayName" label="Display Name" icon={<AccountCircle />} />
                <FormInputField name="username" label="Username" icon={<Person />} />
                <FormInputField name="birthDay" label="Birth Day" icon={<CalendarToday />} />
                <FormInputField name="location" label="Location" icon={<LocationOn />} />

                <Grid item xs={12}>
                  <InputLabel>About</InputLabel>
                  <RHFTextField
                    name="about"
                    multiline
                    rows={3}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Info />
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
          <Card sx={{ p: 3, borderRadius: 2, boxShadow: 1 }}>
            <CardHeader title="Socials" />
            <CardContent>
              <Grid container spacing={2}>
                <FormInputField name="facebook" label="Facebook" icon={<Facebook />} isSocial />
                <FormInputField name="twitter" label="Twitter" icon={<Twitter />} isSocial />
                <FormInputField name="instagram" label="Instagram" icon={<Instagram />} isSocial />
                <FormInputField name="linkedin" label="LinkedIn" icon={<LinkedIn />} isSocial />
                <FormInputField name="github" label="Github" icon={<GitHub />} isSocial />
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Box width="100%" display="flex" justifyContent="flex-end" mt={4}>
          <LoadingButton type="submit" loading={isSubmitting} variant="contained">
            Save Changes
          </LoadingButton>
        </Box>
      </Grid>
    </FormProvider>
  );
}
