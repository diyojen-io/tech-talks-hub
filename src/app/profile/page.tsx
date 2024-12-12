'use client';
import { useState, useEffect, useRef } from 'react';
import useAuth from '@/context/AuthContext';
import './page.scss';
import { Icon } from '@iconify/react'; 
import accountCircle from '@iconify/icons-ic/outline-account-circle';
import CircularProgress from '@mui/material/CircularProgress';
import BaseButton from '@/components/BaseButton';
import { updateProfile, updateEmail, updatePassword } from 'firebase/auth'; 
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'; 
import { getFirestore, doc, updateDoc } from 'firebase/firestore'; 

export default function Page() {
  const { isAuthenticated, user, logout, isLoading: authLoading } = useAuth();
  const [userInfo, setUserInfo] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    photoURL: ''
  });
  const [error, setError] = useState(null); 
  const [success, setSuccess] = useState(null); 

  const photoInputRef = useRef(null);

  useEffect(() => {
    if (user) {
      setUserInfo({
        username: user.displayName || '',
        email: user.email || '',
        photoURL: user.photoURL || ''
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) { 
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserInfo((prevInfo) => ({
          ...prevInfo,
          photoURL: reader.result 
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setError('Please select a valid image file.');
    }
  };

  const handleChangePhotoClick = () => {
    if (photoInputRef.current) {
      photoInputRef.current.click();
    }
  };


  const handleSavePhoto = async () => {
    const { username, photoURL } = userInfo;
    if (!photoURL) return;
    
    try {
      const storage = getStorage();
      const storageRef = ref(storage, 'profile_pictures/' + user.uid); 
      const uploadTask = uploadBytesResumable(storageRef, photoURL); 

      uploadTask.on(
        'state_changed',
        null,
        (error) => {
          setError('Failed to upload photo. ' + error.message);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref); 
          await updateProfile(user, { displayName: username, photoURL: downloadURL }); 
          const db = getFirestore();
          const userRef = doc(db, 'users', user.uid);
          await updateDoc(userRef, { photoURL: downloadURL }); 
          setSuccess('Photo updated successfully.');
        }
      );
    } catch (err) {
      setError('Failed to save photo. ' + err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    
    const { username, email, password, confirmPassword, photoURL } = userInfo;
    
    if (!username || !email) {
      setError('Username and Email cannot be empty.');
      return;
    }

    if (password && password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      if (user) {
        if (username !== user.displayName) {
          await updateProfile(user, { displayName: username, photoURL });
        }

        if (email !== user.email) {
          await updateEmail(user, email);
        }

        if (password) {
          await updatePassword(user, password);
        }

        setSuccess('Profile updated successfully.');
      }
    } catch (err) {
      setError('Failed to update profile. ' + err.message);
    }
  };

  return (
    <>
      {authLoading ? (
        <div className="loading-container">
          <CircularProgress color="inherit" />
        </div>
      ) : (
        isAuthenticated && user ? (
          <div className="profile">
            <div className="profile__header">
              <div className="profile__photo-container">
                {userInfo.photoURL ? (
                  <img
                    src={userInfo.photoURL}
                    alt="User Profile"
                    width="80"
                    height="80"
                    className="profile__photo"
                  />
                ) : (
                  <Icon icon={accountCircle} width="80" height="80" />
                )}
              
                <BaseButton 
                  type="button" 
                  label="Change Photo" 
                  size="large" 
                  onClick={handleChangePhotoClick} 
                />
                <BaseButton 
                  type="button" 
                  label="Save Photo" 
                  size="large" 
                  style={{backgroundColor: "red"}}
                  onClick={handleSavePhoto} 
                />
                <input
                  type="file"
                  ref={photoInputRef} 
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: 'none' }} 
                />
              </div>
              <h1 className="profile__name">{userInfo.username || 'Username not set'}</h1>
              <p className="profile__email">{userInfo.email || 'Email not set'}</p>
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

              <BaseButton 
                type="submit" 
                label="Update Profile" 
                size="large" 
                style={{ width: '100%' }} 
              />
            </form>

            <button
              className="profile__logout-button"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        ) : (
          <p>Please log in to view your profile.</p> 
        )
      )}
    </>
  );
}
