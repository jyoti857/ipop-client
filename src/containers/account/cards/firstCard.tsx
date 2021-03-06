import React, { ReactElement } from 'react'
import CustomDropdown from '../../../components/dropdown'
import CustomInput from '../../../components/input/CustomInput'

interface Props {
  handleChange: any;
  values: any;
  classes: any;
  setCardState?: any
}
const dropdownData = [
  { value: 'Hospital', desc: 'Hospital' },
  { value: 'AGS', desc: "Ambulatory Surgery System" },
  { value: 'clinic', desc: 'Clinic' },
  { value: 'DOD', desc: "Department of Defence" },
  { value: 'HOPD', desc: 'Hospital Department' },
]

function FirstCard({ handleChange, values, classes, setCardState }: Props): ReactElement {
  return (
    <div>
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', flexWrap: 'wrap', justifyContent: 'space-around' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <CustomInput
            label='Account Name'
            name='accountName'
            handleChange={handleChange}
            placeholder='account name'
            type='text'
            value={values.accountName}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
          <div style={{ width: '48%' }}>
            <CustomInput
              label='EIN Number'
              name='ein'
              handleChange={handleChange}
              placeholder='EIN #'
              type='text'
              value={values.ein}
            />
          </div>
          <div style={{ width: '48%' }}>
            <CustomDropdown label='Subtype' data={dropdownData} value={values.subtype} handleChange={handleChange} name='subtype' />
          </div>
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 10, right: 10, display: 'flex' }}>
        <div
          className={classes.newAccountButton}
          onClick={() => setCardState('second')}
        >next</div>
      </div>
    </div>
  )
}

export default FirstCard
