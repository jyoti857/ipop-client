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
          <div style={{ width: '48%' }}>
          <CustomInput
              label='Street 1'
            name='street1address'
            handleChange={handleChange}
            placeholder='Street 1 - Address *'
            type='text'
            value={values.street1address}
            // style={{ minWidth: '100%', backgroundColor: 'green' }}
            />
          </div>
          <div style={{ width: '48%' }}>
          <CustomInput
              label='Street 2'
            name='street2address'
            handleChange={handleChange}
            placeholder='Street 2 - Address'
            type='text'
            value={values.street2address}
            // style={{ minWidth: '80%', backgroundColor: 'red' }}
            />
          </div>
        </div>
        <div style={{ margin: 10 }}>
          <CustomInput
            label='Street 3'
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
            label='City'
            name='city'
            handleChange={handleChange}
            placeholder='City'
            type='text'
            value={values.city}
            // style={{ width: '29%' }}
          />
          <CustomInput
            label='State'
            name='state'
            handleChange={handleChange}
            placeholder='State'
            type='text'
            value={values.state}
            // style={{ width: '29%' }}
          />
          <div>
          <CustomInput
              label='Zipcode'
            name='zip'
            handleChange={handleChange}
            placeholder='Zipcode'
            type='text'
            value={values.zip}
            // style={{ width: '26%' }}
          />
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', margin: 10 }}>
          <div style={{ width: '48%' }}>
          <CustomInput
              label='Email'
            name='email'
            handleChange={handleChange}
            placeholder='Email'
            type='text'
            value={values.email}
            style={{ width: '47%' }}
          />
          </div>
          <div style={{ width: '48%' }}>
          <CustomInput
              label='Phone Number'
            name='phone'
            handleChange={handleChange}
            placeholder='Phone'
            type='text'
            value={values.phone}
            style={{ width: '47%' }}
          />
          </div>
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
