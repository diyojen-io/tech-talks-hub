import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from '@mui/material';
import Image, { StaticImageData } from 'next/image';
import React from 'react';

interface ContentCardProps {
  title: string;
  description: string;
  location: string;
  date: number;
  time: number;
  createdBy: string;
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
    <Card
      sx={{
        maxWidth: 300,
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <Image src={imageUrl} alt={title} width={300} height={200} />
      <CardContent>
        <Typography variant="h6" component="h4" sx={{ margin: 0 }}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ margin: 0 }}>
          {description}
        </Typography>
        <Button variant="outlined" color="primary" size="small" sx={{ mt: 1 }}>
          Go to Detail
        </Button>
      </CardContent>
    </Card>
  );
};

export default EventCard;
