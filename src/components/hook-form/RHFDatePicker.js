import PropTypes from 'prop-types';
import { useFormContext, Controller } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { TextField } from '@mui/material';

RHFDatePicker.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  sx: PropTypes.object,
  InputProps: PropTypes.object,
};

export default function RHFDatePicker({ name, label, InputProps }) {
  const { control } = useFormContext();

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <DatePicker
            sx={{ width: '504px' }}
            {...field}
            value={field.value || null}
            label={label}
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
