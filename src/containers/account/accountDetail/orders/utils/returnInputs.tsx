import { Paper } from '@mui/material'
import React, { useState } from 'react'
import CustomInput from '../../../../../components/input/CustomInput'

type Props = {
  serialNumber: string;
  quantity: string;

}

function ReturnInputs({ serialNumber, quantity }: Props) {
  const [qty, setQty] = useState(quantity)
  const handleQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQty(e.target.value)
  }
  return (
    <Paper elevation={3} style={{ display: 'flex', justifyContent: 'space-between', margin: 10, padding: 20 }}>
      <div style={{ width: '28%' }}>
        <CustomInput name='serialNumber' placeholder={'Serial Number'} type='text' value={serialNumber}
          label='Serial Number'
        />
      </div>
      <div style={{ width: '28%' }}>
        <CustomInput name='quantity' placeholder={'Quantity'} type='text' value={qty} label='Quantity'
          handleChange={handleQuantity}
        />
      </div>
      <div style={{ width: '40%' }}>
        <CustomInput name='reason' placeholder={'Serial Number'} type='text' value={""} label="Reason" />
      </div>

    </Paper>
  )
}

export default ReturnInputs