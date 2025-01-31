'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  TextField,
  Button,
  Card,
  CardContent,
  InputLabel,
  Typography,
  Grid,
  Box,
  Snackbar,
  Alert,
} from '@mui/material';

import {
  LocalizationProvider,
  DatePicker,
  TimePicker,
} from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const schema = yup.object().shape({
  title: yup.string().required('Event title is required'),
  date: yup.date().required('Date is required').typeError('Invalid date'),
  time: yup.date().required('Time is required').typeError('Invalid time'),
  location: yup.string().required('Location is required'),
  description: yup.string().required('Description is required'),
});

const CreateEvent = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: '',
      date: null,
      time: null,
      location: '',
      description: '',
    },
  });

  const onSubmit = (data) => {
    setOpenSnackbar(true);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          backgroundColor: '#f4f4f4',
          p: 3,
        }}
      >
        <Card
          sx={{
            maxWidth: 600,
            width: '100%',
            p: 3,
            boxShadow: 4,
            borderRadius: 2,
          }}
        >
          <CardContent>
            <Typography
              variant="h4"
              sx={{ fontWeight: 600, textAlign: 'center', mb: 3 }}
            >
              Create an Event
            </Typography>

            <Grid
              container
              spacing={2}
              component="form"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Grid item xs={12}>
                <InputLabel required>Event Title</InputLabel>
                <Controller
                  name="title"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      error={!!errors.title}
                      helperText={errors.title?.message}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <InputLabel required>Date</InputLabel>
                    <Controller
                      name="date"
                      control={control}
                      render={({ field }) => (
                        <DatePicker
                          {...field}
                          value={field.value}
                          onChange={field.onChange}
                          slotProps={{
                            textField: {
                              fullWidth: true,
                              error: !!errors.date,
                              helperText: errors.date?.message,
                            },
                          }}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <InputLabel required>Time</InputLabel>
                    <Controller
                      name="time"
                      control={control}
                      render={({ field }) => (
                        <TimePicker
                          {...field}
                          value={field.value}
                          onChange={field.onChange}
                          slotProps={{
                            textField: {
                              fullWidth: true,
                              error: !!errors.time,
                              helperText: errors.time?.message,
                            },
                          }}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <InputLabel required>Location</InputLabel>
                <Controller
                  name="location"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      error={!!errors.location}
                      helperText={errors.location?.message}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <InputLabel required>Description</InputLabel>
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      multiline
                      rows={4}
                      error={!!errors.description}
                      helperText={errors.description?.message}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  type="submit"
                  sx={{ py: 1.5 }}
                >
                  Create Event
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          sx={{ width: '100%' }}
        >
          Event Created Successfully!
        </Alert>
      </Snackbar>
    </LocalizationProvider>
  );
};

export default CreateEvent;
