import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DiscountGroupDetailTable from '../../containers/configuration/discount-groups/discount-groups-detail-table';
type Props = {
  panelProps: string;
  row: any;
  id: any
};

function DGAccordion({ panelProps, row, id }: Props) {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  return <div>
    {
      <Accordion expanded={expanded === panelProps} onChange={handleChange(panelProps)}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <div style={{ width: '52%', flexShrink: 0 }}>
            {row.name}
          </div>
          <div style={{ width: '9%', flexShrink: 0 }}>
            {row.code}
          </div>
          <div style={{ width: '20%', flexShrink: 1, color: 'text.secondary' }}>
            {row.createdBy}
          </div>
          <div style={{ width: '22%', color: 'text.secondary' }}>
            {row.startDate}
          </div>
          <div style={{ width: '20%', color: 'text.secondary' }}>
            {row.endDate}
          </div>
          <div style={{ width: '11%', color: 'text.secondary' }}>
            {row.status}
          </div>
          <div style={{ width: '10%', color: 'text.secondary' }}>
            {row.actions}
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <DiscountGroupDetailTable />
        </AccordionDetails>
      </Accordion>
    }

  </div >;
}

export default DGAccordion;
