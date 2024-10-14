"use client";

import {Formik, Form,Field,ErrorMessage} from "formik"; 
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

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });
  
  const handleSubmit = (value:{username:string, password:string})=>{
    login(value.username, value.password);
    onClose();
  }

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <h2 className="login-modal__title">Login</h2>
     <Formik
      initialValues={{ username: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      >
        {({})=>(
          <Form>
            <div className="login-modal__form-group">
              <label className="login-modal__form-group__label" htmlFor="username">
                Username
              </label>
              <Field
                className="login-modal__form-group__input"
                type="text"
                id="username"
                name="username"
              />
              <ErrorMessage name="username" component="div" className="error-message" />
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
            <BaseButton type="submit" label="Login" size="large" 
             />
          </Form>   
          )}
      </Formik>
    </BaseModal>
  );
};

export default LoginModal;


        
   
