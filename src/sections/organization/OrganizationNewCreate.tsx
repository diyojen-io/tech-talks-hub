'use client';

import { Button } from '@/components';
import { FormProvider, RHFTextField } from '@/components/hook-form';
import useAuth from '@/context/AuthContext';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  InputLabel,
  MenuItem,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

// Constants
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

interface Values {
  name: string;
  location: string;
  website?: string;
  organizationType: string;
  visibility: string;
  description?: string;
}

export default function OrganizationNewCreate() {
  const { create } = useAuth();

  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const NewOrganizationSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    location: Yup.string().required('Required'),
    website: Yup.string(),
    organizationType: Yup.string().required('Required'),
    visibility: Yup.string().required('Required'),
    description: Yup.string(),
  });

  const defaultValues: Values = {
    name: '',
    location: '',
    website: '',
    organizationType: '',
    visibility: '',
    description: '',
  };

  const methods = useForm({
    resolver: yupResolver(NewOrganizationSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (values: Values) => {
    try {
      await create('organizations', values);
      reset(defaultValues);
      enqueueSnackbar('Organization created', { variant: 'success' });
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
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
              <InputLabel required>Organization Name</InputLabel>
              <RHFTextField name="name" />
            </Grid>
            <Grid item xs={6}>
              <InputLabel required>Location</InputLabel>
              <RHFTextField name="location" select>
                {COUNTRIES.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </RHFTextField>
            </Grid>

            <Grid item xs={6}>
              <InputLabel>Website</InputLabel>
              <RHFTextField name="website" />
            </Grid>
            <Grid item xs={6}>
              <InputLabel required>Type of Organization</InputLabel>
              <RHFTextField name="organizationType" select>
                {ORGANIZATION_TYPES.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </RHFTextField>
            </Grid>
            <Grid item xs={6}>
              <InputLabel required>Visibility</InputLabel>
              <RHFTextField name="visibility" select>
                {VISIBILITIES.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </RHFTextField>
            </Grid>
            <Grid item xs={12}>
              <InputLabel>Description</InputLabel>
              <RHFTextField name="description" multiline rows={2} />
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="flex-end">
                <Button
                  variant="primary_outlined"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Create
                </Button>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </FormProvider>
  );
}
