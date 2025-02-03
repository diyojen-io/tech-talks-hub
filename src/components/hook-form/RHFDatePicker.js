import PropTypes from 'prop-types';
import { useFormContext, Controller } from 'react-hook-form';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { TextField } from '@mui/material';

RHFDatePicker.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  sx: PropTypes.object,
  InputProps: PropTypes.object,
};

export function RHFDatePicker({ name, label, sx }) {
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
            label={label}
            disableOpenPicker
            sx={{ width: '100%', ...sx }}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                error={!!error}
                helperText={error?.message}
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
  label: PropTypes.string,
  sx: PropTypes.object,
  InputProps: PropTypes.object,
};

export function RHFTimePicker({ name, label, sx }) {
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
            label={label}
            sx={{ width: '100%', ...sx }}
            disableOpenPicker
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
        )}
      />
    </LocalizationProvider>
  );
}
