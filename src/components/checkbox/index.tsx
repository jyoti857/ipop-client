import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';

type Props = {
  // checked: boolean;
  // handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  catalog: string;
}

export default function ControlledCheckbox({ catalog }: Props) {
  const [checked, setChecked] = React.useState(false);
  console.log("checked **", checked)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('checkbox ** =--->', event.target)
    setChecked(event.target.checked);
  };
  return (
    <Checkbox
      checked={checked}
      onChange={handleChange}
      inputProps={{ 'aria-label': 'controlled' }}
    />
  );
}