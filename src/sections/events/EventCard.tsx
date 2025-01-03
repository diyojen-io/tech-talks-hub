import PlaceIcon from '@mui/icons-material/Place';
import {
  Avatar,
  AvatarGroup,
  Box,
  Card,
  CardContent,
  CardHeader,
  Stack,
  Typography,
} from '@mui/material';
import Image, { StaticImageData } from 'next/image';

interface EventCardProps {
  title: string;
  description: string;
  date: string;
  place: string;
  image: StaticImageData;
}

export default function EventCard({
  title,
  description,
  date,
  place,
  image,
}: EventCardProps) {
  return (
    <Card>
      <CardHeader
        title={title}
        sx={{
          paddingBottom: 0,
        }}
      />
      <CardContent>
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack direction="column" justifyContent="flex-start" spacing={2}>
            <Typography variant="body2">{description}</Typography>
            <Stack direction="row" spacing={4} alignItems="center">
              <Typography variant="caption" color="textSecondary">
                {date}
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                <PlaceIcon fontSize="small" />
                <Typography variant="caption" color="textSecondary">
                  {place}
                </Typography>
              </Stack>
              <AvatarGroup
                spacing="medium"
                sx={{
                  alignItems: 'center',
                }}
              >
                <Avatar
                  alt="Remy Sharp"
                  src="/static/images/avatar/1.jpg"
                  sx={{
                    width: 24,
                    height: 24,
                  }}
                />
                <Avatar
                  alt="Travis Howard"
                  src="/static/images/avatar/2.jpg"
                  sx={{
                    width: 24,
                    height: 24,
                  }}
                />
                <Avatar
                  alt="Cindy Baker"
                  src="/static/images/avatar/3.jpg"
                  sx={{
                    width: 24,
                    height: 24,
                  }}
                />
                <Typography variant="caption" color="textSecondary">
                  +5
                </Typography>
              </AvatarGroup>
            </Stack>
          </Stack>
          <Image
            src={image}
            alt="Event"
            width={200}
            height={100}
            style={{
              borderRadius: 4,
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
}
