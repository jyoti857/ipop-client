import { Paper, Typography } from '@mui/material'
import React, { ReactElement } from 'react'
import ReactVirtualizedTable from './dashboardTable'
import DashboardTable from './dashboardTable'
import { createData, } from './dashboardTableData'
import { useStyles } from './styles'
import { Data, Sample } from './types'
import useDashboardHook from './useDashboardHook'
interface Props {

}

function Dashboard({ }: Props): ReactElement {
  const { isLoading, dataArr } = useDashboardHook()
  const rows: Data[] = [];
  const sample: Sample[] = dataArr && dataArr.length > 0 ? dataArr.map(({ title, accountId, accountPriceType }) => ([
    title,
    accountId,
    accountPriceType
  ])) : []
  for (let i = 0; i < dataArr?.length; i += 1) {
    const randomSelection = sample[Math.floor(Math.random() * sample?.length)];
    rows.push(createData(i, ...randomSelection));
  }
  console.log("data Arr -->", dataArr, isLoading, sample)

  const columns = ["Title", "Account", "Type"].map(label => ({
    width: 200,
    label,
    dataKey: label === 'Account' ? 'accountId' : label === "Type" ? 'accountPriceType' : label.toLowerCase()
  }))
  return (
    <Paper style={{ height: 400, width: '100%' }}>
      <div style={{ margin: 10 }}>
        <Typography >Pending Quotes</Typography>
      </div>
      <DashboardTable
        rowCount={rows.length}
        rowGetter={({ index }) => rows[index]}
        columns={columns}
      />
    </Paper>
  )
}

export default Dashboard
