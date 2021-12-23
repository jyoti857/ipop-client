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
import DiscountGroupsAccordion from '../../../components/accordion/discount-group-accordions';
import { useQuery } from 'react-query';
import { getAllDiscountPrices } from '../../../utils/baseUrl';

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
  setHandleModalOpen: () => void
}

function DiscountGroupTable({ setHandleModalOpen }: Props): ReactElement {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(2);
  const [search, setSearch] = useState('');

  const { data, isLoading } = useQuery('getDiscountPrices', getAllDiscountPrices)
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
    <Paper elevation={9} style={{ maxWidth: '150%', position: 'relative', flexWrap: 'nowrap', display: 'flex' }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead >
            <TableRow style={{ width: '200%' }}>
              <div style={{ margin: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'transparent', minWidth: '203%' }}>
                <div style={{ fontWeight: 'bold' }}>Discount Groups</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '32%' }}>
                  <CustomInput name='Search' type='text' value='search' placeholder='Search' />
                  <div style={{ display: 'flex', gap: 3 }}>
                    <Button
                      variant='contained'
                      color='primary'
                      onClick={setHandleModalOpen}
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
          {isLoading ? <div>Loading,,,</div> : <TableBody>
            {data.map((row: any) => (
              <DiscountGroupsAccordion row={row} />
            ))}
          </TableBody>}
          <TableFooter style={{ position: 'relative', right: 0 }}>
            <div
            // style={{ marginTop: 60, position: 'absolute', right: 10, bottom: 10 }}
            >
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
    </Paper >
  )
}

export default DiscountGroupTable