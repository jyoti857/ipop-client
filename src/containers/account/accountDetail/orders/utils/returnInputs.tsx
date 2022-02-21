import { Paper } from '@mui/material'
import React from 'react'
import CustomInput from '../../../../../components/input/CustomInput'

type Props = {
  serialNumber: string;
  quantity: string;

}

function ReturnInputs({ serialNumber, quantity }: Props) {
  return (
    <Paper elevation={3} style={{ display: 'flex', justifyContent: 'space-between', margin: 10, padding: 20 }}>
      <div style={{ width: '28%' }}>
        <CustomInput name='serialNumber' placeholder={'Serial Number'} type='text' value={serialNumber}
          label='Serial Number'
        />
      </div>
      <div style={{ width: '28%' }}>
        <CustomInput name='quantity' placeholder={'Quantity'} type='text' value={quantity} label='Quantity' />
      </div>
      <div style={{ width: '40%' }}>
        <CustomInput name='reason' placeholder={'Serial Number'} type='text' value={""} label="Reason" />
      </div>

    </Paper>
  )
}

export default ReturnInputs