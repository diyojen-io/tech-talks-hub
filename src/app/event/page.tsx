'use client';

import {
  FormProvider,
  RHFDatePicker,
  RHFTextField,
  RHFTimePicker,
} from '@/components/hook-form';
import useAuth from '@/context/AuthContext';
import { yupResolver } from '@hookform/resolvers/yup';
import { AccessTime, CalendarToday, LocationOn } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  Alert,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Grid,
  InputAdornment,
  InputLabel,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useRouter } from 'next/navigation';

interface EventFormValues {
  title: string;
  date: Date;
  time: Date;
  location: string;
  description: string;
}

const EventInformationSchema = yup.object().shape({
  title: yup.string().required('Event title is required'),
  date: yup.date().required('Date is required'),
  time: yup.date().required('Time is required'),
  location: yup.string().required('Location is required'),
  description: yup.string().required('Description is required'),
});

const defaultValues: EventFormValues = {
  title: '',
  date: new Date(),
  time: new Date(),
  location: '',
  description: '',
};

const CreateEvent = () => {
  const { enqueueSnackbar } = useSnackbar();

  const { user, create } = useAuth();

  const router = useRouter();

  const methods = useForm({
    resolver: yupResolver(EventInformationSchema),
    defaultValues,
    mode: 'onChange',
  });

  const {
    handleSubmit,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = methods;

  const isDisabled = !isDirty || !isValid;

  const onSubmit = async (values: EventFormValues) => {
    try {
      await create('events', {
        ...values,
        createdBy: user?.id,
      });
      enqueueSnackbar('Event Created Successfully', { variant: 'success' });
      router.push('/');
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Failed to create event. Please try again.', {
        variant: 'error',
      });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Container maxWidth="md" sx={{ my: 4 }}>
        <Card sx={{ p: 3, boxShadow: 4, borderRadius: 2, bgcolor: 'grey.200' }}>
          <CardHeader
            title="Create an Event"
            sx={{
              '& .MuiCardHeader-title': {
                fontSize: '1.5rem',
              },
            }}
          />
          <CardContent
            sx={{
              p: 2,
              borderRadius: 2,
              boxShadow: 1,
              maxWidth: '100%',
              height: 'auto',
              bgcolor: 'grey.0',
            }}
          >
            {Object.keys(errors).length > 0 && (
              <Box mb={2}>
                <Alert severity="error">
                  {errors.title?.message || 'Please fix the form errors.'}
                </Alert>
              </Box>
            )}
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <InputLabel required>Event Title</InputLabel>
                <RHFTextField name="title" />
              </Grid>

              <Grid item xs={12} sm={6}>
                <InputLabel required>Date</InputLabel>
                <RHFDatePicker
                  name="date"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarToday sx={{ fontSize: '16px' }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <InputLabel required>Time</InputLabel>
                <RHFTimePicker
                  name="time"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccessTime sx={{ fontSize: '16px' }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12}>
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
                <InputLabel required>Description</InputLabel>
                <RHFTextField
                  name="description"
                  multiline
                  rows={4}
                  placeholder="Tell us something about your event"
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <CardActions
          sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}
        >
          <LoadingButton
            type="submit"
            loading={isSubmitting}
            variant="contained"
            disabled={isDisabled}
          >
            Create Event
          </LoadingButton>
        </CardActions>
      </Container>
    </FormProvider>
  );
};

export default CreateEvent;
