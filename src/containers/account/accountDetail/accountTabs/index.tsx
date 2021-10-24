import { Tab, Tabs } from '@mui/material'
import { Box } from '@mui/system'
import React, { ReactElement, useState } from 'react'
import { useStyles } from './styles'

type AccountTabType = {
  label: string;
  idx: number;
}
interface Props {
  tabs: AccountTabType[];
  value: number;
  handleChange: any;
  tab: string;
}

function a11yProps(index: string) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

function AccountTabs({ tabs, value, handleChange, tab }: Props): ReactElement {
  const classes = useStyles();

  return (
    <Box>
      <Tabs className={classes.root} value={value} onChange={handleChange}>
        {
          tabs.map((tab) => {
            return (
              <Tab label={tab.label} {...a11yProps(String(tab.idx))} />
            )
          })
        }
        {/* <Tab label="Supporting Documents" {...a11yProps(1)} />
        <Tab label="Purchaser" {...a11yProps(2)} /> */}
      </Tabs>
    </Box>
  )
}

export default AccountTabs
