'use client';
import React, { useState, useCallback, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Paper,
  Chip,
  Divider,
  IconButton,
  Grid,
  Avatar,
  Box,
} from '@mui/material';
import useAuth from '@/context/AuthContext';
import {
  Event,
  LocationOn,
  AccessTime,
  People,
  Share,
  FavoriteBorder,
  Favorite,
} from '@mui/icons-material';

const EventDetail = () => {
  const [liked, setLiked] = useState(false);
  const [isAttending, setIsAttending] = useState(false);
  const { getAll } = useAuth();
  const searchParams = useSearchParams();
  const eventId = searchParams.get('id');

  interface Event {
    id: string;
    title: string;
    description: string;
    location: string;
    date: string;
    time: string;
    createdBy?: {
      id: number;
      displayName?: string;
    };
  }

  const [events, setEvents] = useState<Event[]>([]);

  const getEvents = useCallback(async () => {
    const response = await getAll('events');
    setEvents(response || []);
  }, [getAll]);

  useEffect(() => {
    getEvents();
  }, [getEvents]);

  const event = events.find((event) => event.id === eventId);

  if (!event) {
    return (
      <Container>
        {/* daha sonra control icin bir sayfa yapilabilir */}
      </Container>
    );
  }

  const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const formattedTime = new Date(event.time).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Card
        sx={{ boxShadow: 6, borderRadius: 4, overflow: 'hidden', mb: '2rem' }}
      >
        <CardMedia component="img" height="400" image="" alt="Event Cover" />
        <CardContent>
          <Typography variant="h3" fontWeight="bold">
            {event.title}
          </Typography>

          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12} sm={6} md={4}>
              <Chip
                icon={<Event />}
                label={`Date: ${formattedDate}`}
                color="primary"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Chip
                icon={<AccessTime />}
                label={`Time: ${formattedTime}`}
                color="secondary"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Chip
                icon={<LocationOn />}
                label={`Location: ${event.location}`}
                color="success"
              />
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" fontWeight="bold" gutterBottom>
            About the Event
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {event.description}
          </Typography>

          <Divider sx={{ my: 3 }} />

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <Paper
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  p: 2,
                  borderRadius: 3,
                  boxShadow: 2,
                }}
              >
                <People color="primary" />
                <Typography variant="body1">100+ Participants</Typography>
              </Paper>
            </Grid>
          </Grid>

          <Box
            display="flex"
            alignItems="center"
            sx={{ mt: 3, p: 2, borderRadius: 3, backgroundColor: '#f5f5f5' }}
          >
            <Avatar sx={{ width: 56, height: 56, mr: 2 }}>
              {event.createdBy?.displayName?.slice(0, 1).toUpperCase() || '?'}
            </Avatar>
            <Box>
              <Typography variant="subtitle1" fontWeight="bold">
                Organized by
              </Typography>
              <Typography variant="body1" color="text.primary">
                {event.createdBy?.displayName || 'Unknown Organizer'}
              </Typography>
            </Box>
          </Box>
        </CardContent>

        <CardActions sx={{ display: 'flex', px: 3, gap: '2rem', pb: 3 }}>
          <Button
            variant="contained"
            color={isAttending ? 'success' : 'primary'}
            startIcon={<People />}
            sx={{ borderRadius: 3, px: 3 }}
            onClick={() => setIsAttending(!isAttending)}
          >
            {isAttending ? 'Attending' : 'Join'}
          </Button>

          <Button
            startIcon={<Share />}
            color="primary"
            variant="outlined"
            sx={{ borderRadius: 3 }}
          >
            Share
          </Button>

          <IconButton onClick={() => setLiked(!liked)}>
            {liked ? <Favorite sx={{ color: 'red' }} /> : <FavoriteBorder />}
          </IconButton>
        </CardActions>
      </Card>
    </Container>
  );
};

export default EventDetail;
