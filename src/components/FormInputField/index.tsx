import { Grid, InputLabel, InputAdornment } from '@mui/material';
import { RHFTextField } from '@/components/hook-form';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useFormContext, Controller } from 'react-hook-form';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

interface FormInputFieldProps {
  name: string;
  label: string;
  icon: JSX.Element;
  isSocial?: boolean;
  isDatePicker?: boolean;
}

const FormInputField = ({
  name,
  label,
  icon,
  isSocial,
  isDatePicker,
}: FormInputFieldProps) => {
  const { control } = useFormContext();

  return (
    <Grid item xs={12} md={isSocial ? 12 : 6}>
      <InputLabel
        required={[
          'email',
          'displayName',
          'username',
          'birthDay',
          'location',
        ].includes(name)}
      >
        {label}
      </InputLabel>
      {isDatePicker ? (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
              <DatePicker
                sx={{ width: '504px' }}
                {...field}
                value={field.value || null}
                slots={{
                  textField: RHFTextField,
                  openPickerIcon: () => null,
                }}
                slotProps={{
                  textField: {
                    error: !!fieldState.error,
                    helperText: fieldState.error?.message,
                    InputProps: {
                      startAdornment: (
                        <InputAdornment position="start">{icon}</InputAdornment>
                      ),
                      endAdornment: true,
                    },
                  },
                }}
              />
            )}
          />
        </LocalizationProvider>
      ) : (
        <RHFTextField
          name={name}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">{icon}</InputAdornment>
            ),
          }}
        />
      )}
    </Grid>
  );
};

export default FormInputField;
