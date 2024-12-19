'use client';

import useAuth from '@/context/AuthContext';
import './page.scss';
import CircularProgress from '@mui/material/CircularProgress';
import BaseButton from '@/components/BaseButton';
import TextField from '@mui/material/TextField'; 
import { useState, useEffect, useCallback } from 'react';
import { updateProfile, updateEmail, updatePassword } from 'firebase/auth';
import { Form, Formik } from 'formik';
import Dropzone from '@/components/Dropzone'; 
import * as Yup from 'yup';

export default function Page() {
  const { isAuthenticated, user, isLoading: authLoading } = useAuth();
  const [userInfo, setUserInfo] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    photoURL: '',
    bio: '', 
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setUserInfo({
        username: user.displayName || '',
        email: user.email || '',
        photoURL: user.photoURL || '',
        bio: user.bio || '', 
      });
    }
  }, [user]);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = () => {
      setUserInfo((prevInfo) => ({
        ...prevInfo,
        photoURL: reader.result,
      }));
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  }, []);

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(5, 'Username must be at least 5 characters').required('Username is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').nullable(),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
    photoURL: Yup.string(),
    bio: Yup.string().max(150, 'Bio must be at most 150 characters')
  });

  const handleFormikSubmit = async (values, { setSubmitting, resetForm }) => {
    setError(null);
    setSuccess(null);
    setLoading(true);
  
    try {
      if (user) {
        const { username, email, password, photoURL, bio } = values;
  
        const profileUpdates = {};
        if (username && username !== user.displayName) profileUpdates.displayName = username;
        if (photoURL && photoURL !== user.photoURL) profileUpdates.photoURL = photoURL;
        if (bio && bio !== user.bio) profileUpdates.bio = bio;
  
        if (Object.keys(profileUpdates).length > 0) {
          await updateProfile(user, profileUpdates);
        }
  
        if (email && email !== user.email) {
          await updateEmail(user, email);
        }
        if (password) {
          await updatePassword(user, password);
        }
  
        setSuccess('Profile successfully updated.');
      }
    } catch (err) {
      setError('Failed to update profile. ' + err.message);
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <>
      {authLoading || loading ? (
        <div className="loading-container">
          <CircularProgress color="inherit" />
        </div>
      ) : (
        isAuthenticated &&
        user && (
          <div className="profile">
            <div className="profile__header">
              <Dropzone
                onDrop={onDrop}
                photoURL={userInfo.photoURL} 
                isDragActive={false}
              />
              <h1 className="profile__name">{userInfo.username || 'Username not provided'}</h1>
              <p className="profile__email">{userInfo.email || 'Email not provided'}</p>
            
              <TextField
               label="Bio"
               id="bio"
               name="bio"
               value={userInfo.bio}
               onChange={(e) => setUserInfo((prev) => ({ ...prev, bio: e.target.value }))}
               placeholder="Tell us something about yourself"
               multiline
               rows={5} 
               variant="outlined"
               margin="normal"
               style={{ width: '300px' }}
            />
            </div>
                        
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}

            <Formik
              initialValues={userInfo} 
              enableReinitialize 
              validationSchema={validationSchema}
              onSubmit={handleFormikSubmit} 
            >
              {({ isSubmitting, values, errors, touched, handleBlur, handleChange }) => (
                <Form className="profile__form">
                  
                  <TextField 
                    label="Username"
                    id="username"
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.username && Boolean(errors.username)} 
                    helperText={touched.username && errors.username}
                    variant="outlined"
                    fullWidth 
                    margin="normal"
                  />

                  <TextField 
                    label="Email"
                    id="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && Boolean(errors.email)} 
                    helperText={touched.email && errors.email}
                    variant="outlined"
                    fullWidth 
                    margin="normal"
                  />

                  <TextField 
                    label="New Password"
                    id="password"
                    name="password"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.password && Boolean(errors.password)} 
                    helperText={touched.password && errors.password}
                    variant="outlined"
                    fullWidth 
                    margin="normal"
                  />

                  <TextField 
                    label="Confirm Password"
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.confirmPassword && Boolean(errors.confirmPassword)} 
                    helperText={touched.confirmPassword && errors.confirmPassword}
                    variant="outlined"
                    fullWidth 
                    margin="normal"
                  />

                  <BaseButton 
                    type="submit" 
                    label={isSubmitting ? 'Updating...' : 'Update Profile'} 
                    size="medium" 
                    style={{ width: '35%', height: '10%', marginTop: '0.5rem' }} 
                  />
                </Form>
              )}
            </Formik>
          </div>
        )
      )}
    </>
  );
}
