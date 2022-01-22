import { IconButton, Paper, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { ReactElement } from 'react'
import { FiEdit } from 'react-icons/fi'
import { useQuery } from 'react-query'
import Loading from '../../../components/loading'
import { getAllProducts } from '../../../utils/baseUrl'
import { StyledTableCell, StyledTableRow } from '../products'

const discountHeaders = [
  { code: 'Name' },
  { code: "Catalog" },
  { code: "Actual Price" },
  { code: "Discount %" },
  { code: "Price" }
]
interface Props {
  // headers: any[]
  discountProductWithPrices: any
}

function DisocuntGroupDetailTable({ discountProductWithPrices }: Props): ReactElement {
  const { data: productsData, isLoading } = useQuery('getProducts', getAllProducts)
  const products = productsData?.map(({ _id, name, catalog, price }: any) => ({
    _id, name, catalog, price
  }))
  console.log("modified data --->", discountProductWithPrices)
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {
              discountHeaders.map(({ code }) => {
                return (
                  <StyledTableCell align="left">{code}</StyledTableCell>
                )
              })
            }
          </TableRow>
        </TableHead>
        {
          isLoading ? <Loading /> :
            <TableBody>
              {products?.map((row: any, idx: number) => {
                return (
                  <>
                    <StyledTableRow key={row.name}>
                      <StyledTableCell component="th" scope="row">
                        {row.name}
                      </StyledTableCell>
                      <StyledTableCell align="left">{row.catalog}</StyledTableCell>
                      <StyledTableCell align="left">{row.price}</StyledTableCell>
                      <StyledTableCell align="left">{discountProductWithPrices[idx].discountPrice}%</StyledTableCell>
                      <StyledTableCell align="left">{discountProductWithPrices[idx].proposedPrice}</StyledTableCell>
                    </StyledTableRow>
                  </>
                )
              }
              )}
            </TableBody>
        }
      </Table>
    </TableContainer>
  )
}

export default DisocuntGroupDetailTable
