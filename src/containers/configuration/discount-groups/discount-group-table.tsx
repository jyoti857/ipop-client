import React, { ReactElement, useState } from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Divider, TableFooter, TablePagination } from '@mui/material';
import TablePaginationsActions from '../../../components/table/tablePaginationsActions';
import CustomInput from '../../../components/input/CustomInput';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#942BA8',
    color: theme.palette.common.white,
    // height: 10
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
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
  code: string,
  createdBy: string,
  startDate: string,
  endDate: string,
  status: string,
  actions: any,
) {
  return { name, code, createdBy, startDate, endDate, status, actions };
}

const rows = [
  createData('Frozen yoghurt', 'code', 'createdBy', "start date", "end date", 'inactive', 'actions'),
];
const tableHeaders = [
  "Code", "Created By", "Start Date", "End Date", "Status", "Actions"
]

interface Props {

}

function DiscountGroupTable({ }: Props): ReactElement {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(2);
  const [search, setSearch] = useState('');
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

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
    <div style={{ width: '100%', position: 'relative' }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead >
            <TableRow style={{ width: '200%' }}>
              <div style={{ margin: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'transparent', minWidth: '219%' }}>
                <div style={{ fontWeight: 'bold' }}>Products</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '30%' }}>
                  <CustomInput name='Search' type='text' value='search' placeholder='Search' />
                  <div style={{ display: 'flex', gap: 3 }}>
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
              </div>
            </TableRow>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              {
                tableHeaders?.map((tableHeader: any) => {
                  return (
                    <StyledTableCell align="right">{tableHeader}</StyledTableCell>
                  )
                })
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="right">{row.code}</StyledTableCell>
                <StyledTableCell align="right">{row.createdBy}</StyledTableCell>
                <StyledTableCell align="right">{row.startDate}</StyledTableCell>
                <StyledTableCell align="right">{row.endDate}</StyledTableCell>
                <StyledTableCell align="right">{row.status}</StyledTableCell>
                <StyledTableCell align="right">{row.actions}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
          <TableFooter>
            <Divider style={{ marginTop: 50, padding: 10 }} />
            <div
              style={{ minWidth: 230, position: 'absolute', right: 10, bottom: 10 }}>
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
            </div>
          </TableFooter>
        </Table>
      </TableContainer>
    </div >
  )
}

export default DiscountGroupTable
