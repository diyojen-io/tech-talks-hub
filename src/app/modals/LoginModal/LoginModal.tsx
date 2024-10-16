"use client";

import { Formik, Form, Field, ErrorMessage } from "formik"; 
import * as Yup from "yup";
import BaseModal from "../BaseModal/BaseModal";
import BaseButton from "@/app/components/BaseButton/BaseButton";
import "./LoginModal.scss";
import useAuth from "@/app/context/AuthContext";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const { login } = useAuth();

  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (
    values: { username: string; password: string }, 
    actions: any
  ) => {
    const {setSubmitting, setStatus } = actions;
    try {
      await login(values.username, values.password); 
      onClose();
    } catch (err) {
      console.error("Login failed:", err);
      setStatus("Login failed. Please try again.");
      setSubmitting(false);
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
        {({ status }) => (
          <Form>
            {status && (
              <div className="login-modal__error login-modal__error--general">
                {status}
              </div>
            )}
            <div className="login-modal__form-group">
              <label className="login-modal__form-group__label" htmlFor="username">
                Email 
              </label>
              <Field
                className="login-modal__form-group__input"
                type="text"
                id="username"
                name="username"
              />
              <ErrorMessage name="username" component="div" className="login-modal__error" />
            </div>
            <div className="login-modal__form-group">
              <label className="login-modal__form-group__label" htmlFor="password">
                Password
              </label>
              <Field
                className="login-modal__form-group__input"
                type="password"
                id="password"
                name="password"
              />
              <ErrorMessage name="password" component="div" className="login-modal__error" />
            </div>
            <BaseButton 
              type="submit" 
              label="Login" 
              size="large" 
              style={{ width: "100%", marginTop: "16px" }} 
            />
          </Form>
        )}
      </Formik>
    </BaseModal>
  );
};

export default LoginModal;
