'use client';

import {
  RHFDatePicker,
  RHFTimePicker,
} from '@/components/hook-form/RHFDatePicker';
import { FormProvider, RHFTextField } from '@/components/hook-form';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Card,
  CardContent,
  InputLabel,
  InputAdornment,
  Typography,
  Alert,
  Grid,
  Box,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { LoadingButton } from '@mui/lab';
import * as Icons from '@mui/icons-material';

interface EventFormValues {
  title: string;
  date: Date | null;
  time: Date | null;
  location: string;
  description: string;
}

const EventInformationSchema = yup.object().shape({
  title: yup.string().required('Event title is required'),
  date: yup.date().required('Date is required').typeError('Invalid date'),
  time: yup.date().required('Time is required').typeError('Invalid time'),
  location: yup.string().required('Location is required'),
  description: yup.string().required('Description is required'),
});

const defaultValues: EventFormValues = {
  title: '',
  date: null,
  time: null,
  location: '',
  description: '',
};

const CreateEvent = () => {
  const { enqueueSnackbar } = useSnackbar();

  const methods = useForm({
    resolver: yupResolver(EventInformationSchema),
    defaultValues,
    mode: 'onChange',
  });

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = methods;

  const requiredFields = useWatch({
    control,
    name: ['title', 'date', 'time', 'location', 'description'],
  });

  const isDisabled = requiredFields.some((value) => !value);

  const onSubmit = async (values: EventFormValues) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      enqueueSnackbar('Event Created Successfully', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Failed to create event. Please try again.', {
        variant: 'error',
      });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid
        item
        xs={12}
        display="flex"
        alignItems="center"
        flexDirection="column"
        m={4}
      >
        <Grid>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Create a Event
          </Typography>
          <Card
            sx={{
              maxWidth: 700,
              width: '100%',
              p: 3,
              boxShadow: 4,
              borderRadius: 2,
              bgcolor: 'grey.200',
            }}
          >
            <Card
              sx={{
                p: 2,
                borderRadius: 2,
                boxShadow: 1,
                maxWidth: '100%',
                height: 'auto',
              }}
            >
              <CardContent>
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
                    <RHFTextField
                      name="title"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Icons.Title sx={{ fontSize: '16px' }} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <InputLabel required>Date</InputLabel>
                    <RHFDatePicker
                      name="date"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Icons.CalendarToday sx={{ fontSize: '16px' }} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <InputLabel required>Time</InputLabel>
                    <RHFTimePicker
                      name="time"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Icons.AccessTime sx={{ fontSize: '16px' }} />
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
                            <Icons.LocationOn sx={{ fontSize: '16px' }} />
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
            <Box width="100%" display="flex" justifyContent="flex-end" mt={4}>
              <LoadingButton
                type="submit"
                loading={isSubmitting}
                variant="contained"
                disabled={isDisabled}
              >
                Create Event
              </LoadingButton>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
};

export default CreateEvent;
