import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { Button, Typography } from '@mui/material';
import QuotesTable from './quotesTable';


const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={7} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  height: '48px',
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));
interface QuoteAccordionProps {
  quoteList: any;
  footerButton?: boolean;
}
export default function QuoteAccordion(
  { quoteList, footerButton }: QuoteAccordionProps) {
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const productWithPrice = quoteList.productQuotes.map((a: any) => ({ name: a.name, catalog: a.catalog, proposedPrice: a.proposedPrice }))
  const qtySet = quoteList.productQuotes.map((a: any) => ({ qtySet }))
  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  return (
    <div style={{ display: 'block' }}>
      {
        quoteList?.map((aacpc: any, idx: number) => {
          return (
            <div style={{ minHeight: `panel${idx + 1}` === expanded ? (2 * 100) : '', marginBottom: 12 }}>
              <Accordion expanded={expanded === `panel${idx + 1}`} onChange={handleChange(`panel${idx + 1}`)}>
                <AccordionSummary aria-controls="panel1d-content" id={`panel${idx + 1}d-header`}>
                  <Typography >
                    {aacpc.title} created Date: <span style={{ color: 'blue', fontSize: 12 }}>{new Date().toISOString().split("T")[0]}</span><span style={{ backgroundColor: 'blue', color: 'white', borderRadius: 12, padding: 4, fontSize: 12, marginLeft: 12 }}>{aacpc.status}</span></Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <QuotesTable productWithPrice={productWithPrice} qtySet={qtySet} />
                </AccordionDetails>
                {
                  footerButton &&
                  <div>
                    <Button>Approve</Button>
                    <Button>Reject</Button>
                  </div>
                }
              </Accordion>
            </div>
          )
        })
      }
    </div >
  );
}
