import { Button, Paper, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ReactElement } from 'react'
import { useQuery } from 'react-query';
import CustomInput from '../../../components/input/CustomInput';
import { getAllProducts } from '../../../utils/baseUrl';

function createData(
  name: string,
  catoalog: number,
  price: number,
) {
  return { name, catoalog, price };
}
const headers = ["Name", "Cataolog", "Price"]
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette?.common.black,
    color: theme.palette?.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette?.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
function Products(): ReactElement {
  const { data }: any = useQuery('getProducts', getAllProducts);
  console.log("fetch products ---> ", data)
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 600 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <div style={{ margin: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'transparent', width: '137%' }}>
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
              headers.map((header) => {
                return (
                  <StyledTableCell align="left">{header}</StyledTableCell>
                )
              })

            }
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row: any) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="left">{row.catalog}</StyledTableCell>
              <StyledTableCell align="left">{row.price}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default Products
