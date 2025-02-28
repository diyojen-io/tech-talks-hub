import { Card, CardContent, Typography, Container } from '@mui/material';
import Image, { StaticImageData } from 'next/image';
import React from 'react';

interface ContentCardProps {
  title: string;
  description: string;
  location: string;
  date: number;
  time: number;
  createdBy: {
    id: number;
    displayName: string;
  };
  imageUrl: StaticImageData;
}

const EventCard: React.FC<ContentCardProps> = ({
  title,
  description,
  location,
  date,
  time,
  createdBy,
  imageUrl,
}) => {
  return (
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        mt: 3,
      }}
    >
      <Card
        sx={{
          maxWidth: 300,
          borderRadius: 4,
          boxShadow: 5,
          bgcolor: 'grey.200',
          overflow: 'hidden',
          transition: '0.3s',
          '&:hover': {
            transform: 'scale(1.03)',
            boxShadow: 7,
          },
        }}
      >
        <Image src={imageUrl} alt={title} width={300} height={200} />
        <CardContent sx={{ p: 3 }}>
          <Typography
            variant="h6"
            component="h4"
            sx={{
              fontWeight: 'bold',
              color: '#333',
              cursor: 'pointer',
              transition: '0.3s',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {description}
          </Typography>

          <Typography variant="body2" sx={{ fontWeight: 500, mt: 1 }}>
            📍 {location}
          </Typography>
          <Typography variant="body2" sx={{ color: 'gray', mt: 0.5 }}>
            📅 {new Date(date).toLocaleDateString()} - ⏰{' '}
            {new Date(time).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Typography>

          <Typography
            variant="caption"
            sx={{ color: 'gray', fontStyle: 'italic', mt: 1 }}
          >
            Created by: {createdBy?.displayName || 'unknown'}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default EventCard;
