import { useState, useEffect } from 'react';
import ContentCard from '../EventCard';
import './index.scss';
import useAuth from '@/context/AuthContext';
import MockImage from '@/assets/mocks/mock1.jpg';
import { Container, Grid, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  date: number;
  time: number;
  createdBy: {
    id: number;
    displayName: string;
  };
}

const EventsContainer: React.FC = () => {
  const { getAll } = useAuth();
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await getAll('events');
      setEvents(response);
    };

    fetchEvents();
  }, []);

  const handleEventClick = (eventId: string) => {
    router.push(`/event-detail/${eventId}`);
  };

  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Events
      </Typography>
      <Grid container spacing={2}>
        {events.map((event) => (
          <Grid key={event.id} item xs={12} sm={6} md={4}>
            <div
              onClick={() => handleEventClick(event.id)}
              style={{ cursor: 'pointer' }}
            >
              <ContentCard
                key={event.id}
                imageUrl={MockImage}
                title={event.title}
                description={event.description}
                location={event.location}
                date={event.date}
                time={event.time}
                createdBy={event.createdBy.displayName}
              />
            </div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default EventsContainer;
