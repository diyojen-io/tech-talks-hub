import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PublicIcon from '@mui/icons-material/Public';
import { Box, Card, CardContent, Stack, Typography } from '@mui/material';

export default function OrganizationAbout() {
  return (
    <Card
      sx={{
        backgroundColor: 'secondary.main',
      }}
    >
      <CardContent>
        <Typography variant="h6" mb={2}>
          About
        </Typography>
        <Stack spacing={2}>
          <Typography variant="body2" fontSize={14}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            condimentum tortor sem, eget facilisis felis dictum ut. Sed
            vestibulum, nunc nec fringilla tincidunt, magna est fermentum nunc,
            nec scelerisque felis odio ac justo.
          </Typography>
          <Stack direction="row" alignItems="center" spacing={1}>
            <CalendarTodayIcon fontSize="small" />
            <Typography variant="caption" color="textSecondary">
              Created on 2024-10-10
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            <PublicIcon fontSize="small" />
            <Typography variant="caption" color="textSecondary">
              Public
            </Typography>
          </Stack>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            width="100%"
          >
            <InfoStack count={160} label="Members" />
            <InfoStack count={520} label="Followers" />
            <InfoStack count={4} label="Events" />
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

interface InfoStackProps {
  count: number;
  label: string;
}

function InfoStack({ count, label }: InfoStackProps) {
  return (
    <Stack spacing={1}>
      <Typography fontWeight="bold" variant="body2">
        {count}
      </Typography>
      <Typography variant="caption" color="textSecondary">
        {label}
      </Typography>
    </Stack>
  );
}
