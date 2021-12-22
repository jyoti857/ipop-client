import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import clsx from 'clsx'
import React, { ReactElement, useEffect } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ReducersType } from '../../../../reducers/rootReducers';
import { getFinanceDetailByAccountId } from '../../actions';
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
  console.log("finance details ", financeDetails)
  const rows = [
    createData("Paydex", financeDetails.paydex),
    createData("Delinquency Score", financeDetails.delinquencyScore),
    createData("Failure Score", financeDetails.failureScore),
    createData("Bankruptcy Found", financeDetails.bankruptcyFound),
    createData("D&B Rating", financeDetails.dnbRating)
  ];
  useEffect(() => {
    console.log("finance details *", accountId)
    dispatch(getFinanceDetailByAccountId({ accountId }))
  }, [accountId])
  return (
    <div>
      <div>
        <Paper className={clsx(classes.paper, classes.flex)}>
          <div>
            <Paper className={classes.nestedPaper}>
              {/* <div style={{ display: 'flex' }}> */}
              <div>Creadit Limit</div>
              <div>$1.00</div>
              {/* </div> */}
            </Paper>
            <Paper className={classes.nestedPaper}>
              <div>D&B Maximum Credit Recommendation</div>
              <div>$15000.00</div>
            </Paper>
            <Paper className={classes.nestedPaper}>
              <div>Custom Scores</div>
              <div>8.5</div>
            </Paper>
          </div>
          <Paper className={classes.paperField}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="caption table">
                <caption>A basic table example with a caption</caption>
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
    </div>
  )
}

export default CreaditInformation
