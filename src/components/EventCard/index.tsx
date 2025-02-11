import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from '@mui/material';
import Image from 'next/image';
import React from 'react';

interface ContentCardProps {
  imageUrl: string;
  title: string;
  description: string;
}

const MeetingCard: React.FC<ContentCardProps> = ({
  imageUrl,
  title,
  description,
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
      <CardMedia sx={{ height: 200, position: 'relative' }}>
        <Image src={imageUrl} alt={title} layout="fill" objectFit="cover" />
      </CardMedia>
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

export default MeetingCard;
