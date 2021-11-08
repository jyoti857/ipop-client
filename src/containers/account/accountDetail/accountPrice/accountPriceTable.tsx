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
  const { data } = useQuery('getProducts', getAllProducts, { enabled: Boolean(true) });
  const [proposedPrice] = useState(data)
  const [proposedPriceFromData, setProposedPriceFromData] = useState(data?.map((d: any) => d.price))
  const [discountPrice, setDiscountPrice] = useState(data?.map((d: any, i: number) => (data[i].price - proposedPriceFromData[i]) * 0.01))
  const [discountPriceUpdateFlag, setDiscountPriceUpdateFlag] = useState(false)
  const handleProposedData = (e: any, id: number) => {
    const sd = [...proposedPriceFromData]
    if (e.target.value > data?.map((d: any) => d.price)[id]) {
      console.log("from data ***", proposedPriceFromData[id])
      setProposedPriceFromData(proposedPriceFromData)
    } else {
      sd[id] = e.target.value;
      setProposedPriceFromData(sd)
    }
    setDiscountPriceUpdateFlag(!discountPriceUpdateFlag)
    console.log("from data ***, proposed", proposedPriceFromData[id])
    // setDiscountPrice(dis)
  }
  React.useEffect(() => { calculateDiscountPrice() }, [discountPriceUpdateFlag])
  const calculateDiscountPrice = () => {
    const dis = data?.map((d: any, i: number) => (((d.price - proposedPriceFromData[i]) / d.price) * 100).toFixed(2))
    setDiscountPrice(dis)
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
                <StyledTableCell align="center">{discountPrice[idx]}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default AccountPriceTable
