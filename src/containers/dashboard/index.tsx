import { Paper, Typography, Divider } from '@mui/material'
import React, { ReactElement } from 'react'
import { useHistory } from 'react-router-dom'
import CustomizedTables from '../../components/table'
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
  const sample: Sample[] = dataArr && dataArr.length > 0 ? dataArr.map(({ title, accountName, accountPriceType, accountId }) => ([
    title,
    accountPriceType,
    accountName,
    accountId
  ])) : []
  for (let i = 0; i < dataArr?.length; i += 1) {
    const randomSelection = sample[i];
    rows.push(createData(...randomSelection));
  }

  const columns = ["Title", "Account", "Type"].map(label => ({
    width: 800,
    label,
    dataKey: label === 'Account' ? 'accountName' : label === "Type" ? 'accountPriceType' : label.toLowerCase()
  }))

  const navigateToAccount = (accountId: string) => {
    console.log("account id ()-->", accountId, rows)
    return history.push(`/app-account/6200df9488adbf1def1c9bad/individual-account/${accountId}`)
  }
  return (
    <Paper style={{ height: 400, width: '100%', margin: 8 }} elevation={3}>
      <div style={{ margin: 10 }}>
        <Typography variant='h4'>Pending Quotes</Typography>
      </div>
      <Divider />
      {/* <DashboardTable
        rowCount={rows.length}
        rowGetter={({ index }) => rows[index]}
        columns={columns}
        // navigateToAccount={() => navigateToAccount(rows[1].accountName!)}
        navigateToAccount={() => navigateToAccount("30-10321-30210-")}
      /> */}
      <CustomizedTables headers={["Title", "Account", "Type", "AccountId"]} rows={rows} isFooter={false} />
    </Paper>
  )
}

export default Dashboard
