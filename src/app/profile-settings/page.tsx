'use client';
import ProfileBasicInformationForm from '@/sections/profile/ProfileBasicInformationForm';
import ProfilPasswordForm from '@/sections/profile/ProfilePasswordForm';
import { Container, Box, Tabs, Tab, CardHeader, Card } from '@mui/material';
import React from 'react';
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export default function Page() {
  return (
    <Container
      maxWidth="lg"
      sx={{
        paddingTop: 8,
        paddingBottom: 8,
      }}
    >
      <Card sx={{ boxShadow: 'none' }}>
        <CardHeader
          title="Profile Settings"
          sx={{
            '& .MuiCardHeader-title': {
              fontSize: '1.5rem',
            },
          }}
        ></CardHeader>
      </Card>
      <TabsProvider />
    </Container>
  );
}

function TabsProvider() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        width: '100%',
        bgcolor: 'grey.200',
        p: 4,
        borderRadius: 4,
        boxShadow: 1,
      }}
    >
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Basic Information" {...a11yProps(0)} />
          <Tab label="Change Password" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <ProfileBasicInformationForm />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <ProfilPasswordForm />
      </CustomTabPanel>
    </Box>
  );
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
