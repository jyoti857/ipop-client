import { Paper } from '@mui/material'
import React, { useState } from 'react'
import CustomInput from '../../../../../components/input/CustomInput'
import useInputForm from '../../../../../utils/useInputForm'

type Props = {
  serialNumber: string;
  quantity: string;
  quantityPlaceholder: string;
  reasonPlaceholder: string;
}

function ReturnInputs({ quantity, serialNumber, quantityPlaceholder, reasonPlaceholder }: Props) {
  const [inputForm, handleInputChangeForm] = useInputForm({ quantity, serialNumber, reason: "" });
  return (
    <Paper elevation={3} style={{ display: 'flex', justifyContent: 'space-between', margin: 10, padding: 20 }}>
      <div style={{ width: '28%' }}>
        <CustomInput name='serialNumber' placeholder={'Serial Number'} type='number' value={inputForm.serialNumber}
          handleChange={handleInputChangeForm}
          label='Serial Number'
        />
      </div>
      <div style={{ width: '28%' }}>
        <CustomInput name='quantity' placeholder={quantityPlaceholder} type='number' value={inputForm.quantity} label={quantityPlaceholder}
          handleChange={handleInputChangeForm}
        />
      </div>
      <div style={{ width: '40%' }}>
        <CustomInput name='reason' placeholder={reasonPlaceholder} type='text' value={inputForm.reason} label={reasonPlaceholder}
          handleChange={handleInputChangeForm}
        />
      </div>

    </Paper>
  )
}

export default ReturnInputs