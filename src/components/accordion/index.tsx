import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import AccountTable from '../../containers/account/AccountTable';
import AccountPriceTable from '../../containers/account/accountDetail/accountPrice/accountPriceTable';
import { Button } from '@mui/material';

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
interface CustomizedAccordionsProps {
  proposedPrice: any;
  handleProposedData?: any;
  proposedPriceFromData: any;
  allAccountPricesCreated: any[];
  discountPrice: any[];
}
export default function CustomizedAccordions(
  { discountPrice, proposedPrice, proposedPriceFromData, allAccountPricesCreated }: CustomizedAccordionsProps) {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  console.log("acttt ", proposedPrice, allAccountPricesCreated[0])
  return (
    <div style={{ display: 'block' }}>
      {
        allAccountPricesCreated?.map((aacpc: any, idx: number) => {
          const prices = aacpc.productWithPrice.map((a: any) => a.proposedPrice)
          const discountPrices = aacpc.productWithPrice.map((a: any) => a.discountPrice)
          return (
            <div style={{ minHeight: `panel${idx + 1}` === expanded ? 500 : '', marginBottom: 12 }}>
              <Accordion expanded={expanded === `panel${idx + 1}`} onChange={handleChange(`panel${idx + 1}`)}>
                <AccordionSummary aria-controls="panel1d-content" id={`panel${idx + 1}d-header`}>
                  <Typography> {aacpc.title} created Date: <span style={{ color: 'blue', fontSize: 12 }}>{new Date().toISOString().split("T")[0]}</span></Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <AccountPriceTable proposedPriceType={true} discountPrice={discountPrices} proposedPrice={proposedPrice} proposedPriceFromData={prices} />
                </AccordionDetails>
                <Button>Approve</Button>
                <Button>Reject</Button>
              </Accordion>
            </div>
          )
        })
      }
    </div>
  );
}
