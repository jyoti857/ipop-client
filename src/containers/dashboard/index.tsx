import { Paper, Typography } from '@mui/material'
import React, { ReactElement } from 'react'
import { useHistory } from 'react-router-dom'
import ReactVirtualizedTable from './dashboardTable'
import DashboardTable from './dashboardTable'
import { createData, } from './dashboardTableData'
import { useStyles } from './styles'
import { Data, Sample } from './types'
import useDashboardHook from './useDashboardHook'
interface Props {

}

function Dashboard({ }: Props): ReactElement {
  const history = useHistory()
  const { isLoading, dataArr } = useDashboardHook()
  const rows: Data[] = [];
  const sample: Sample[] = dataArr && dataArr.length > 0 ? dataArr.map(({ title, accountName, accountPriceType }) => ([
    title,
    accountPriceType,
    accountName,
  ])) : []
  for (let i = 0; i < dataArr?.length; i += 1) {
    const randomSelection = sample[i];
    rows.push(createData(i, ...randomSelection));
  }
  console.log("data Arr *** rows -->", dataArr, isLoading, sample, rows)

  const columns = ["Title", "Account", "Type"].map(label => ({
    width: 800,
    label,
    dataKey: label === 'Account' ? 'accountName' : label === "Type" ? 'accountPriceType' : label.toLowerCase()
  }))

  const navigateToAccount = (accountId: string) => {
    console.log("account id ()-->", accountId, rows[0])
    return history.push(`/app-account/61bcd5eff07ac5f4f5d882ea/individual-account/${accountId}`)
  }
  return (
    <Paper style={{ height: 400, width: '100%' }}>
      <div style={{ margin: 10 }}>
        <Typography>Pending Quotes</Typography>
      </div>
      <DashboardTable
        rowCount={rows.length}
        rowGetter={({ index }) => rows[index]}
        columns={columns}
        navigateToAccount={() => navigateToAccount(rows[1].accountName!)}
      />
    </Paper>
  )
}

export default Dashboard
