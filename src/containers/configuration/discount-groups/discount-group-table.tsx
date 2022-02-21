import React, { ReactElement, useState } from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Divider, TableFooter, TablePagination } from '@mui/material';
import CustomInput from '../../../components/input/CustomInput';
import { useQuery } from 'react-query';
import { getAllDiscountPrices } from '../../../utils/baseUrl';
import Loading from '../../../components/loading';
import DGAccordion from '../../../components/accordion/dg_accordion';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#942BA8',
    color: theme.palette.common.white,
    // height: 10
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
  setHandleModalOpen: () => void;
  setEditDiscountPriceModal: any;
}

function DiscountGroupTable({ setHandleModalOpen, setEditDiscountPriceModal }: Props): ReactElement {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(2);
  const [search, setSearch] = useState('');

  const { data, isLoading } = useQuery('getDiscountPrices', getAllDiscountPrices)

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
    <Paper elevation={9} >
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead >
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
        </Table>
      </TableContainer>
      <div>
        {isLoading ? <Loading /> : <div>
            {data.map((row: any, id: number) => (
              // <DiscountGroupsAccordion row={row} key={id} id={id} />
              <DGAccordion panelProps='s' key={id} row={row} setEditDiscountPriceModal={setEditDiscountPriceModal} />
            ))}
        </div>
        }
      </div>
    </Paper>
  )
}

export default DiscountGroupTable
