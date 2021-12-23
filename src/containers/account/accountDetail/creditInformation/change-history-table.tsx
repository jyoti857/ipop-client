import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(
  // updatedDate: string,
  creditLimit: number,
  comments: string,
  updatedBy: string,
  // protein: number,
) {
  return { creditLimit, comments, updatedBy };
}

const rows = [
  createData(159, "lwer", 'erer'),
  createData(237, 'erer', 'ere'),
  createData(262, 'err', 'erer'),
];

export default function ChangeHistoryTable({ histories }: any) {
  // const { creditLimit, comments, updatedBy } = payload
  const rows = histories.length > 0 ? histories.map(({ creditLimit, comment, createdBy }: any) => {
    return { creditLimit, comment, createdBy }
  }) : []

  console.log("comments ", histories)
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="caption table">
        <caption>A basic table example with a caption</caption>
        <TableHead>
          <TableRow>
            <TableCell>Credit Limit</TableCell>
            <TableCell align="right">Comments</TableCell>
            <TableCell align="right">Updated By</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row: any) => (
            <TableRow key={row.creditLimit}>
              <TableCell component="th" scope="row">
                {row.creditLimit}
              </TableCell>
              <TableCell align="right">{row.comment}</TableCell>
              <TableCell align="right">{row.createdBy}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
