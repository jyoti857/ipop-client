import { Paper, Tab, Tabs } from '@mui/material'
import { Box } from '@mui/system'
import React, { ReactElement, useState } from 'react'
import { useStyles } from './styles'

type CustomTabType = {
  label: string;
  idx: number;
}
interface Props {
  tabs: CustomTabType[];
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

function CustomTabs({ tabs, value, handleChange, tab }: Props): ReactElement {
  const classes = useStyles();

  return (
    <Paper style={{ boxShadow: '0px 48px 100px 0px #110c2e', margin: 10 }}>
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
    </Paper>
  )
}

export default CustomTabs
