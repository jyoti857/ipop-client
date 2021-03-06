import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import useQuotesHook from './useQuotesHook';
import CustomInput from '../../../../components/input/CustomInput';
import { AnyAction } from 'redux';
import { theme } from '../../../../theme/customTheme';
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

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
];

interface IQuotesTable {
  handleQuoteQuantity?: any;
  qtySet: any;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  productWithPrice: any;
  editable?: boolean;
}
export default function QuotesTable({ productWithPrice, handleChange, handleQuoteQuantity, qtySet, editable }: IQuotesTable) {
  const [quoteDetails, setQuoteDetails] = React.useState<any>(productWithPrice)
  console.log("sss ---> ", quoteDetails);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 750, width: '98%', margin: 'auto' }} size={!editable ? 'small' : 'medium'} aria-label="a table">
        <TableHead style={{ color: 'red' }}>
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
                {
                  !editable ? qtySet[idx] : 
                <CustomInput
                      name='qty'
                      type='number'
                      handleChange={(e: React.ChangeEvent<HTMLInputElement>) => handleQuoteQuantity(e, idx)}
                      value={qtySet[idx] || 0}
                      placeholder='0' />
                }
              </StyledTableCell>
              <StyledTableCell align="center">{row.proposedPrice}</StyledTableCell>
              {/* <StyledTableCell align="right">
                <CustomInput
                  name='qty_mul_product'
                  type='number'
                  value={(qtySet[idx] || 0) * row.proposedPrice} placeholder={''} />
              </StyledTableCell> */}
              <StyledTableCell align="center">{(qtySet[idx] || 0) * row.proposedPrice}</StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}