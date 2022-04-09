import React, { Fragment, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, TableFooter, TablePagination } from '@mui/material';
import TablePaginationsActions from './tablePaginationsActions';
import CustomInput from '../input/CustomInput';
import Check from '../../assets/svg/tick-svg.svg'
import Close from '../../assets/svg/close-svg.svg'


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#942BA8',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  // '&:nth-of-type(odd)': {
  //   backgroundColor: theme.palette.action.hover,
  // },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
  margin: 'dense'
}));



type CustomizedTableProps = {
  headers: any;
  rows?: any;
  isCloseIcon?: boolean;
  isFooter?: boolean;
  isCustomInput?: boolean;
  isChildren?: boolean;
  promocodeId?: string;
  productDetails?: any;
  handleInputChange?: any;
}
export default function CustomizedTables({ handleInputChange, productDetails, promocodeId, isChildren, headers, rows, isCloseIcon = false, isFooter = true, isCustomInput = false }: CustomizedTableProps) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(2);
  const [search, setSearch] = useState('');
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
    <TableContainer component={Paper} >
      <Table sx={{ minWidth: 200, lineHeight: .12, margin: 'dense' }} aria-label="dense table">
        <TableHead>
          <TableRow>
            {
              headers?.map((header: any, index: number) => {
                return <StyledTableCell >{header}</StyledTableCell>
                //align={index !== 1 ? 'right' : 'justify'}
              })
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row: any) => {
            const keys = Object.keys(row);
            console.log("check *****", rows[keys[3]], row)
            return (
              <Fragment>
                <StyledTableRow key={keys[0]}>
                  {
                    keys.map((a, idx) => {
                      console.log("keys smith odean****", a, typeof row[a])
                      if (isCloseIcon) {
                        return (
                          idx != keys.length - 1 && <StyledTableCell align="left">{row[keys[idx]]}</StyledTableCell>
                        )
                      } else if (typeof row[a] === "boolean") {
                        return <StyledTableCell align="left" >
                          {
                            < img src={row[a] ? Check : Close} alt='isAdmin' />
                          }
                        </StyledTableCell>

                      } else if (typeof row[a] === 'number' && isCustomInput) {
                        console.log("doasdioasdoaid ", a, typeof row[a], row[a], row, rows)
                        return <CustomInput value={row[a]} name={row?.name || a} type='number' placeholder={'sd'} handleChange={(e: any) => handleInputChange(e, 0)} />//rows[idx <= rows.length ? idx : 0])} />
                      }
                      else {
                        return <StyledTableCell align="left">{row[keys[isCloseIcon && idx === keys.length - 1 ? idx - 1 : idx]]}</StyledTableCell>
                      }
                    })
                  }
                  {
                    isCloseIcon &&
                    <StyledTableCell align="left">
                      {
                        <img src={row.isAdmin ? Check : Close} alt='isAdmin' />
                      }
                    </StyledTableCell>
                  }
                </StyledTableRow>
                <StyledTableRow>
                {
                    promocodeId === row._id && isChildren &&
                    productDetails(row._id)

                }
                </StyledTableRow>
              </Fragment>

            )
          }
          )}
        </TableBody>
        {
          isFooter &&
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={3}
                  count={rows?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    'aria-label': 'rows per page',
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationsActions}
              />
            </TableRow>
          </TableFooter>
        }
      </Table>
    </TableContainer>
  );
}