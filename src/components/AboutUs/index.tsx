'use client';
import React from 'react';
import { Box, Typography, Button, Grid, Stack } from '@mui/material';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';

const AboutUs: React.FC = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/organization/create');
  };

  return (
    <Box
      sx={{
        background:
          'linear-gradient(to right, rgb(48, 22, 1), rgb(201, 112, 3))',
        color: '#fff',
        padding: { xs: '2rem 1rem', md: '4rem 2rem' },
        position: 'relative',
        height: '50vh',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
        }}
      >
        <Image
          src="/Organization.png"
          alt="Organization"
          layout="fill"
          objectFit="cover"
          priority
          style={{ opacity: 0.4 }}
        />
      </Box>

      <Grid
        container
        alignItems="center"
        spacing={4}
        sx={{
          position: 'relative',
          zIndex: 1,
          textAlign: { xs: 'center', md: 'left' },
        }}
      >
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography variant="h3">
              Let's build your organization together.
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Typography
              variant="body1"
              paragraph
              sx={{
                marginTop: 2,
              }}
            >
              We are a team of passionate individuals dedicated to building
              high-quality web applications. Our mission is to deliver solutions
              that help our clients succeed in the digital world.
            </Typography>
          </motion.div>

          <Stack direction="row" spacing={2} mt={3}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Button variant="contained" size="large" onClick={handleClick}>
                Create an Organization
              </Button>
            </motion.div>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};
export default AboutUs;
