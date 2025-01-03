import Mock1 from '@/assets/mocks/mock1.jpg';
import Mock2 from '@/assets/mocks/mock2.jpg';
import Mock3 from '@/assets/mocks/mock3.jpg';
import Mock4 from '@/assets/mocks/mock4.jpg';
import EventCard from '@/sections/events/EventCard';
import { Grid, Stack } from '@mui/material';
import OrganizationAbout from './About';

export default function OrganizationInfo() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={8}>
        <Stack spacing={4}>
          <EventCard
            title="Frontend Career"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            date="Jan 03, 7:00 PM"
            place="Online"
            image={Mock1}
          />
          <EventCard
            title="Backend Career"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            date="Jan 03, 7:00 PM"
            place="Online"
            image={Mock2}
          />
          <EventCard
            title="DevOps Career"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            date="Jan 03, 7:00 PM"
            place="Online"
            image={Mock3}
          />
          <EventCard
            title="Fullstack Career"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            date="Jan 03, 7:00 PM"
            place="Online"
            image={Mock4}
          />
        </Stack>
      </Grid>
      <Grid item xs={12} sm={4}>
        <OrganizationAbout />
      </Grid>
    </Grid>
  );
}
