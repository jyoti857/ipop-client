import React, { useContext, useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DiscountGroupDetailTable from '../../containers/configuration/discount-groups/discount-groups-detail-table';
import { Card } from '@material-ui/core';
import { FaCapsules } from 'react-icons/fa'
import { FiEdit3 } from 'react-icons/fi'
import { Button, CardContent, Typography } from '@mui/material';
import { DiscountPriceContext } from '../../contexts/discountPriceContext';
type Props = {
  panelProps: string;
  row: any;
  setEditDiscountPriceModal?: any
};

function DGAccordion({ panelProps, row, setEditDiscountPriceModal }: Props) {
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const { state, dispatch } = useContext(DiscountPriceContext)
  console.log("tulip ---> ", state)
  const handleEditSave = () => {
    dispatch({ type: 'SELECT_DISCOUNT_PRICE', payload: { row, isModalOpen: true } })
    setEditDiscountPriceModal(state.editModal)
  }
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
          <div
            style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}
          >
            <div style={{ width: '9%' }}>
            {row.name}
          </div>
            <div>
            {row.code}
          </div>
            <div style={{ color: 'text.secondary', width: '10%' }}>
            {row.createdBy}
          </div>
            <div style={{ color: 'text.secondary' }}>
            {row.startDate}
          </div>
            <div style={{ color: 'text.secondary' }}>
            {row.endDate}
          </div>
            <div style={{ color: 'text.secondary' }}>
            {row.status}
          </div>
            <div style={{ color: 'text.secondary' }}>
            {row.actions}
          </div>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <Card style={{ display: 'flex', justifyContent: 'space-between', margin: 1, marginBottom: 12, boxShadow: '0px 48px 100px 0px #110c2e' }}>
            <CardContent style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <FaCapsules size={24} color='green' />
              <Typography variant="h5" component='h1'>Assigned Products</Typography>
            </CardContent>
            <CardContent>
              <Button
                onClick={handleEditSave}
                color='primary' variant='contained'>Edit <FiEdit3 style={{ gap: 2 }} /></Button>
            </CardContent>
          </Card>
          <DiscountGroupDetailTable discountProductWithPrices={row.discountPriceList} />
        </AccordionDetails>
      </Accordion>
    }

  </div >;
}

export default DGAccordion;
