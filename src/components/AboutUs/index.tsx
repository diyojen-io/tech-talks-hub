'use client';
import React from 'react';
import { Box, Typography, Stack, Container } from '@mui/material';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import OrganizationCover from '@/assets/organization-cover.png';
import Button from '../Button/Button';

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
        overflow: 'hidden',
      }}
    >
      <Image
        src={OrganizationCover}
        alt="organization cover"
        objectPosition="bottom"
        objectFit="cover"
        fill
        priority
        style={{ opacity: 0.4 }}
      />

      <Container
        sx={{
          position: 'relative',
        }}
      >
        <Stack gap={1}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography typography={{ xs: 'h5', md: 'h3' }}>
              Let&apos;s build your organization together.
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Typography typography={{ xs: 'body2', md: 'body1' }}>
              We are a team of passionate individuals dedicated to building
              high-quality web applications. Our mission is to deliver solutions
              that help our clients succeed in the digital world.
            </Typography>
          </motion.div>

          <Stack direction="row" spacing={2} mt={{ xs: 0, md: 3 }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Button
                variant={'contained'}
                size={'large'}
                onClick={handleClick}
              >
                Create an Organization
              </Button>
            </motion.div>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};
export default AboutUs;
