import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow } from '@mui/material';
import TablePaginationsActions from '../table/tablePaginationsActions';


type Props = {
  children: React.ReactElement;
  row: any;
  isCloseIcon?: boolean;
  isFooter?: boolean;
}
const { useState } = React
function CustomAccordion({ children, row, isCloseIcon, isFooter }: Props) {
  const [expanded, setExpanded] = useState<string | false>(false);

  const keys = Object.keys(row);
  return (
    <Accordion>
      <AccordionSummary
      // expandIcon={<ExpandMoreIcon />}
      // aria-controls="panel1a-content"
      // id="panel1a-header"
      >
        <TableRow
          style={{ minWidth: 1590 }}
        >
          {
            keys.map((a, idx) => {
              return <TableCell style={{
                width: idx == 0 || idx == 1 ? 250 : 160,
              }}>
                {row[keys[isCloseIcon && idx === keys.length - 1 ? idx - 1 : idx]]}</TableCell>
            })
          }
        </TableRow>
      </AccordionSummary>
      <AccordionDetails>
        {children}
      </AccordionDetails>
    </Accordion >
  );
}

export default CustomAccordion