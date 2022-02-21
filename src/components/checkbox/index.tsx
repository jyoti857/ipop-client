import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';

type Props = { checked: boolean, handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void }
export default function ControlledCheckbox({ checked, handleChange }: Props) {

  console.log("checked **", checked)

  return (
    <Checkbox
      checked={checked}
      onChange={handleChange}
      inputProps={{ 'aria-label': 'controlled' }}
    />
  );
}