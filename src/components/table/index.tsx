import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, TableFooter, TablePagination } from '@mui/material';
import TablePaginationsActions from './tablePaginationsActions';
import CustomInput from '../input/CustomInput';
import Check from '../../assets/svg/tick-svg.svg'
import Close from '../../assets/svg/close-svg.svg'


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
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
  margin: 'dense'
}));



type CustomizedTableProps = {
  headers: any;
  rows: any
}
export default function CustomizedTables({ headers, rows }: CustomizedTableProps) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(2);
  const [search, setSearch] = useState('');
  const handleChangePage = (
    e: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage)
  }
  const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0)
  }
  return (
    <TableContainer component={Paper} >
      <Table sx={{ minWidth: 200, lineHeight: .12, margin: 'dense' }} aria-label="dense table">
        <TableHead>
          <TableRow>
            <div style={{ margin: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'transparent', width: '178%' }}>
              <div>Products</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', backgroundColor: 'transparent' }}>
                <CustomInput name='Search' type='text' value='search' placeholder='Search' />
                <Button
                  variant='contained'
                  color='primary'
                >Add +</Button>
                <Button
                  variant='outlined'
                  color='primary'
                >Sync</Button>
              </div>
            </div>
          </TableRow>
          <TableRow>
            {
              headers?.map((header: any, index: number) => {
                return <StyledTableCell >{header}</StyledTableCell>
                //align={index !== 1 ? 'right' : 'justify'}
              })
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row: any) => (
            <StyledTableRow key={row.username}>
              <StyledTableCell component="th" scope="row">
                {row.username}
              </StyledTableCell>
              <StyledTableCell align="left">{row.firstName}</StyledTableCell>
              <StyledTableCell align="left">{row.lastName}</StyledTableCell>
              <StyledTableCell align="left">{row.email}</StyledTableCell>
              <StyledTableCell align="left">M</StyledTableCell>
              <StyledTableCell align="left">{row.role}</StyledTableCell>
              <StyledTableCell align="left">{
                <img src={row.isAdmin ? Check : Close} alt='' />
              }
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationsActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}