'use client';

import { FormProvider, RHFTextField } from '@/components/hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  InputLabel,
  IconButton,
  InputAdornment,
  Tooltip,
  Typography,
} from '@mui/material';
import { useForm, useWatch } from 'react-hook-form';
import * as Yup from 'yup';
import useAuth from '@/context/AuthContext';
import { useState } from 'react';
import { useSnackbar } from 'notistack';
import {
  Visibility,
  VisibilityOff,
  CheckCircleIcon,
  CancelIcon,
} from '@/assets/icons';

interface ChangePasswordFormValues {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export default function ChangePasswordForm() {
  const { updatePassword } = useAuth(); 
  const { enqueueSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const PasswordChangeSchema = Yup.object().shape({
    currentPassword: Yup.string().required('Current password is required'),
    newPassword: Yup.string()
      .required('New password is required')
      .min(6, 'Password must be at least 6 characters long')
      .matches(/[a-zA-Z]/, 'Password must contain both letters and numbers'),
    confirmNewPassword: Yup.string()
      .oneOf([Yup.ref('newPassword')], 'Passwords must match')
      .required('Please confirm your new password'),
  });

  const defaultValues = {
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  };

  const methods = useForm({
    resolver: yupResolver(PasswordChangeSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = methods;

  const newPassword = useWatch({ name: 'newPassword', control: methods.control });

  const onSubmit = async (values: ChangePasswordFormValues) => {
    try {
     
      await updatePassword(values.currentPassword, values.newPassword); 

      enqueueSnackbar('Password successfully updated!', { variant: 'success' });
      reset(defaultValues); 
    } catch (error:any) {
      enqueueSnackbar('Failed to update password. Please try again.', { variant: 'error' });
    }
  };

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const isAtLeast6Chars = newPassword.length >= 6;
  const hasUpperAndLowerCase = /[a-z]/.test(newPassword) && /[A-Z]/.test(newPassword);
  const hasNumberOrSpecialChar = /[0-9]/.test(newPassword) || /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);

  const requirements = [
    { requirement: 'At least 6 characters', met: isAtLeast6Chars },
    { requirement: 'Contains uppercase and lowercase letters', met: hasUpperAndLowerCase },
    { requirement: 'Includes a number or special character', met: hasNumberOrSpecialChar },
  ];

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
            <Typography variant="h4" fontWeight="bold" mb={1}>
              Change Your Password
            </Typography>
            <Typography variant="body1" mb={1}>
              Please update your password details below
            </Typography>
            <Box sx={{ borderBottom: '1px solid #ddd', mb: 2 }} />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <InputLabel required>Current Password</InputLabel>
                  <RHFTextField name="currentPassword" type="password" fullWidth />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <InputLabel required>New Password</InputLabel>
                  <RHFTextField
                    name="newPassword"
                    type={showPassword ? 'text' : 'password'}
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Tooltip title={showPassword ? 'Hide password' : 'Show password'}>
                            <IconButton onClick={togglePasswordVisibility}>
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </Tooltip>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <InputLabel required>Confirm New Password</InputLabel>
                  <RHFTextField
                    name="confirmNewPassword"
                    type={showPassword ? 'text' : 'password'}
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Tooltip title={showPassword ? 'Hide password' : 'Show password'}>
                            <IconButton onClick={togglePasswordVisibility}>
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </Tooltip>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
              <Box width="100%" display="flex" justifyContent="flex-end" mt={3}>
                <Button type="submit" disabled={isSubmitting} variant="contained">
                  Save Changes
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              p: 3,
              border: '1px solid #ddd',
              borderRadius: 2,
              backgroundColor: '#f9f9f9',
              boxShadow: 2,
            }}
          >
            <Typography variant="h5" fontWeight="bold" mb={2}>
              Password Requirements
            </Typography>
            <Box>
              {requirements.map((item, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  {item.met ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}
                  <Typography variant="body1">{item.requirement}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </FormProvider>
  );
}