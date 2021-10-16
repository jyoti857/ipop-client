import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import { ReactElement, useEffect, useState } from 'react'
import CustomModal from '../../components/modal';
import AccountModal from './AccountModal';
import { useDispatch, useSelector } from 'react-redux'
import { Data } from './AccountTable';
import { useStyles } from './styles'
import { getAccountsAction } from './actions';
interface Props {

}
const columns: any = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'status', label: 'Status', minWidth: 100 },
  { id: 'address', label: 'Address', minWidth: 100 },
  { id: 'city', label: 'City', minWidth: 100 },
  { id: 'state', label: 'State', minWidth: 100 },
  { id: 'country', label: 'Country', minWidth: 100 },
  { id: 'zip', label: 'Zip', minWidth: 100 }
]
function createData(
  name: string,
  status: string,
  address: string,
  city: string,
  state: string,
  country: string,
  zip: string
): Data {
  // const density = population / size;
  return { name, status, address, city, state, country, zip };
}
const rows: any = [
  // createData('STANFORD UNIVERSITY MEDICAL CE1', 'Pending', "899 EATON AVE", "BETHLEHEM", "PA", '', '18025'),
];
function AccountList({ }: Props): ReactElement {
  const classes = useStyles();
  const result = useSelector(({ accountReducers }: any) => accountReducers)
  const dispatch = useDispatch();
  const [open, setOpen] = useState<boolean>(false)
  const handleOpen = (open: boolean) => setOpen(open)
  const handleClose = (close: boolean) => setOpen(close)
  console.log("account result ---> ", result.accounts)
  // rows.push({name: account})
  const accounts: any = result.accounts.length > 0 && result.accounts.map(({ name, status, city, state, addressLine1, zip, country }: any) => {
    console.log("000000000000000000000", name, status, city)
    return (
      createData(name, status, addressLine1, city, state, country, zip)
    )
  })
  console.log("accounts --->", accounts, rows)
  useEffect(() => {
    dispatch(getAccountsAction())
  }, [])
  return (
    <div className={classes.root}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }} >
        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <div className={classes.accountsText}>Accounts</div>
          <div className={classes.accountCount}>{accounts.length}</div>
        </div>
        <div>
          {/* <a href='https://wa.me/+91998643219w'>whatsapp me </a> */}
          <button
            className={classes.newAccountButton}
            onClick={() => handleOpen(true)}
          >Create New Account</button>
        </div>
      </div>
      {
        open ? <CustomModal open={open} handleClose={handleClose}>
          <AccountModal handleClose={handleClose} />
        </CustomModal> : null
      }
      <Paper style={{ marginTop: 12, height: 340, width: '100%' }}>
        <TableContainer>
          <Table stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
                {columns.map((column: any) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: 100 }}
                  >{column.label}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {accounts.length > 0 && accounts
                .map((row: any) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                      {columns.map((column: any) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={10}
          page={0}
          onPageChange={() => { }}//handleChangePage}
          onRowsPerPageChange={() => { }} //handleChangeRowsPerPage}
        />
      </Paper>
    </div >
  )
}

export default AccountList
