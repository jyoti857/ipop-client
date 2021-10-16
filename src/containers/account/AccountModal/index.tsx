import React, { ReactElement } from 'react'
import UseAccountFormik, { UseAccountProps } from '../../../components/input/useCustomFormik'
import CustomModal from '../../../components/modal'

interface Props {
  k: UseAccountProps
}

function AccountModal(): ReactElement {
  return (
    <div>
      <div style={{ top: 10, left: 10, position: 'absolute' }}>Create New Account</div>
      <UseAccountFormik />
    </div>
  )
}

export default AccountModal
