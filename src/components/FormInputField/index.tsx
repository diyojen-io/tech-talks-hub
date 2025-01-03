import { Grid, InputLabel, InputAdornment } from '@mui/material';
import { RHFTextField } from '@/components/hook-form';

interface FormInputFieldProps {
  name: string;
  label: string;
  icon: JSX.Element;
  isSocial?: boolean; 
}

const FormInputField = ({ name, label, icon, isSocial }: FormInputFieldProps) => {
  return (
    <Grid item xs={12} md={isSocial ? 12 : 6}> 
      <InputLabel>{label}</InputLabel>
      <RHFTextField
        name={name}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              {icon}
            </InputAdornment>
          ),
        }}
      />
    </Grid>
  );
};

export default FormInputField;
