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
export default function QuotesTable() {
  const [qty, setQty] = React.useState(3)
  const s = useQuotesHook();
  console.log("sss ---> ", s.accountPriceData)
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 750 }} aria-label="simple table">
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
          {s?.accountPriceData[0]?.productWithPrice?.map((row: any) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" align='left'>
                {row.catalog}
              </TableCell>
              <TableCell align="left">{row.name}</TableCell>
              <TableCell align="right">
                <CustomInput name='qty' type='number' value={qty} placeholder='0' />
              </TableCell>
              <TableCell align="right">{row.proposedPrice}</TableCell>
              <TableCell align="right">
                <CustomInput name='qty' type='number' value={qty * row.proposedPrice} placeholder={''} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}