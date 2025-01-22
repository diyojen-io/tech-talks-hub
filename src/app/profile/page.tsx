'use client';
import React, { useState } from 'react';
import {
  Container,
  Grid,
  Avatar,
  Typography,
  Box,
  Stack,
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

const ProfilePage = () => {
  const { user } = useAuth();
  const [tabValue, setTabValue] = useState(0);

  const router = useRouter();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleSettings = () => {
    router.push('/profile-settings');
  };

  return (
    <Container maxWidth="lg" sx={{ pt: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4} sx={{ mb: 4 }}>
          <Card
            sx={{
              p: 4,
              borderRadius: 2,
              bgcolor: 'grey.0',
              boxShadow: 1,
            }}
          >
            <Box sx={{ position: 'relative', textAlign: 'center', mb: 3 }}>
              <Avatar
                sx={{
                  width: 120,
                  height: 120,
                  fontSize: '2.5rem',
                  margin: '0 auto',
                  color: 'white',
                  position: 'relative',
                  bgcolor: 'grey.300',
                }}
              >
                {user?.displayName?.[0]?.toUpperCase()}
              </Avatar>

              <IconButton
                size="small"
                sx={{
                  position: 'absolute',
                  right: -8,
                  top: '0%',
                  transform: 'translateY(-50%)',
                  bgcolor: 'grey.100',
                  border: '1px solid',
                  borderColor: 'divider',
                  boxShadow: '0px 2px 4px #0000002a',
                  '&:hover': { bgcolor: 'grey.300' },
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
                <Email sx={{ ...iconStyle, color: 'primary.main' }} />
                <Typography variant="body2">{user?.email}</Typography>
              </Box>
              <Box sx={contactBoxStyle}>
                <CalendarToday sx={{ ...iconStyle, color: 'primary.main' }} />
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
                <IconButton size="small" sx={{ color: 'primary.main' }}>
                  <GitHub sx={{ fontSize: 20 }} />
                </IconButton>
                <IconButton size="small" sx={{ color: 'primary.main' }}>
                  <Twitter sx={{ fontSize: 20 }} />
                </IconButton>
                <IconButton size="small" sx={{ color: 'primary.main' }}>
                  <Instagram sx={{ fontSize: 20 }} />
                </IconButton>
                <IconButton size="small" sx={{ color: 'primary.main' }}>
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

            {tabValue === 0 && (
              <Stack spacing={2} sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  About Me
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    lineHeight: 1.7,
                    wordBreak: 'break-word',
                    overflowWrap: 'break-word',
                  }}
                >
                  {user?.about}
                </Typography>
              </Stack>
            )}
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
