import React, { ReactElement, useState } from 'react'
import CustomTabs from '../../components/tab'
import { useStyles } from './styles'
import SwitchTabs from './switchTabs'
import Users from './Users'

interface Props {

}
const tabs = [
  { label: "Users", idx: 0 },
  { label: "Products", idx: 1 },
  { label: "Promotional Codes", idx: 2 },
  { label: "Discount Groups", idx: 3 },
  { label: "Communication", idx: 4 },
]
function Configuration({ }: Props): ReactElement {
  const [tabName, setTabName] = useState('Products');
  const [value, setValue] = useState(1)
  const classes = useStyles()
  const handleChange = (e: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
    setTabName(tabs.find(c => c.idx === newValue)?.label!)
  }
  return (
    <div>
      <CustomTabs tabs={tabs} tab={tabName} value={value} handleChange={handleChange} />
      <div style={{ marginTop: 10 }} />
      <SwitchTabs cTabName={tabName} className={classes.root} />
    </div>
  )
}

export default Configuration
