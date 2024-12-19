<<<<<<< Updated upstream
import OrganizationNewCreate from '@/sections/organization/OrganizationNewCreate';
import { Container } from '@mui/material';
=======
import BaseButton from '@/components/BaseButton';
import {
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Grid2,
  InputLabel,
  Stack,
  TextField,
  MenuItem,
  Box,
} from '@mui/material';

const COUNTRIES = [
  {
    value: 'tr',
    label: 'Türkiye',
  },
  {
    value: 'us',
    label: 'United States',
  },
  {
    value: 'uk',
    label: 'United Kingdom',
  },
  {
    value: 'ca',
    label: 'Canada',
  },
  {
    value: 'au',
    label: 'Australia',
  },
];

const ORGANIZATION_TYPES = [
  {
    value: 'tech',
    label: 'Tech',
  },
  {
    value: 'non-profit',
    label: 'Non-Profit',
  },
  {
    value: 'government',
    label: 'Government',
  },
  {
    value: 'education',
    label: 'Education',
  },
  {
    value: 'healthcare',
    label: 'Healthcare',
  },
];

const VISIBILITIES = [
  {
    value: 'public',
    label: 'Public',
  },
  {
    value: 'private',
    label: 'Private',
  },
];
>>>>>>> Stashed changes

export default function Page() {
  return (
    <Container maxWidth="lg">
<<<<<<< Updated upstream
      <OrganizationNewCreate />
=======
      <Card
        sx={{
          padding: 2,
          maxWidth: 800,
          margin: '48px auto',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
        }}
      >
        <CardHeader title="Create Organization" />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <InputLabel
                sx={{ fontSize: 10, textTransform: 'uppercase', opacity: 0.8 }}
                required
              >
                Organization Name
              </InputLabel>
              <TextField
                fullWidth
                margin="dense"
                variant="outlined"
                size="small"
                sx={{
                  '& .MuiInputBase-input': {
                    fontSize: 14,
                  },
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <InputLabel
                sx={{ fontSize: 10, textTransform: 'uppercase', opacity: 0.8 }}
                required
              >
                Location
              </InputLabel>
              <TextField
                size="small"
                margin="dense"
                fullWidth
                select
                sx={{
                  '& .MuiInputBase-input': {
                    fontSize: 14,
                  },
                }}
              >
                {COUNTRIES.map((option) => (
                  <MenuItem
                    key={option.value}
                    value={option.value}
                    sx={{ fontSize: 14 }}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={6}>
              <InputLabel
                sx={{ fontSize: 10, textTransform: 'uppercase', opacity: 0.8 }}
              >
                Website
              </InputLabel>
              <TextField
                fullWidth
                margin="dense"
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={6}>
              <InputLabel
                sx={{ fontSize: 10, textTransform: 'uppercase', opacity: 0.8 }}
                required
              >
                Type of Organization
              </InputLabel>
              <TextField
                size="small"
                margin="dense"
                fullWidth
                select
                sx={{
                  '& .MuiInputBase-input': {
                    fontSize: 14,
                  },
                }}
              >
                {ORGANIZATION_TYPES.map((option) => (
                  <MenuItem
                    key={option.value}
                    value={option.value}
                    sx={{ fontSize: 14 }}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <InputLabel
                sx={{ fontSize: 10, textTransform: 'uppercase', opacity: 0.8 }}
                required
              >
                Visibility
              </InputLabel>
              <TextField
                size="small"
                margin="dense"
                fullWidth
                select
                sx={{
                  '& .MuiInputBase-input': {
                    fontSize: 14,
                  },
                }}
              >
                {VISIBILITIES.map((option) => (
                  <MenuItem
                    key={option.value}
                    value={option.value}
                    sx={{ fontSize: 14 }}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <InputLabel
                sx={{ fontSize: 10, textTransform: 'uppercase', opacity: 0.8 }}
              >
                Description
              </InputLabel>
              <TextField
                fullWidth
                margin="dense"
                multiline
                size="small"
                rows={2}
                variant="outlined"
                sx={{
                  '& .MuiInputBase-input': {
                    fontSize: 14,
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="flex-end">
                <BaseButton size="large" variant="primary" label="Create" />
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
>>>>>>> Stashed changes
    </Container>
  );
}
