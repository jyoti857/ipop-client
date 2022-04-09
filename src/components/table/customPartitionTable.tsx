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
  const { color, statusColor, ...rest } = selectedOrderDetail
  const keys_ = Object.keys(rest);
  const rows_ = keys_.map((d: any) => {
    return createData(d.charAt(0).toUpperCase() + d.slice(1).split(/(?=[A-Z])/).join(',').replaceAll(',', ' '), selectedOrderDetail[d])
  })

  return (
    <Root sx={{ width: '100%' }}>
      <table>
        <tbody>
          {rows_.map((row) => (
            <tr key={row._key}>
              <td style={{ width: 400 }} align="right">
                {row._key}
              </td>
              {
                row._key.slice(-6) === 'Status'
                  ? <td>
                    <div style={{ width: '12%', color, backgroundColor: statusColor, padding: 3, borderRadius: 8, textAlign: 'center', fontSize: 16 }}>
                      {row._value}
                    </div>
                  </td>
                  : <td>
                    {row._value}
                  </td>
              }
            </tr>
          ))}
        </tbody>
      </table>
    </Root>
  );
}
