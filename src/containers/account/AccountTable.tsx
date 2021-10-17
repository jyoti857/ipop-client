import React, { ReactElement } from 'react'
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@mui/styles';
import { createTheme } from '@mui/material/styles';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import { AutoSizer, Column, Table, TableCellRenderer, TableHeaderProps } from 'react-virtualized';
import { height } from '@mui/system';
import { useStyles } from './styles';
interface ColumnData {
  dataKey: string;
  label: string;
  numeric?: boolean;
  width: number;
}
export interface Data {
  // calories: number;
  // carbs: number;
  // dessert: string;
  // fat: number;
  // id: number;
  // protein: number;
  name: string;
  status: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zip: string;
  _id: string;
}
interface Props {
  columns: readonly ColumnData[];
  headerHeight?: number;
  onRowClick?: () => void;
  rowCount: number;
  rowGetter: (row: Row) => Data;
  rowHeight?: number;
}
interface Row {
  index: number;
}

// export function createData(
//   id: number,
//   dessert: string,
//   calories: number,
//   fat: number,
//   carbs: number,
//   protein: number,
// ): Data {
//   return { id, dessert, calories, fat, carbs, protein };
// }

function AccountTable({ columns, onRowClick, headerHeight = 40, rowHeight = 48 }: Props): ReactElement {
  const classes = useStyles();
  const cellRenderer: TableCellRenderer = ({ cellData, columnIndex }) => {
    return (
      <TableCell
        component='div'
        className={clsx(classes.tableCell, classes.flexContaier, {
          [classes.noClick]: onRowClick == null,
        })}
        variant='body'
        style={{ height: 40 }}
        align={
          (columnIndex != null && columns[columnIndex].numeric) || false
            ? 'right'
            : 'left'
        }
      >
        {cellData}
      </TableCell>
    )
  }
  const getRowClassName = ({ index }: Row) => {
    return clsx(classes.tableRow, classes.flexContaier, {
      [classes.tableRowHeader]: index !== -1 && onRowClick != null
    });
  }
  const headerRender = ({ label, columnIndex }: TableHeaderProps & { columnIndex: number }) => {
    return (
      <TableCell
        component='div'
        variant='head'
        style={{ height: headerHeight }}
        className={clsx(classes.flexContaier, classes.tableCell, classes.noClick)}
        align={columns[columnIndex].numeric || false ? 'right' : 'left'}
      >
        <span>{label}</span>
      </TableCell>
    )
  }
  return (
    <AutoSizer>
      {({ height, width }) => {
        return (
          <Table
            height={height}
            rowHeight={rowHeight}
            width={width}
            headerHeight={headerHeight}
            rowCount={23}
            rowClassName={getRowClassName}
            gridStyle={{ direction: 'inherit' }}
            className={classes.table}
          >
            {
              columns.map(({ dataKey, ...other }, index) => {
                return (
                  <Column
                    key={dataKey}
                    headerRenderer={(headerProps) => headerRender({ ...headerProps, columnIndex: index })}
                    dataKey={dataKey}
                    cellRenderer={cellRenderer}
                    className={classes.flexContaier}
                    {...other}
                  >
                  </Column>
                )
              })
            }
          </Table>
        )
      }}
    </AutoSizer >
  )
}

export default AccountTable
