import React, { ReactElement } from 'react'
import CustomInput from '../../../components/input/CustomInput'

interface Props {
  handleChange: any;
  values: any;
  classes: any;
  setCardState?: any;
}

function SecondCard({ handleChange, values, classes, setCardState }: Props): ReactElement {
  return (
    <div>
      <div style={{ position: 'relative', width: '100%' }}>
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', margin: 10 }}>
          <CustomInput
            name='street1address'
            handleChange={handleChange}
            placeholder='Street 1 - Address *'
            type='text'
            value={values.street1address}
            style={{ width: '47%' }}
          />
          <CustomInput
            name='street2address'
            handleChange={handleChange}
            placeholder='Street 2 - Address'
            type='text'
            value={values.street2address}
            style={{ width: '47%' }}
          />
        </div>
        <div style={{ margin: 10 }}>
          <CustomInput
            name='street3address'
            handleChange={handleChange}
            placeholder='Street 3 - Address'
            type='text'
            value={values.street3address}
            style={{ width: '100%' }}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', margin: 10 }}>
          <CustomInput
            name='city'
            handleChange={handleChange}
            placeholder='City'
            type='text'
            value={values.city}
            style={{ width: '29%' }}
          />
          <CustomInput
            name='state'
            handleChange={handleChange}
            placeholder='State'
            type='text'
            value={values.state}
            style={{ width: '29%' }}
          />
          <CustomInput
            name='zip'
            handleChange={handleChange}
            placeholder='Zipcode'
            type='text'
            value={values.zip}
            style={{ width: '26%' }}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', margin: 10 }}>
          <CustomInput
            name='email'
            handleChange={handleChange}
            placeholder='Email'
            type='text'
            value={values.email}
            style={{ width: '47%' }}
          />
          <CustomInput
            name='phone'
            handleChange={handleChange}
            placeholder='Phone'
            type='text'
            value={values.phone}
            style={{ width: '47%' }}
          />
        </div>


      </div>
      <div style={{ position: 'absolute', bottom: 10, right: 10, display: 'flex' }}>
        <div
          className={classes.previousButton}
          onClick={() => setCardState('first')}
        >previous</div>
        <div
          className={classes.newAccountButton}
          onClick={() => setCardState('third')}
        >next</div>
      </div>
    </div>
  )
}

export default SecondCard;
