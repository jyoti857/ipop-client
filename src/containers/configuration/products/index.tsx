import { Button, IconButton, Paper, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ReactElement, useState } from 'react'
import CustomModal from '../../../components/modal'
import { useMutation, useQuery } from 'react-query';
import CustomInput from '../../../components/input/CustomInput';
import { createProduct, getAllProducts, updateProductById } from '../../../utils/baseUrl';
import CustomProductForm from './customProductFormik';
import { FiEdit } from "react-icons/fi";
import { BiX } from "react-icons/bi";
import { BiCheck } from "react-icons/bi";
import { useStyles } from './styles'
import { theme } from '../../../theme/customTheme';
import { ModifiedProductType } from './productType';
function createData(
  name: string,
  catoalog: number,
  price: number,
) {
  return { name, catoalog, price };
}
const headers = ["Name", "Cataolog", "Price", "Actions"]
const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.color?.secondary,
    color: 'white',
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
  const [editProduct, setEditProduct] = useState(false)
  const [editRowId, setEditRowId] = useState<number>(-2)
  const [create, setCreate] = useState(true);

  const [modifiedProduct, setModifiedProduct] = useState<any>(
    {
      name: '',
      catalog: "",
      price: 0
    }
  )
  const handleModifyProduct = (e: any) => {
    e.preventDefault();
    const modifiedProductCopy = { ...modifiedProduct }
    const name: any = e.target.getAttribute('name');
    const value = e.target.value;
    modifiedProductCopy[name] = value;
    setModifiedProduct(modifiedProductCopy)
  }
  const handleModalOpen = () => {
    setOpen(true)
    setCreate(false)
  }
  const handleModalClose = () => setOpen(false)
  const { data, isLoading } = useQuery('getProducts', getAllProducts, { enabled: Boolean(create) });
  console.log("fetch products ---> ", data)
  const mutation = useMutation(createProduct)
  // const updateMutation = useMutation(updateProductById, {})
  const handleEditRow = (id: number) => {
    setEditRowId(id)
    setEditProduct(true)
  }
  const handleProductSubmit = (e: any) => {
    e.preventDefault();
    console.log(catalog, name, price, "catoalog, name, price")
    mutation.mutateAsync({ name, catalog, price })
    setOpen(false)
    setCreate(true)
  }
  const HandleEditProduct = (id: string) => {
    setEditProduct(!editProduct)
    // need to check and start with the update in react query 
    // updateMutation.mutate(id, modifiedProduct)
    // console.log("updated data ----> ", data)
  }
  const { handleChange, handleSubmit, values: { catalog, name, price } } = CustomProductForm({ onSubmit: handleProductSubmit })
  const classes = useStyles()
  return (
    <>
      {
        open && <CustomModal open={open} handleClose={handleModalClose} modalName='New Product' >
          <form onSubmit={handleProductSubmit} style={{ position: 'relative', height: 200 }} className={classes.root}>
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
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
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
          {
            isLoading ? <div>Loading*****</div> :
              <TableBody>
                {data?.map((row: any, idx: number) => {
                  return (
                    editProduct && editRowId === idx ? <div style={{ display: 'flex', justifyContent: 'space-between', margin: 2, width: '127%' }}>
                      <CustomInput name='name' placeholder='' type='text' value={modifiedProduct.name} handleChange={handleModifyProduct} />
                      <CustomInput name='catalog' placeholder='' type='text' value={row.catalog} handleChange={handleChange} />
                      <CustomInput name='price' placeholder='' type='number' value={price} handleChange={handleChange} />
                      <IconButton onClick={() => handleEditRow(idx)}>
                        <BiCheck />
                      </IconButton>
                      <IconButton onClick={() => HandleEditProduct(data._id)}>
                        <BiX />
                      </IconButton>
                    </div> :
                      <>
                        <StyledTableRow key={row.name}>
                          <StyledTableCell component="th" scope="row">
                            {row.name}
                          </StyledTableCell>
                          <StyledTableCell align="left">{row.catalog}</StyledTableCell>
                          <StyledTableCell align="left">{row.price}</StyledTableCell>
                          <StyledTableCell align="left">
                            <IconButton onClick={() => handleEditRow(idx)}>
                              <FiEdit />
                            </IconButton>
                          </StyledTableCell>
                        </StyledTableRow>
                      </>
                  )
                }
                )}
              </TableBody>
          }
      </Table>
    </TableContainer>
    </>
  )
}

export default Products