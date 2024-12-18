'use client';

import { useState, useEffect, useCallback } from 'react';
import useAuth from '@/context/AuthContext';
import './page.scss';
import { Icon } from '@iconify/react';
import accountCircle from '@iconify/icons-ic/outline-account-circle';
import CircularProgress from '@mui/material/CircularProgress';
import BaseButton from '@/components/BaseButton';
import { updateProfile, updateEmail, updatePassword } from 'firebase/auth';
import Dropzone from '@/components/Dropzone'; // Dropzone bileşenini import ettik

export default function Page() {
  const { isAuthenticated, user, isLoading: authLoading } = useAuth();
  const [userInfo, setUserInfo] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    photoURL: '',
    bio: '', // Yeni alan ekliyoruz
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
        bio: user.bio || '', // Biyografi bilgisi de alınabilir
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const { username, email, password, confirmPassword, photoURL, bio } = userInfo;

    if (!username || !email) {
      setError('Username and email cannot be empty.');
      return;
    }

    if (password && password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      if (user) {
        if (username !== user.displayName) {
          await updateProfile(user, { displayName: username });
        }

        if (email !== user.email) {
          await updateEmail(user, email);
        }

        if (password) {
          await updatePassword(user, password);
        }

        if (photoURL && photoURL !== user.photoURL) {
          await updateProfile(user, { photoURL });
        }

        if (bio !== user.bio) {
          // Biyografi güncelleme işlemi yapılabilir.
          await updateProfile(user, { bio });
        }

        setSuccess('Profile successfully updated.');
      }
    } catch (err) {
      setError('Failed to update profile. ' + err.message);
    } finally {
      setLoading(false);
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
            
              <textarea
                id="bio"
                name="bio"
                value={userInfo.bio}
                onChange={handleInputChange}
                placeholder="Tell us something about yourself"
                style={{
                  width: '350px',     
                  height: '70%',    
                  padding: '10px',   
                  fontSize: '1rem',   
                  border: '1px solid #ccc', 
                  borderRadius: '5px', 
                }}
              />
            </div>
                       
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}

            <form className="profile__form" onSubmit={handleSubmit}>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={userInfo.username}
                onChange={handleInputChange}
                placeholder="Enter your username"
              />

              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={userInfo.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
              />

              <label htmlFor="password">New Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={userInfo.password}
                onChange={handleInputChange}
                placeholder="Enter your new password"
              />

              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={userInfo.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm your new password"
              />

              <BaseButton type="submit" label="Update Profile" size="medium" style={{ width: '35%',height:'10%', marginTop: '0.5rem' }} />
            </form>
          </div>
        )
      )}
    </>
  );
}
