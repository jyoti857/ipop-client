import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import clsx from 'clsx'
import React, { ReactElement } from 'react'
import { useStyles } from './styles'

interface Props {

}
function createData(name: string, value: number) {
  return { name, value };
}
function CreaditInformation({ }: Props): ReactElement {
  const classes = useStyles()
  const rows = [
    createData("Paydex", 80),
    createData("Delinquency Score", 23),
    createData("Failure Score", 23),
    createData("Bankruptcy Found", 23),
    createData("D&B Rating", 23)
  ];
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
