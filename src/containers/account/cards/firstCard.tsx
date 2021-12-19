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
      <div style={{ position: 'relative', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
        <CustomInput
          name='accountName'
          handleChange={handleChange}
          placeholder='account name'
          type='text'
          value={values.accountName}
        />
        <CustomInput
          name='ein'
          handleChange={handleChange}
          placeholder='EIN #'
          type='text'
          value={values.ein}
        />
        {/* <CustomInput
          name='subtype'
          handleChange={handleChange}
          placeholder='Subtype'
          type='text'
          value={values.subtype}
        /> */}
        <CustomDropdown data={dropdownData} value={values.subtype} handleChange={handleChange} name='subtype' />
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
