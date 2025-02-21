'use client';
import React, { useState } from 'react';
import useAuth from '@/context/AuthContext';
import { Icon } from '@iconify/react';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import { useSnackbar } from 'notistack';
import * as Yup from 'yup';
import './index.scss';
import Button from '@/components/Button/Button';
import Modal from '../Modal';
import { Stack, Typography, TypographyProps } from '@mui/material';
import { ERROR, GREY, PRIMARY } from '@/theme/palette';

interface LoginValues {
  email: string;
  password: string;
  afterSubmit: string;
}

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const { login } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  const [isLoading, setIsLoading] = useState(false);

  const initialValues: LoginValues = {
    email: '',
    password: '',
    afterSubmit: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required*'),
    password: Yup.string().required('Password is required*'),
    afterSubmit: Yup.string(),
  });

  const handleSubmit = async (
    values: { email: string; password: string },
    actions: FormikHelpers<LoginValues>,
  ) => {
    const { setErrors, resetForm } = actions;
    setIsLoading(true);
    try {
      await login(values.email, values.password);
      enqueueSnackbar('Successfully logged in', { variant: 'success' });
      onClose();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrors({ afterSubmit: err.message });
      }
    } finally {
      setIsLoading(false);
      resetForm();
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <>
        <Typography textAlign={'center'} color={PRIMARY.main} variant="h4">
          Login
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors }) => (
            <Form>
              <Stack gap={2}>
                <Stack gap={1}>
                  <Typography fontWeight={600} color={PRIMARY.main}>
                    Email
                  </Typography>
                  <Field
                    className="login-modal__form-group__input"
                    type="email"
                    id="email"
                    name="email"
                  />
                  <ErrorMessage
                    name="email"
                    component={({ children }: TypographyProps) => (
                      <Typography variant="caption" color={ERROR.main}>
                        {children}
                      </Typography>
                    )}
                  />
                </Stack>
                <Stack gap={1}>
                  <Typography fontWeight={600} color={PRIMARY.main}>
                    Password
                  </Typography>
                  <Field
                    className="login-modal__form-group__input"
                    type="password"
                    id="password"
                    name="password"
                  />
                  <ErrorMessage
                    name="password"
                    component={({ children }: TypographyProps) => (
                      <Typography variant="caption" color={ERROR.main}>
                        {children}
                      </Typography>
                    )}
                  />
                </Stack>
                {errors.afterSubmit && (
                  <Stack
                    borderRadius={0.5}
                    gap={1}
                    direction={'row'}
                    bgcolor={ERROR.main}
                    py={0.5}
                    px={1}
                  >
                    <Icon
                      color={GREY[0]}
                      icon="material-symbols:warning"
                      fontSize={20}
                    />
                    <Typography color={GREY[0]} variant="body2">
                      Kullanıcı adı veya şifre hatalı
                    </Typography>
                  </Stack>
                )}
                <Button
                  disabled={isLoading}
                  loading={isLoading}
                  type="submit"
                  variant="contained"
                >
                  Login
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </>
    </Modal>
  );
};

export default LoginModal;
