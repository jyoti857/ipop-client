import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Paper } from '@mui/material';
import { StyledTableCell } from '../../account/accountDetail/accountPrice/accountPriceTable';
type Props = {};

function EditDiscountGroupPrice({ }: Props) {
  return <div>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 780 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow style={{ height: 21 }}>
            <StyledTableCell>Catalog No.</StyledTableCell>
            <StyledTableCell align="left">Product</StyledTableCell>
            <StyledTableCell align="left">Actual Price</StyledTableCell>
            <StyledTableCell align="left">Proposed Price</StyledTableCell>
            <StyledTableCell align="center">Discount %</StyledTableCell>
          </TableRow>
        </TableHead>
      </Table>
    </TableContainer>
  </div>;
}

export default EditDiscountGroupPrice;
