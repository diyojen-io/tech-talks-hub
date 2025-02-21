'use client';
import React, { useState } from 'react';
import useAuth from '@/context/AuthContext';
import { Icon } from '@iconify/react';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import { useSnackbar } from 'notistack';
import * as Yup from 'yup';
import './index.scss';
import Button from '@/components/Button/Button';
import BaseModal from '../BaseModal';
import { Stack, Typography, TypographyProps } from '@mui/material';
import { ERROR, GREY, PRIMARY } from '@/theme/palette';
import Modal from '../Modal';

interface SignUpFormValues {
  username: string;
  email: string;
  password: string;
  afterSubmit?: string;
}

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignUpModal: React.FC<SignUpModalProps> = ({ isOpen, onClose }) => {
  const { register } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  const [isLoading, setIsLoading] = useState(false);

  const initialValues: SignUpFormValues = {
    username: '',
    email: '',
    password: '',
    afterSubmit: '',
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(5, 'Username must be at least 5 characters*')
      .required('Username is required*'),
    email: Yup.string()
      .email('Invalid email format*')
      .required('Email is required*'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters*')
      .required('Password is required*'),
  });

  const handleSubmit = async (
    values: SignUpFormValues,
    actions: FormikHelpers<SignUpFormValues>,
  ) => {
    const { setErrors, resetForm } = actions;
    setIsLoading(true);
    try {
      await register(values.username, values.email, values.password);
      enqueueSnackbar('Successfully signed up!', {
        variant: 'success',
        vertical: 'bottom',
      });
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
          Sign Up
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
                    Username
                  </Typography>
                  <Field
                    className="sign-up-modal__form-group__input"
                    type="text"
                    id="username"
                    name="username"
                  />
                  <ErrorMessage
                    name="username"
                    component={({ children }: TypographyProps) => (
                      <Typography variant="caption" color={ERROR.main}>
                        {children}
                      </Typography>
                    )}
                  />
                </Stack>
                <Stack gap={1}>
                  <Typography fontWeight={600} color={PRIMARY.main}>
                    Email
                  </Typography>
                  <Field
                    className="sign-up-modal__form-group__input"
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
                    className="sign-up-modal__form-group__input"
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
                      {errors.afterSubmit}
                    </Typography>
                  </Stack>
                )}
                <Button
                  disabled={isLoading}
                  loading={isLoading}
                  type="submit"
                  variant="contained"
                >
                  Sign up
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </>
    </Modal>
  );
};

export default SignUpModal;
