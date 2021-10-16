import { Divider } from '@mui/material'
import React, { ReactElement } from 'react'
import UseAccountFormik, { UseAccountProps } from '../UseAccountFormik'

interface Props {
  handleClose: any
}

function AccountModal({ handleClose }: Props) {
  return (
    <div>
      <div style={{ top: 10, left: 10, position: 'absolute' }}>Create New Account</div>
      <Divider style={{ marginTop: -20 }} />
      <UseAccountFormik handleClose={handleClose} />
    </div>
  )
}

export default AccountModal
