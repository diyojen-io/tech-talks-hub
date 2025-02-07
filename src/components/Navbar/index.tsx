'use client';

import { useRouter } from 'next/navigation';
import { AppBar, Toolbar, Box, Typography, Button } from '@mui/material';
import useAuth from '@/context/AuthContext';
import { useModalContext } from '@/context/ModalContext';
import AccountMenu from '../AccountMenu';
import Button from '../Button/Button';

const Navbar = () => {
  const { openModal } = useModalContext();
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: '#000',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.8)',
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          height: '80px',
          alignItems: 'center',
          p: '16px 48px',
        }}
      >
        <Typography
          variant="h4"
          component="a"
          href="/"
          sx={{
            textDecoration: 'none',
            color: '#fff',
            fontWeight: 500,
            letterSpacing: '1px',
            padding: '5px 3px',
            backgroundColor: '#000',
            display: 'inline-block',
            cursor: 'pointer',
          }}
        >
          TechTalks
          <Box
            component="span"
            sx={{
              backgroundColor: 'primary.main',
              color: '#000',
              fontWeight: 600,
              borderRadius: '4px',
              px: '5px',
              ml: '5px',
            }}
          >
            hub
          </Box>
        </Typography>

        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <Typography
            variant="subtitle1"
            sx={{
              color: '#fff',
              fontWeight: 400,
              cursor: 'pointer',
              '&:hover': { textDecoration: 'underline' },
            }}
            onClick={() => router.push('/event')}
          >
            Create a Event
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            color: '#fff',
          }}
        >
          {isAuthenticated ? (
            <AccountMenu />
          ) : (
            <>
              <Button
                onClick={() => openModal('login')}
                sx={{
                  cursor: 'pointer',
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                Login
              </Button>
              <Button
                onClick={() => openModal('signup')}
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    textDecoration: 'underline',
                    color: '#fff',
                    opacity: 0.8,
                    transition: 'background-color 0.3s',
                  },
                  backgroundColor: 'transparent',
                  color: '#fff',
                  border: '1px solid #FF6700',
                }}
              >
                Sign Up
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
