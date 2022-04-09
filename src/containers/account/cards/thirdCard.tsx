import { Divider, Paper } from '@mui/material'
import React, { ReactElement } from 'react'
import { theme } from '../../../theme/customTheme'

interface Props {
  accountName: string;
  ein: string;
  street1address: string;
  street2address: string;
  street3address: string;
  city: string;
  state: string;
  zip: string;
  email: string;
  phone: string;
  subtype: string;
  classes: any;
  setCardState?: any;
}

function ThirdCard({ accountName, ein, email, phone, street1address, street2address, street3address,
  city, state, zip, subtype, classes, setCardState }: Props): ReactElement {
  return (
    <div>
      <Paper style={{ width: 600, maxHeight: 500, margin: 'auto', padding: 20, marginTop: 12, fontSize: 18 }}>
        <div>
          <div style={{ fontWeight: 600, color: theme.color?.primary }}>{accountName}</div>
          <div style={{ fontWeight: 400, color: theme.color?.grey }}>EIN#: {ein}</div>
        </div>
        <Divider />
        <div style={{ display: 'flex', marginTop: 12, justifyContent: 'space-between', width: '70%' }}>
          <div style={{ fontWeight: 'bold', color: 'grey', width: '48%' }}>Email</div>
          <div style={{ width: '38%' }}>{email}</div>
        </div>
        <div style={{ display: 'flex', marginTop: 12, justifyContent: 'space-between', width: '70%', alignItems: 'flex-start' }}>
          <div style={{ fontWeight: 'bold', color: 'grey' }}>Phone</div>
          <div style={{ width: '38%' }}>{phone}</div>
        </div>
        <div style={{ display: 'flex', marginTop: 12, justifyContent: 'space-between', width: '70%' }}>
          <div style={{ fontWeight: 'bold', color: 'grey' }}>Subtype</div>
          <div style={{ width: '38%' }}>{subtype}</div>
        </div>
        <div style={{ display: 'flex', marginTop: 12, justifyContent: 'space-between', width: '70%' }}>
          <div style={{ fontWeight: 'bold', color: 'grey' }}>Street Address  1</div>
          <div style={{ width: '38%' }}>{street1address}</div>
        </div>
        <div style={{ display: 'flex', marginTop: 12, justifyContent: 'space-between', width: '70%' }}>
          <div style={{ fontWeight: 'bold', color: 'grey' }}>Street Address 2</div>
          <div style={{ width: '38%' }}>{street2address}</div>
        </div>
        <div style={{ display: 'flex', marginTop: 12, justifyContent: 'space-between', width: '70%' }}>
          <div style={{ fontWeight: 'bold', color: 'grey' }}>Street Address 3</div>
          <div style={{ width: '38%' }}>{street3address}</div>
        </div>
        <div style={{ display: 'flex', marginTop: 12, justifyContent: 'space-between', width: '70%' }}>
          <div style={{ fontWeight: 'bold', color: 'grey' }}>City</div>
          <div style={{ width: '38%' }}>{city}</div>
        </div>
        <div style={{ display: 'flex', marginTop: 12, justifyContent: 'space-between', width: '70%' }}>
          <div style={{ fontWeight: 'bold', color: 'grey' }}>State</div>
          <div style={{ width: '38%' }}>{state}</div>
        </div>
        <div style={{ display: 'flex', marginTop: 12, justifyContent: 'space-between', width: '70%' }}>
          <div style={{ fontWeight: 'bold', color: 'grey' }}>ZipCode</div>
          <div style={{ width: '38%' }}>{zip}</div>
        </div>
      </Paper >
      <div style={{ position: 'absolute', bottom: 10, right: 10, display: 'flex' }}>
        <div
          className={classes.previousButton}
          onClick={() => setCardState('second')}
        >previous</div>
        <button
          className={classes.newAccountButton}
          type='submit'
        >
          create
        </button>
      </div>
    </div>
  )
}

export default ThirdCard
