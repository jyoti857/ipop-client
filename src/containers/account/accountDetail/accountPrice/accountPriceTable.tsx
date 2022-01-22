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
import { AccountPriceHook } from './accountPriceHook';

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#DACCE1',//theme.palette.common.black,
    color: theme.palette.primary,
    fontSize: 10,
    innerHeight: 3,
    height: 2,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 10,
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  height: 5,
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

interface Props {
  proposedPrice: any;
  handleProposedData?: any;
  proposedPriceFromData?: any;
  proposedPriceType?: boolean;
  discountPrice?: any;
  style?: any;
}
function AccountPriceTable({ style, discountPrice, proposedPrice, handleProposedData, proposedPriceFromData, proposedPriceType = false }: Props): any {
  const { isLoading } = AccountPriceHook()
  const [flag, setFlag] = useState(false);
  const [proposedPrice_, setProposedPrice_] = useState(proposedPrice);
  console.log("account price table 0000---> ", discountPrice, proposedPriceFromData)
  React.useEffect(() => {
    if (proposedPrice.length > 0) {
      console.log("flag")
      setProposedPrice_(proposedPrice)
      setFlag(true)
    }
  }, [flag])
  return (
    <div style={style}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 780 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow style={{ height: 21 }}>
              <StyledTableCell>Catalog No.</StyledTableCell>
              <StyledTableCell align="left">Product</StyledTableCell>
              <StyledTableCell align="left">Actual Price</StyledTableCell>
              <StyledTableCell align="left">Proposed Price</StyledTableCell>
              <StyledTableCell align="center">Discount %</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {proposedPrice_ && proposedPrice_.length > 0 && proposedPrice_.map((row: any, idx: number) => {
              return proposedPriceFromData[idx] &&
                (
                  <StyledTableRow key={row.catalog}>
                    <StyledTableCell component="th" scope="row">
                    {row.catalog}
                  </StyledTableCell>
                  <StyledTableCell align="left">{row.name}</StyledTableCell>
                  <StyledTableCell align="left">{row.price}</StyledTableCell>
                  <StyledTableCell align="left">
                    {proposedPriceType ? proposedPriceFromData[idx] : <CustomInput
                      value={proposedPriceFromData[idx]}
                      placeholder=''
                      type='number'
                      name='price'
                      handleChange={(e: any) => handleProposedData(e, idx)}
                    />}
                  </StyledTableCell>
                  <StyledTableCell align="center">{discountPrice && discountPrice[idx]}</StyledTableCell>
                </StyledTableRow>
                )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default AccountPriceTable
