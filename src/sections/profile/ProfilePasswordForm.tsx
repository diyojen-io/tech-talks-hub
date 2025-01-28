import React, { useState, useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {
  Box,
  Card,
  CardContent,
  Grid,
  InputLabel,
  IconButton,
  InputAdornment,
  Tooltip,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { useSnackbar } from 'notistack';
import { FormProvider, RHFTextField } from '@/components/hook-form';
import useAuth from '@/context/AuthContext';

interface ChangePasswordFormValues {
  newPassword: string;
  confirmNewPassword: string;
}

const ChangePasswordForm: React.FC = () => {
  const { updatePassword } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false);

  const PasswordChangeSchema = Yup.object().shape({
    newPassword: Yup.string()
      .required('New password is required')
      .min(6, 'Password must be at least 6 characters long')
      .matches(/[a-zA-Z]/, 'Password must contain both letters and numbers'),
    confirmNewPassword: Yup.string()
      .oneOf([Yup.ref('newPassword')], 'Passwords must match')
      .required('Please confirm your new password'),
  });

  const defaultValues: ChangePasswordFormValues = {
    newPassword: '',
    confirmNewPassword: '',
  };

  const methods = useForm({
    resolver: yupResolver(PasswordChangeSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = methods;

  const newPassword = useWatch({
    name: 'newPassword',
    control: methods.control,
  });

  useEffect(() => {
    const passwordRequirements = [
      newPassword.length >= 6,
      /[a-z]/.test(newPassword) && /[A-Z]/.test(newPassword),
      /[0-9]/.test(newPassword) || /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
    ];

    setIsPasswordValid(passwordRequirements.every(Boolean));
  }, [newPassword]);

  const onSubmit = async (values: ChangePasswordFormValues) => {
    try {
      await updatePassword(values.newPassword);
      enqueueSnackbar('Password successfully updated!', { variant: 'success' });
      reset(defaultValues);
      setSubmitError(null);
    } catch (error: any) {
      setSubmitError('Failed to update password. Please try again.');
    }
  };

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const passwordRequirements = [
    { label: 'At least 6 characters', requirementMet: newPassword.length >= 6 },
    {
      label: 'Contains uppercase and lowercase letters',
      requirementMet: /[a-z]/.test(newPassword) && /[A-Z]/.test(newPassword),
    },
    {
      label: 'Includes a number or special character',
      requirementMet:
        /[0-9]/.test(newPassword) || /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
    },
  ];

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
            <Typography variant="h4" fontWeight="bold" mb={1}>
              Change Your Password
            </Typography>
            <Typography variant="body2" mb={1}>
              Please update your password details below
            </Typography>
            <Box sx={{ borderBottom: '1px solid #ddd', mb: 2 }} />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <InputLabel required>New Password</InputLabel>
                  <RHFTextField
                    name="newPassword"
                    type={showPassword ? 'text' : 'password'}
                    fullWidth
                    error={!!errors.newPassword}
                    helperText={errors.newPassword?.message}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Tooltip
                            title={
                              showPassword ? 'Hide password' : 'Show password'
                            }
                          >
                            <IconButton
                              onClick={togglePasswordVisibility}
                              aria-label="toggle password visibility"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
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
                    error={!!errors.confirmNewPassword}
                    helperText={errors.confirmNewPassword?.message}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Tooltip
                            title={
                              showPassword ? 'Hide password' : 'Show password'
                            }
                          >
                            <IconButton
                              onClick={togglePasswordVisibility}
                              aria-label="toggle password visibility"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </Tooltip>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
              {submitError && (
                <Typography variant="body2" sx={{ color: 'error.main' }} mt={2}>
                  {submitError}
                </Typography>
              )}
              <Box display="flex" justifyContent="flex-end" mt={3}>
                <LoadingButton
                  type="submit"
                  loading={isSubmitting}
                  variant="contained"
                  disabled={!isPasswordValid || isSubmitting}
                >
                  Save Changes
                </LoadingButton>
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
              {passwordRequirements.map((item, index) => (
                <Box
                  key={index}
                  sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}
                >
                  {item.requirementMet ? (
                    <CheckCircleIcon sx={{ color: 'success.main' }} />
                  ) : (
                    <CancelIcon sx={{ color: 'error.main' }} />
                  )}
                  <Typography variant="body2">{item.label}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </FormProvider>
  );
};

export default ChangePasswordForm;
