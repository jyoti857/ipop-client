import * as React from 'react';
import { styled } from '@mui/material/styles';
import TableRow from '@mui/material/TableRow';
import { FiChevronDown, FiChevronRight } from 'react-icons/fi';
import DiscountGroupDetailTable from '../../containers/configuration/discount-groups/discount-groups-detail-table';
import { TableCell, tableCellClasses } from '@mui/material';
import { theme } from '../../theme/customTheme';





export default function DiscountGroupsAccordion({ row, id }: any) {
  const [expanded, setExpanded] = React.useState<boolean>(false);
  const [activeRowId, setActiveRowId] = React.useState<number>(id)
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#942BA8',
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 12,
    },
    margin: 'dense'
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  function createData(
    name: string,
    code: string,
    createdBy: string,
    startDate: string,
    endDate: string,
    status: string,
    actions: any,
  ) {
    return { name, code, createdBy, startDate, endDate, status, actions };
  }
  const handleIconClick = (id: number) => {
    setExpanded(!expanded)
    setActiveRowId(id)
  }
  return (
    <StyledTableRow key={row.name} >
      <TableCell scope="row">
        <div style={{ display: 'flex', alignItems: 'center', minHeight: expanded ? 239 : 'auto' }}>
          {
            !expanded ?
              <FiChevronRight style={{ marginRight: 4, padding: 4, backgroundColor: theme.color?.primary, color: 'white', borderRadius: '50%', height: 30, width: 30 }} size={24} onClick={() => handleIconClick(activeRowId)} />
              : <FiChevronDown style={{ marginRight: 4, padding: 4, backgroundColor: theme.color?.secondary, color: 'white', borderRadius: '50%', height: 30, width: 30 }} size={24} onClick={() => handleIconClick(activeRowId)} />
          }
          <div>
            {row.name}
            <DiscountGroupDetailTable />
          </div>
        </div>
      </TableCell>
      <StyledTableCell align="right">{row.code}</StyledTableCell>
      <StyledTableCell align="right">{row.createdBy}</StyledTableCell>
      <StyledTableCell align="right">{row.startDate}</StyledTableCell>
      <StyledTableCell align="right">{row.endDate}</StyledTableCell>
      <StyledTableCell align="right">{row.status}</StyledTableCell>
      <StyledTableCell align="right">{row.actions}</StyledTableCell>
    </StyledTableRow>
  //     {/* {
  //       expanded && <DiscountGroupDetailTable />
  //     } */}
  // {/* </div> */ }
  );
}

