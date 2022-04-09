import { Button } from '@mui/material'
import React from 'react'
import CustomInput from '../input/CustomInput'
type Props = {
  name: string;
  placeholder: string;
  type: string;
  value: any;
  primaryButton?: string;
  secondaryButton?: string;
  onClick: any;
}

function CustomSearch({ name, placeholder, type, value, primaryButton, secondaryButton, onClick }: Props) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
      <div style={{ alignItems: 'center', display: 'flex' }}>
        <CustomInput name={name} placeholder={placeholder} type={type} value={value} />
      </div>
      <div style={{ width: '40%', alignItems: 'center', display: 'flex', gap: 10, justifyContent: 'flex-end', marginRight: 4 }}>
        <div>
          <Button
            variant='contained'
            color='primary'
            onClick={onClick}
          >{primaryButton}</Button>
        </div>
        <div>
          <Button
            variant='outlined'
            color='secondary'
          >{secondaryButton}</Button>
        </div>
      </div>
    </div>
  )
}

export default CustomSearch