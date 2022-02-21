import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CustomInput from '../../../../components/input/CustomInput';
import { StyledTableCell } from '../accountPrice/accountPriceTable';

function createData(
  catalog: string,
  name: number,
  qty: number,
  proposedPrice: number,
  qty_p: number,
) {
  return { catalog, name, qty, proposedPrice, qty_p };
}


interface IQuoteOrderTableProps {
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  productWithPrice: any;
  editable?: boolean;
}
export default function QuoteOrderTable({ productWithPrice }: IQuoteOrderTableProps) {
  const [quoteDetails, setQuoteDetails] = React.useState<any>(productWithPrice)
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 750, width: '98%', margin: 'auto' }} size='small' aria-label="a table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Catalog No.</StyledTableCell>
            <StyledTableCell align="left">Product</StyledTableCell>
            <StyledTableCell align="right">Qty</StyledTableCell>
            <StyledTableCell align="center">Price</StyledTableCell>
            <StyledTableCell align="center">Qty * Price</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {productWithPrice?.map((row: any, idx: number) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <StyledTableCell component="th" scope="row" align='left'>
                {row.catalog}
              </StyledTableCell>
              <StyledTableCell align="left">{row.name}</StyledTableCell>
              <StyledTableCell align="right">
                {row.quantity}
              </StyledTableCell>
              <StyledTableCell align="center">{row.proposedPrice}</StyledTableCell>
              <StyledTableCell align="center">{row.quantity * row.proposedPrice}</StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}