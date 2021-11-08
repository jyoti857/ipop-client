import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useQuery } from 'react-query';
import { getAllProducts } from '../../../../utils/baseUrl';
import CustomInput from '../../../../components/input/CustomInput';
import { useState } from 'react';

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

interface Props { }
function AccountPriceTable({ }: Props): React.ReactElement {
  const { data, isLoading } = useQuery('getProducts', getAllProducts, { enabled: Boolean(true) });
  const prices = data?.map((d: any) => d.price)
  const [proposedPrice, setProposedPrice] = useState(data)
  const [proposedPriceFromData, setProposedPriceFromData] = useState(data?.map((d: any) => d.price))
  // console.log("proposed price from data ---> ", proposedPriceFromData)
  const handleProposedData = (e: any, id: number) => {
    const name = e.target.getAttribute('name')
    // const value = e.target.value;
    const sd = [...proposedPriceFromData]
    if (e.target.value > data?.map((d: any) => d.price)[id]) {
      console.log("from data ***", proposedPriceFromData[id])
      setProposedPriceFromData(proposedPriceFromData)
    } else {
      sd[id] = e.target.value;
      setProposedPriceFromData(sd)
    }
  }
  // this handlec change is going to be ignored for a while
  const handleChange = (e: any, id: string) => {
    e.preventDefault();
    const dataCopy = [...data]
    const dIndex = dataCopy.findIndex(dataCopy => dataCopy._id === id)
    const s = { ...dataCopy[dIndex] }
    const name = e.target.getAttribute('name')
    const value = e.target.value;
    s[name] = value
    dataCopy.splice(dIndex, 1, s)
    setProposedPrice(dataCopy)
  }
  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 780 }} aria-label="customized table">
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
            {proposedPrice?.map((row: any, idx: number) => (
              <StyledTableRow key={row.catalog}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="left">{row.name}</StyledTableCell>
                <StyledTableCell align="left">{row.price}</StyledTableCell>
                <StyledTableCell align="left">
                  <CustomInput
                    value={proposedPriceFromData[idx]}
                    placeholder=''
                    type='number'
                    name='price'
                    handleChange={(e: any) => handleProposedData(e, idx)}
                  />
                </StyledTableCell>
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
