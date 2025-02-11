import { useState, useCallback, useEffect } from 'react';
import ContentCard from '../EventCard';
import './index.scss';
import useAuth from '@/context/AuthContext';
import MockImage from '@/assets/mocks/mock1.jpg';
import { Container, Grid, Typography } from '@mui/material';

interface Event {
  title: string;
  description: string;
  location: string;
  date: number;
  time: number;
  createdBy: string;
}

const EventsContainer: React.FC = () => {
  const { getAll } = useAuth();

  const [events, setEvents] = useState<Event[]>([]);

  const getEvents = useCallback(async () => {
    const response = await getAll('events');
    setEvents(response);
  }, []);

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <Container
      maxWidth="lg"
      sx={{
        my: 4,
      }}
    >
      <Typography variant="h4" sx={{ mb: 4 }}>
        Events
      </Typography>
      <Grid container spacing={2}>
        {events.map((event, index) => (
          <Grid key={index} item xs={12} sm={6} md={4}>
            <ContentCard
              imageUrl={MockImage}
              title={event.title}
              description={event.description}
              location={event.location}
              date={event.date}
              time={event.time}
              createdBy={event.createdBy}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default EventsContainer;
