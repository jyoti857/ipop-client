import { TableCell } from '@mui/material';
import { withStyles, WithStyles } from '@mui/styles';
import { createTheme } from '@mui/material/styles';
import clsx from 'clsx';
import React from 'react';
import { Column, AutoSizer, Table, TableCellRenderer, TableHeaderProps } from 'react-virtualized';
import { useStyles } from './styles'
import { Data } from './types'
type Props = {
  headerHeight: number;
  columns: any[];
  classes: any;
  onRowClick: () => any;
};
interface Row {
  index: number;
}

interface ColumnData {
  dataKey: string;
  label: string;
  numeric?: boolean;
  width: number;
}
interface MuiVirtualizedTableProps extends WithStyles<typeof useStyles> {
  columns: readonly ColumnData[];
  headerHeight?: number;
  onRowClick?: () => void;
  rowCount: number;
  rowGetter: (row: Row) => Data;
  rowHeight?: number;
}
class MuiVirtualizedTable extends React.PureComponent<MuiVirtualizedTableProps> {
  static defaultProps = {
    headerHeight: 30,
    rowHeight: 38,
  };
  getRowClassName = ({ index }: Row) => {
    const { classes, onRowClick } = this.props;
    return clsx(classes.tableRow, classes.flexContainer, {
      [classes.tableRowHover]: index !== -1 && onRowClick != null,
    });
  };
  headerRenderer =
    ({ label, columnIndex }: TableHeaderProps & { columnIndex: number }) => {
      const { classes: { tableCell, flexContainer, noClick }, headerHeight, columns } = this.props;
      return (
        <TableCell
          component="div"
          className={clsx(tableCell, flexContainer, noClick)}
          variant="head"
          style={{ height: headerHeight }}
          align={columns[columnIndex].numeric || false ? 'right' : 'left'}
        >
          <span>{label}</span>
        </TableCell>
      );
    }

  cellRenderer: TableCellRenderer = ({ cellData, columnIndex }) => {
    const { classes: { tableCell, flexContainer, noClick }, onRowClick, rowHeight, columns } = this.props;
    return (
      <TableCell
        component="div"
        className={clsx(tableCell, flexContainer, {
          [noClick]: onRowClick == null,
        })}
        variant="body"
        style={columnIndex === 0 ? { height: rowHeight, color: "blue", cursor: 'pointer' } : { height: rowHeight }}
        // onClick={history.push(`/app-account/${localStorage.getItem('userid')}`)}
        align={
          (columnIndex != null && columns[columnIndex].numeric) || false
            ? 'right'
            : 'left'
        }
      >
        {cellData}
      </TableCell >
    );
  }
  render() {
    const { classes: { flexContainer }, headerHeight, rowHeight, columns, ...tableProps } = this.props;
    return <AutoSizer>
      {({ height, width }) => (
        <Table
          height={height}
          width={width}
          rowHeight={rowHeight!}
          gridStyle={{
            direction: 'inherit',
          }}
          headerHeight={headerHeight!}
          {...tableProps}
          rowClassName={this.getRowClassName}
        >
          {columns.map(({ dataKey, ...other }, index) => {
            return (
              <Column
                key={dataKey}
                headerRenderer={(headerProps) =>
                  this.headerRenderer({
                    ...headerProps,
                    columnIndex: index,
                  })
                }
                className={flexContainer}
                cellRenderer={this.cellRenderer}
                dataKey={dataKey}
                {...other}
              />
            );
          })}
        </Table>
      )}
    </AutoSizer>;
  }
}

const defaultTheme = createTheme();
const DashboardTable = withStyles(useStyles, { defaultTheme })(MuiVirtualizedTable);
export default DashboardTable

