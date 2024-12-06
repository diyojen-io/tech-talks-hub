'use client';
import BaseButton from '@/components/BaseButton';
import useAuth from '@/context/AuthContext';
import { Icon } from '@iconify/react';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import { useSnackbar } from 'notistack';
import * as Yup from 'yup';
import BaseModal from '../BaseModal';
import './index.scss';

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignUpModal = ({ isOpen, onClose }: SignUpModalProps) => {
  const { register } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  type TSignUpForm = {
    username: string;
    email: string;
    password: string;
    afterSubmit: string;
  };

  const initialValues: TSignUpForm = {
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
    values: TSignUpForm,
    actions: FormikHelpers<TSignUpForm>,
  ) => {
    const { setErrors, resetForm } = actions;
    try {
      if (!register) return;

      await register({
        username: values.username,
        email: values.email,
        password: values.password,
      });
      enqueueSnackbar('Successfully signed up!', { variant: 'success' });
      onClose();
      resetForm();
    } catch (err: any) {
      setErrors({ afterSubmit: err.message });
    }
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <h2 className="sign-up-modal__title">Sign Up</h2>
      <Formik<TSignUpForm>
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors }) => (
          <Form className="sign-up-modal__form">
            {errors.afterSubmit && (
              <div className="sign-up-modal__error__alert">
                <p className="sign-up-modal__error__alert__text">
                  <Icon icon="material-symbols:warning" fontSize={20} />
                  {errors.afterSubmit}
                </p>
              </div>
            )}
            <div className="sign-up-modal__form-group">
              <label
                className="sign-up-modal__form-group__label"
                htmlFor="username"
              >
                Username
              </label>
              <Field
                className="sign-up-modal__form-group__input"
                type="text"
                id="username"
                name="username"
              />
              <ErrorMessage
                component="div"
                className="sign-up-modal__error"
                name="username"
              />
            </div>
            <div className="sign-up-modal__form-group">
              <label
                className="sign-up-modal__form-group__label"
                htmlFor="email"
              >
                Email
              </label>
              <Field
                className="sign-up-modal__form-group__input"
                type="email"
                id="email"
                name="email"
              />
              <ErrorMessage
                component="div"
                className="sign-up-modal__error"
                name="email"
              />
            </div>
            <div className="sign-up-modal__form-group">
              <label
                className="sign-up-modal__form-group__label"
                htmlFor="password"
              >
                Password
              </label>
              <Field
                className="sign-up-modal__form-group__input"
                type="password"
                id="password"
                name="password"
              />
              <ErrorMessage
                component="div"
                className="sign-up-modal__error"
                name="password"
              />
            </div>
            <BaseButton
              type="submit"
              label="Sign up"
              size="large"
              style={{ width: '100%', marginTop: '16px' }}
            />
          </Form>
        )}
      </Formik>
    </BaseModal>
  );
};

export default SignUpModal;
