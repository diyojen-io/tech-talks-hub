'use client';
import React, { useState } from 'react';
import {
  Container,
  Grid,
  Avatar,
  Typography,
  Box,
  Tabs,
  Tab,
  Card,
  IconButton,
} from '@mui/material';
import {
  Edit,
  GitHub,
  Twitter,
  Email,
  CalendarToday,
  Instagram,
  LinkedIn,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import useAuth from '@/context/AuthContext';
import Dropzone from '@/components/Dropzone';

const ProfilePage = () => {
  const { user } = useAuth();
  const [tabValue, setTabValue] = useState(0);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const router = useRouter();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleSettings = () => {
    router.push('/profile-settings');
  };

  const handleFileUpload = (files: File[]) => {
    if (files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ pt: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4} sx={{ mb: 4 }}>
          <Card
            sx={{
              p: 4,
              borderRadius: 2,
              bgcolor: 'background.paper',
              boxShadow: 1,
            }}
          >
            <Box sx={{ position: 'relative', textAlign: 'center', mb: 3 }}>
              <Avatar
                src={profileImage || user?.profileImage}
                sx={{
                  width: 120,
                  height: 120,
                  fontSize: '2.5rem',
                  margin: '0 auto',
                  color: 'white',
                  position: 'relative',
                }}
              >
                {!profileImage &&
                  !user?.profileImage &&
                  user?.displayName?.[0]?.toUpperCase()}
              </Avatar>

              {!profileImage && !user?.profileImage && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: 'rgba(255, 255, 255, 0.7)',
                    borderRadius: '50%',
                    cursor: 'pointer',
                  }}
                >
                  <Dropzone onDrop={handleFileUpload} />
                </Box>
              )}

              <IconButton
                size="small"
                sx={{
                  position: 'absolute',
                  right: -8,
                  top: '0%',
                  transform: 'translateY(-50%)',
                  bgcolor: 'background.paper',
                  border: '1px solid',
                  borderColor: 'divider',
                  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                  '&:hover': { bgcolor: 'grey.200' },
                }}
                onClick={handleSettings}
              >
                <Edit sx={{ fontSize: 14 }} />
              </IconButton>
            </Box>

            <Typography variant="h5" align="center">
              {user?.displayName}
            </Typography>
            <Typography variant="body2" align="center" sx={{ mb: 2 }}>
              @{user?.username}
            </Typography>

            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" gutterBottom>
                Contact Information
              </Typography>
              <Box sx={contactBoxStyle}>
                <Email sx={iconStyle} color="primary" />
                <Typography variant="body2">{user?.email}</Typography>
              </Box>
              <Box sx={contactBoxStyle}>
                <CalendarToday sx={iconStyle} color="primary" />
                <Typography variant="body2">
                  BirthDay{' '}
                  {user?.birthDay
                    ? new Date(user.birthDay).toLocaleDateString()
                    : 'N/A'}
                </Typography>
              </Box>

              <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
                Social
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                <IconButton size="small" color="primary">
                  <GitHub sx={{ fontSize: 20 }} />
                </IconButton>
                <IconButton size="small" color="primary">
                  <Twitter sx={{ fontSize: 20 }} />
                </IconButton>
                <IconButton size="small" color="primary">
                  <Instagram sx={{ fontSize: 20 }} />
                </IconButton>
                <IconButton size="small" color="primary">
                  <LinkedIn sx={{ fontSize: 20 }} />
                </IconButton>
              </Box>
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card>
            <Tabs value={tabValue} onChange={handleTabChange} sx={tabsStyle}>
              <Tab label="About" />
              <Tab label="Events" />
              <Tab label="Activity" />
            </Tabs>

            <Box sx={{ p: 2 }}>
              {tabValue === 0 && (
                <>
                  <Typography variant="h6" gutterBottom>
                    About Me
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      mb: 4,
                      lineHeight: 1.7,
                      wordBreak: 'break-word',
                      overflowWrap: 'break-word',
                    }}
                  >
                    {user?.about}
                  </Typography>
                </>
              )}
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

const iconStyle = { fontSize: 14 };

const contactBoxStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: 1,
  mb: 1,
};

const tabsStyle = {
  borderBottom: '1px solid #eee',
  '& .MuiTab-root': {
    textTransform: 'none',
    minWidth: 100,
    fontSize: '1rem',
  },
};

export default ProfilePage;
