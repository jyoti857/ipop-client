import { Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { ReactElement } from 'react'
import CustomInput from '../../../../components/input/CustomInput'
import { theme } from '../../../../theme/customTheme'

interface Props {

}
const s = [{ orderNumber: "320-323123", createdAt: '2021-2-2', updatedAt: "2021-2-3", placedBy: 'John', status: 'Active' }]
function Orders({ }: Props): ReactElement {
  return (
    <div>
      {/* <Container> */}
      <Paper style={{ margin: theme.size?.margin.secondary }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', margin: 12, gap: 12 }}>
          <CustomInput name='search' placeholder='Search order' type='text' value='Search' />
          <Button
            variant='contained'
          >Place an Order</Button>
          <Button
            variant='outlined'
            color='secondary'
          >Sync</Button>
        </div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Order Number</TableCell>
                <TableCell align="right">Created At</TableCell>
                <TableCell align="right">Updated At</TableCell>
                <TableCell align="right">Placed By</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                {s.map((a: any) => <>
                  <TableCell>{a.orderNumber}</TableCell>
                  <TableCell align="right">{a.createdAt}</TableCell>
                  <TableCell align="right">{a.updatedAt}</TableCell>
                  <TableCell align="right">{a.placedBy}</TableCell>
                  <TableCell align="right">{a.status}</TableCell>
                  <TableCell align="center">
                    <Button
                      color='primary'
                      variant='outlined'
                    >View</Button>
                  </TableCell>
                </>
                )}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      {/* </Container> */}
    </div>
  )
}

export default Orders
