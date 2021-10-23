import { Tab, Tabs } from '@mui/material'
import { Box } from '@mui/system'
import React, { ReactElement, useState } from 'react'
import { useStyles } from './styles'

interface Props {
  // accountInformation: string;
  // creditInformation: string;
  // supportingDocuments: string;
  // purchaser: string;
  // accountPrice: string;
  // quotes: string;
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

function AccountTabs({ }: Props): ReactElement {
  const classes = useStyles();
  const [value, setValue] = useState(0)
  const handleChange = (e: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }
  return (
    <Box>
      <Tabs className={classes.root} value={value} onChange={handleChange} aria-label="basic tabs example">
        <Tab style={{ textDecoration: 'none' }} label="Account Information" {...a11yProps(0)} />
        <Tab label="Supporting Documents" {...a11yProps(1)} />
        <Tab label="Purchaser" {...a11yProps(2)} />
      </Tabs>
    </Box>
  )
}

export default AccountTabs
