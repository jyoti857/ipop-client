import * as React from 'react';
import { styled } from '@mui/system';
import TablePaginationUnstyled from '@mui/base/TablePaginationUnstyled';
import { useQuery } from 'react-query';

function createData(_key: string, _value: number) {
  return { _key, _value };
}

const rows = [
  createData('Cupcake', 305),
  createData('Donut', 452)

].sort((a, b) => (a._value < b._value ? -1 : 1));

const blue = {
  200: '#A5D8FF',
  400: '#3399FF',
};

const grey = {
  50: '#F3F6F9',
  100: '#E7EBF0',
  200: '#E0E3E7',
  300: '#CDD2D7',
  400: '#B2BAC2',
  500: '#A0AAB4',
  600: '#6F7E8C',
  700: '#3E5060',
  800: '#2D3843',
  900: '#1A2027',
};

const Root = styled('div')(
  ({ theme }) => `
  table {
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    border-collapse: collapse;
    width: 100%;
  }

  td,
  th {
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
    text-align: left;
    padding: 6px;
  }

  th {
    background-color: ${theme.palette.mode === 'dark' ? grey[900] : grey[100]};
  }
  `,
);

export type CustomPartitionTableProps = {
  selectedOrderDetail: any
}


export default function CustomPartitionTable({ selectedOrderDetail }: any) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };
  const keys_ = Object.keys(selectedOrderDetail);
  console.log("keys__", keys_)
  const rows_ = keys_.map((d: any) => createData(d, selectedOrderDetail[d]))

  return (
    <Root sx={{ width: '98%', maxWidth: '100%', marginTop: 2 }}>
      <table>
        <tbody>
          {(rowsPerPage > 0
            ? rows_.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows_
          ).map((row) => (
            <tr key={row._key}>
              <td style={{ width: 400 }} align="right">
                {row._key}
              </td>
              <td>{row._value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Root>
  );
}
