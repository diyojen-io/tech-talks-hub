import Logo from '@/assets/logos/diyojen.png';
import CoverImage from '@/assets/mocks/organization.jpg';
import { Stack, Box, Button, Typography } from '@mui/material';
import Image from 'next/image';

export default function OrganizationCover() {
  return (
    <Box position="relative" width="100%" height={200}>
      <Box position="relative" width="100%" height={100}>
        <Image
          src={CoverImage}
          alt="Organization Cover Image"
          fill
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
            borderRadius: 4,
          }}
        />
      </Box>
      <Box
        display="flex"
        flexDirection="row"
        alignItems="flex-end"
        justifyContent="space-between"
        position="absolute"
        sx={{
          top: 70,
          left: 32,
          width: 'calc(100% - 64px)',
        }}
      >
        <Stack direction="row" spacing={2} alignItems="flex-end">
          <Image
            alt="Diyojen IO"
            src={Logo}
            style={{
              width: 72,
              height: 72,
              border: '4px solid white',
              borderRadius: 4,
            }}
          />
          <Typography variant="h6" textTransform="uppercase">
            Diyojen IO
          </Typography>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            color="primary"
            sx={{ marginLeft: 2, height: 40, borderRadius: 4 }}
          >
            Follow
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{ marginLeft: 2, height: 40, borderRadius: 4 }}
          >
            Join
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
