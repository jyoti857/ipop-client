import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#DACCE1',//theme.palette.common.black,
    color: theme.palette.primary,
    fontSize: 10,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 10,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(
  name: string,
  calories: string,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', "iovera° System Handpiece and Docking Station", 6.0, 24, 4.0),
  createData('Ice cream sandwich', "iovera° Smart Tip 309, 5-pack (3x8.5-mm needles per Smart Tip)", 9.0, 37, 4.3),
  createData('Eclair', "iovera° Smart Tip 190, 5-pack (1x90-mm needle per Smart Tip)", 16.0, 24, 6.0),
  createData('Cupcake', "iovera° Smart Tip 190 with Nerve Stim, 5-pack (1x90-mm needle per Smart Tip)", 3.7, 67, 4.3),
  createData('Gingerbread', "iovera° Cartridges, 10-pack", 16.0, 49, 3.9),
];
interface Props { }
function AccountPriceTable({ }: Props): React.ReactElement {
  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Catalog No.</StyledTableCell>
              <StyledTableCell align="left">Product</StyledTableCell>
              <StyledTableCell align="left">Actual Price</StyledTableCell>
              <StyledTableCell align="left">Proposed Price</StyledTableCell>
              <StyledTableCell align="center">Discount %</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="left">{row.calories}</StyledTableCell>
                <StyledTableCell align="left">{row.fat}</StyledTableCell>
                <StyledTableCell align="left">{row.carbs}</StyledTableCell>
                <StyledTableCell align="center">{row.protein}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default AccountPriceTable
