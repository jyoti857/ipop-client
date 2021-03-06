import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import { ReactElement, useEffect, useState } from 'react'
import CustomModal from '../../components/modal';
import AccountModal from './AccountModal';
import { useDispatch } from 'react-redux'
import { Data } from './AccountTable';
import { useQuery } from 'react-query'
import { useStyles } from './styles'
import { Link } from 'react-router-dom';
import { getAccountList } from '../../utils/baseUrl';
import { AccountStatusColorMapper, AccountStatusColorType } from './accountDetail';
import { FaHospitalUser } from 'react-icons/fa';
import Loading from '../../components/loading';
interface Props {

}
const columns: any = [
  { id: 'name', label: 'Name', maxWidth: 150 },
  { id: 'status', label: 'Status', maxWidth: 30, align: 'center' },
  { id: 'address', label: 'Address', minWidth: 100 },
  { id: 'city', label: 'City', minWidth: 100 },
  { id: 'state', label: 'State', minWidth: 100 },
  { id: 'country', label: 'Country', minWidth: 100, },
  { id: 'zip', label: 'Zip', minWidth: 100 }
]
function createData(
  name: string,
  status: string,
  address: string,
  city: string,
  state: string,
  country: string,
  zip: string,
  _id: string
): Data {
  // const density = population / size;
  return { name, status, address, city, state, country, zip, _id };
}
const rows: any = [
  // createData('STANFORD UNIVERSITY MEDICAL CE1', 'Pending', "899 EATON AVE", "BETHLEHEM", "PA", '', '18025'),
];
function AccountList({ }: Props): ReactElement {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState<boolean>(false)
  const [userId, setUserId] = useState<string | null>(localStorage.getItem('userid'))
  const { data, isLoading, isError, isFetching, isFetched } = useQuery('accountList', getAccountList)
  const handleOpen = (open: boolean) => setOpen(open)
  const handleClose = (close: boolean) => setOpen(close)

  console.log("data query ---> ", data, isLoading, isError, "user id ", userId,
    "isFethcing ", isFetching, "isFetched ", isFetched
  )

  // get the account list using react query above line is commented that is data we are getting using the 
  // redux saga with triggering the action
  const accounts: any = data && data?.map(({ name, accountStatus, city, state, addressLine1, zip, country, _id }: any) => {
    return (
      createData(name, accountStatus, addressLine1, city, state, country, zip, _id)
    )
  })
  useEffect(() => {
    const s = async () => {
      const _id = await localStorage.getItem('userid')!;
      setUserId(_id)
    }
    s();
  }, [])
  useEffect(() => { }, [isLoading])


  return (
    !isLoading ? <div className={classes.root}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }} >
        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <div className={classes.accountsText}>Accounts</div>
          <div className={classes.accountCount}>{accounts?.length}</div>
        </div>
        <div>
          <button
            className={classes.newAccountButton}
            onClick={() => handleOpen(true)}
          >Create New Account</button>
        </div>
      </div>
      {
        open ? <CustomModal
          open={open}
          modalName="Create New Account"
          handleClose={handleClose}
          styles={{ width: 700, marginTop: 40, minHeight: 400 }}>
          <AccountModal handleClose={handleClose} />
        </CustomModal> : null
      }
      <Paper style={{ marginTop: 12, width: '100%' }}>
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
              {!isLoading && isFetched ?
                accounts?.length > 0 && accounts 
                  .map((row: any, rowIndex: number) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                      {columns.map((column: any) => {
                        // const value = row[column.id] == 'name' ? <Link to='/login'>{row[column.id]}</Link> : row[column.id]
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}> 
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : column.id === 'name' ?
                                <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                                  <FaHospitalUser style={{ width: 40, height: 40, marginLeft: 1, backgroundColor: AccountStatusColorMapper[accounts[rowIndex]?.status as AccountStatusColorType] || 'pink', padding: 10, borderRadius: '50%', color: '#fff' }} />
                                  <Link to={`/app-account/${userId}/individual-account/${row._id}`} style={{ marginLeft: 12, textDecoration: 'none', color: '#0E1EBC' }}>{value}</Link>
                                </div>
                                : column.id === 'status' ? <div style={{ backgroundColor: AccountStatusColorMapper[value as AccountStatusColorType], textAlign: 'center', borderRadius: 12, padding: 4, fontSize: 14, fontFamily: "sans-serif" }}>{value}</div>
                                  : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                  }) : <Loading />}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={rows.length}
          rowsPerPage={10}
          page={0}
          onPageChange={() => { }}//handleChangePage}
          onRowsPerPageChange={() => { }} //handleChangeRowsPerPage}
          />
      </Paper>
    </div> : <Loading />
  )
}

export default AccountList
