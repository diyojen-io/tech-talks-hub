import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import React from 'react';
import './index.scss';
import Button from '../Button/Button';
import { Box, Stack, Typography } from '@mui/material';

interface ContentCardProps {
  imageUrl: StaticImport;
  title: string;
  description: string;
}

const MeetingCard: React.FC<ContentCardProps> = ({
  imageUrl,
  title,
  description,
}) => {
  return (
    <Stack
      position={'relative'}
      maxWidth={{ xs: 'unset', md: '300px' }}
      gap={0.5}
    >
      <Box height={200} width={'100%'} position={'relative'}>
        <Image
          src={imageUrl}
          alt={title}
          fill
          priority
          style={{
            borderRadius: '10px',
            objectFit: 'cover',
          }}
        />
      </Box>
      <Typography variant="h6">{title}</Typography>
      <Typography>{description}</Typography>
      <Button size="small" variant="outlined">
        Go to Detail
      </Button>
    </Stack>
  );
};

export default MeetingCard;
