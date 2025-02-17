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
    const { setErrors, reset } = actions;
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
      reset();
    }
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <h2 className="login-modal__title">Login</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors }) => (
          <Form className="login-modal__form">
            {errors.afterSubmit && (
              <div className="login-modal__error__alert">
                <p className="login-modal__error__alert__error__text">
                  <Icon icon="material-symbols:warning" fontSize={20} />
                  {errors.afterSubmit}
                </p>
              </div>
            )}
            <div className="login-modal__form-group">
              <label className="login-modal__form-group__label" htmlFor="email">
                Email
              </label>
              <Field
                className="login-modal__form-group__input"
                type="email"
                id="email"
                name="email"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="login-modal__error"
              />
            </div>
            <div className="login-modal__form-group">
              <label
                className="login-modal__form-group__label"
                htmlFor="password"
              >
                Password
              </label>
              <Field
                className="login-modal__form-group__input"
                type="password"
                id="password"
                name="password"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="login-modal__error"
              />
            </div>
            <Button
              disabled={isLoading}
              loading={isLoading}
              type="submit"
              variant="contained"
            >
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </BaseModal>
  );
};

export default LoginModal;
