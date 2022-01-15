import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';





export default function DiscountGroupsAccordion({ row }: any) {
  const [expanded, setExpanded] = React.useState<string | false>('panel1');

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#942BA8',
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 12,
    },
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
  const rows = [
    createData('Occasion Name', 'code', 'createdBy', "start date", "end date", 'inactive', 'actions'),
  ];
  return (
    <StyledTableRow key={row.name}>
      <StyledTableCell component="th" scope="row">
        {row.name}
      </StyledTableCell>
      <StyledTableCell align="right">{row.code}</StyledTableCell>
      <StyledTableCell align="right">{row.createdBy}</StyledTableCell>
      <StyledTableCell align="right">{row.startDate}</StyledTableCell>
      <StyledTableCell align="right">{row.endDate}</StyledTableCell>
      <StyledTableCell align="right">{row.status}</StyledTableCell>
      <StyledTableCell align="right">{row.actions}</StyledTableCell>
    </StyledTableRow>
  );
}

