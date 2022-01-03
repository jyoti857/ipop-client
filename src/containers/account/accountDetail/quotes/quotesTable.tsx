import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import useQuotesHook from './useQuotesHook';
import CustomInput from '../../../../components/input/CustomInput';
import { AnyAction } from 'redux';

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
      <Table sx={{ minWidth: 750 }} size={!editable ? 'small' : 'medium'} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Catalog No.</TableCell> 
            <TableCell align="left">Product</TableCell>
            <TableCell align="center">Qty</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="center">Qty * Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {productWithPrice?.map((row: any, idx: number) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" align='left'>
                {row.catalog}
              </TableCell>
              <TableCell align="left">{row.name}</TableCell>
              <TableCell align="right">
                {
                  !editable ? qtySet[idx] : 
                <CustomInput
                      name='qty'
                      type='number'
                      handleChange={(e: React.ChangeEvent<HTMLInputElement>) => handleQuoteQuantity(e, idx)}
                      value={qtySet[idx] || 0}
                      placeholder='0' />
                }
              </TableCell>
              <TableCell align="center">{row.proposedPrice}</TableCell>
              {/* <TableCell align="right">
                <CustomInput
                  name='qty_mul_product'
                  type='number'
                  value={(qtySet[idx] || 0) * row.proposedPrice} placeholder={''} />
              </TableCell> */}
              <TableCell align="center">{(qtySet[idx] || 0) * row.proposedPrice}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}