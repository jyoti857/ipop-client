import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import clsx from 'clsx'
import React, { ReactElement, useEffect } from 'react'
import { FaFileInvoiceDollar } from 'react-icons/fa';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import CustomInput from '../../../../components/input/CustomInput';
import { ReducersType } from '../../../../reducers/rootReducers';
import { getFinanceDetailByAccountId } from '../../actions';
import ChangeHistoryTable from './change-history-table';
import { useStyles } from './styles'

interface Props {

}
function createData(name: string, value: number | string) {
  return { name, value };
}
function CreaditInformation({ }: Props): ReactElement {
  const classes = useStyles()
  const { accountId } = useParams<{ accountId: string }>()
  const dispatch = useDispatch();
  const financeDetails = useSelector(({ accountReducers }: ReducersType) => accountReducers.financeDetails, shallowEqual)
  const { paydex, delinquencyScore, failureScore, bankruptcyFound, dnbRating, creditLimit, maxCreditRecommendation, customScore, financeDetailHistories, message } = financeDetails
  console.log("finance details ", financeDetails)
  const rows = [
    createData("Paydex", paydex),
    createData("Delinquency Score", delinquencyScore),
    createData("Failure Score", failureScore),
    createData("Bankruptcy Found", bankruptcyFound),
    createData("D&B Rating", dnbRating)
  ];
  useEffect(() => {
    console.log("finance details *", accountId)
    dispatch(getFinanceDetailByAccountId({ accountId }))
  }, [accountId])

  // message ?
  return <Paper className={classes.root}>
    {
      message ? <div>
        <div
          className={classes.fileIcon}
        >
          <FaFileInvoiceDollar />
        </div>
        <div className={classes.centerLine}>No price list found for this account!</div>
      </div> :
        (
          <div>
      <div>
        <Paper className={clsx(classes.paper, classes.flex)}>
          <div>
            <Paper className={classes.nestedPaper}>
              {/* <div style={{ display: 'flex' }}> */}
                    <div>Credit Limit</div>
                    <div>{creditLimit}</div>
              {/* </div> */}
            </Paper>
            <Paper className={classes.nestedPaper}>
              <div>D&B Maximum Credit Recommendation</div>
                    <div>${maxCreditRecommendation}</div>
            </Paper>
            <Paper className={classes.nestedPaper}>
              <div>Custom Scores</div>
                    <div>{customScore}</div>
            </Paper>
          </div>
          <Paper className={classes.paperField}>
            <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="caption table">
                <TableHead>
                  <TableRow>
                    <TableCell>KDE Name</TableCell>
                    <TableCell align="right">Current Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Paper>
      </div>
            <ChangeHistoryTable histories={financeDetailHistories || []} />
          </div>
        )}
  </Paper>
}

export default CreaditInformation
