import { Button, Paper, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ReactElement, useState } from 'react'
import CustomModal from '../../../components/modal'
import { useQuery } from 'react-query';
import CustomInput from '../../../components/input/CustomInput';
import { getAllProducts } from '../../../utils/baseUrl';
import CustomProductForm from './customProductFormik';
import { useStyles } from './styles'
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
  const [open, setOpen] = useState(false)
  const handleModalOpen = () => setOpen(true)
  const handleModalClose = () => setOpen(false)
  const { data }: any = useQuery('getProducts', getAllProducts);
  console.log("fetch products ---> ", data)
  const handleProductSubmit = () => {
    console.log(catalog, name, price, "catoalog, name, price")
  }
  const { handleChange, handleSubmit, values: { catalog, name, price } } = CustomProductForm({ onSubmit: handleProductSubmit })
  const classes = useStyles()
  return (
    <>
      {
        open && <CustomModal open={open} handleClose={handleModalClose} modalName='New Product' >
          <form onSubmit={handleSubmit} style={{ position: 'relative', height: 200 }} className={classes.root}>
            <div>
              <div style={{ display: 'flex' }}>
                <div>
                  <label>Name</label>
                  <CustomInput name='name' placeholder='' type='text' value={name} handleChange={handleChange} />
                </div>
                <div>
                  <label>Catalog</label>
                  <CustomInput name='catalog' placeholder='' type='text' value={catalog} handleChange={handleChange} />
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: 'column', alignItems: 'flex-start' }}>
                <label>Price</label>
                <CustomInput name='price' placeholder='' type='number' value={price} handleChange={handleChange} style={{ width: '94%' }} />
              </div>
            </div>
            <div style={{ position: 'absolute', bottom: 0, right: 10 }}>
              <Button type='submit' variant='contained'>Create</Button>
            </div>
          </form>
        </CustomModal>
      }
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
                    onClick={handleModalOpen}
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
    </>
  )
}

export default Products
