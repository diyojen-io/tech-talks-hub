import Logo from '@/assets/logos/diyojen.png';
import Iconify from '@/components/Iconify';
import Image from 'next/image';
import './index.scss';
import Button from '../Button/Button';
import { Container, Stack, TextField, Typography } from '@mui/material';
import { GREY, PRIMARY } from '@/theme/palette';
import { contactUsData } from '@/helpers/constants';

export default function Footer() {
  return (
    <Stack bgcolor={'black'} direction={'column'}>
      <Container>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          gap={2}
          py={{ xs: 2, md: 4 }}
          px={{ xs: 2, md: 0 }}
          justifyContent={'space-between'}
          alignItems={{ xs: 'center' }}
        >
          <Stack
            direction={'column'}
            maxWidth={{ xs: 'unset', md: '300px' }}
            width={'100%'}
            gap={1}
          >
            <Typography color={GREY[0]} variant="h5">
              Newsletter
            </Typography>
            <TextField
              sx={{
                background: GREY[0],
              }}
              type="text"
              placeholder="Type your email address"
            ></TextField>
            <Button>Subscribe</Button>
          </Stack>

          <Stack width={{ xs: '100%', md: 'fit-content' }} gap={1}>
            <Typography color={GREY[0]} variant="h5">
              Contact us
            </Typography>
            {contactUsData.map((item, index) => {
              return (
                <Stack direction={'row'} gap={1} key={index}>
                  <Iconify icon={item.icon} />
                  <Typography
                    color={GREY['400']}
                    variant="body2"
                    component={'a'}
                    href={item.href}
                  >
                    {item.title}
                  </Typography>
                </Stack>
              );
            })}
          </Stack>
        </Stack>
      </Container>
      <Stack
        justifyContent={'center'}
        alignItems={'center'}
        gap={2}
        padding={'16px 20%'}
        borderTop={`1px solid ${PRIMARY.main}`}
      >
        <Stack direction={'row'} alignItems={'center'}>
          <Image src={Logo} alt="Diyojen io" width={24} height={24} />
          <Typography
            sx={{
              textDecoration: 'none',
              whiteSpace: 'nowrap',
            }}
            color={GREY[0]}
            component={'a'}
            typography={{
              xs: 'caption',
              md: 'body2',
            }}
            href="https://github.com/diyojen-io"
            target="_blank"
            rel="noreferrer"
          >
            2024 © Diyojen . All rights reserved.
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
}
