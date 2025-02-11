import { TextField } from '@mui/material';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import PropTypes from 'prop-types';
import { Controller, useFormContext } from 'react-hook-form';

RHFDatePicker.propTypes = {
  name: PropTypes.string.isRequired,
};

export default function RHFDatePicker({ name, ...other }) {
  const { control } = useFormContext();

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <DatePicker
            {...field}
            value={field.value || null}
            sx={{ width: '100%' }}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                error={!!error}
                helperText={error?.message}
                {...other}
              />
            )}
          />
        )}
      />
    </LocalizationProvider>
  );
}

RHFTimePicker.propTypes = {
  name: PropTypes.string.isRequired,
};

export function RHFTimePicker({ name, ...other }) {
  const { control } = useFormContext();

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <TimePicker
            {...field}
            value={field.value || null}
            sx={{ width: '100%' }}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                error={!!error}
                helperText={error?.message}
                {...other}
              />
            )}
          />
        )}
      />
    </LocalizationProvider>
  );
}
