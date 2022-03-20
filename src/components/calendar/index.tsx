import * as React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { MobileDatePicker } from '@mui/lab';

interface CustomDatePickerProps {
  label: string;
  handleDateChange: any;
  value: string;
  name?: string;
}
const CustomDatePicker = ({ label, handleDateChange, value, name }: CustomDatePickerProps) => {

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      {/* <DatePicker
        label={label}
        value={value}
        onChange={handleDateChange}
        renderInput={(params) => <TextField {...params} />}
      /> */}
      <MobileDatePicker
        label={label}
        value={value}
        onChange={handleDateChange}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}

export default CustomDatePicker