import { Button, Paper } from '@mui/material';
import { ReactElement, useEffect, useState } from 'react'
import { FaFileInvoiceDollar } from 'react-icons/fa';
import CustomInput from '../../../../components/input/CustomInput';
import CustomModal from '../../../../components/modal';
import { useStyles } from './styles';
import AccountPriceTable from './accountPriceTable'
import CustomAccountPriceQuoteFormik from '../accountPriceQuoteFormik';
import { useMutation, useQuery } from 'react-query'
import { createAccountPrice, getAllAccountPricesByAccountId } from '../../../../utils/baseUrl';
import { useParams } from 'react-router-dom'
import CustomizedRadios from '../../../../components/radio-button';
import { AccountPriceHook } from './accountPriceHook';
import CustomizedAccordions from '../../../../components/accordion';
import { Label } from '@mui/icons-material';
import CustomDropdown from '../../../../components/dropdown';
import { AccountPriceTypeEnum } from '../../types/AccountPriceTypeEnum';
interface Props {

}

function AccountPrice({ }: Props): ReactElement {
  const classes = useStyles();
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const { data, proposedPrice: pp, proposedPriceFromData: ppfd } = AccountPriceHook()
  const [proposedPrice, setProposedPrice] = useState(pp ? pp : [])
  const [discountPrice, setDiscountPrice] = useState([])
  const [discountPriceUpdateFlag, setDiscountPriceUpdateFlag] = useState(false)
  const [proposedPriceFromData, setProposedPriceFromData] = useState<any[]>(ppfd)
  const [radioValue, setRadioValue] = useState("Matrix Pricing")
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const { accountId } = useParams<{ accountId: string }>();
  const { data: allAccountPricesCreated, isLoading } = useQuery('getAllAccountPrices', () => getAllAccountPricesByAccountId(accountId))
  const mutation = useMutation(createAccountPrice)
  const handleAccountPriceSubmit = (event: any) => {
    console.log("account-price-quote ", typeof event, priceTitle, startDate, endDate, proposedPrice)
    mutation.mutateAsync({ id: accountId, title: priceTitle, startDate, endDate, productWithPrice: accountPrices, accountPriceType: radioValue === 'Matrix Pricing' ? AccountPriceTypeEnum.MATRXPR : AccountPriceTypeEnum.PREAPPR })
    priceTitle && handleClose()
  }
  useEffect(() => {
    setProposedPrice(pp)
    setProposedPriceFromData(ppfd)
  }, [ppfd])
  const accountPrices = proposedPrice.map((p: any, idx: number) => ({
    ...p,
    proposedPrice: proposedPriceFromData[idx],
    discountPrice: discountPrice[idx]
  }))
  console.log("bandira ---> ", accountPrices, proposedPrice, proposedPriceFromData)
  console.log("mand  ---> ", allAccountPricesCreated)
  const handleProposedData = (e: any, id: number) => {
    const sd: any[] = [...proposedPriceFromData]
    if (e.target.value > data?.map((d: any) => d.price)[id]) {
      console.log("from data ***", proposedPriceFromData[id])
      setProposedPriceFromData(proposedPriceFromData)
    } else {
      sd[id] = e.target.value;
      setProposedPriceFromData(sd)
    }
    setDiscountPriceUpdateFlag(!discountPriceUpdateFlag)
    console.log("from data ***, proposed", proposedPriceFromData)
    // setDiscountPrice(dis)
  }
  useEffect(() => { calculateDiscountPrice() }, [discountPriceUpdateFlag])
  const calculateDiscountPrice = () => {
    const dis = data?.map((d: any, i: number) => (((d.price - proposedPriceFromData[i]) / d.price) * 100).toFixed(2))
    setDiscountPrice(dis)
  }
  console.log("from data ***, proposed", discountPrice, proposedPriceFromData)
  const { handleBlur, handleChange, values: { endDate, startDate, priceTitle } } = CustomAccountPriceQuoteFormik({ onsubmit: handleAccountPriceSubmit })

  // radion button setup
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRadioValue((event.target as HTMLInputElement).value);
  };
  const disableAddButtonIfOneInPending = (): boolean => {
    return allAccountPricesCreated?.find((aacpc: any) => aacpc.status === "Pending")
  }
  return (
    <div>
      <Paper className={classes.root}>
        <div style={{ display: 'flex', margin: 10 }}>
          <Button
            disabled={disableAddButtonIfOneInPending()}
            color='primary'
            variant='contained'
            style={{ position: 'absolute', top: 10, right: 80 }}
            onClick={handleOpen}
          >
            Add
          </Button>
          <Button
            style={{ position: 'absolute', top: 10, right: 10 }}
            color='secondary'
            variant='outlined'
          >Sync</Button>
          <CustomInput value='search' name='search' type='text' placeholder='search' style={{ width: '20%', position: 'absolute', top: 8, right: 150 }} />
        </div>
        {
          isLoading ? <div>
          <div
            className={classes.fileIcon}
          >
            <FaFileInvoiceDollar />
          </div>
          <div className={classes.centerLine}>No price list found for this account!</div>
          </div> :
            <div style={{ marginTop: 12, left: -260, top: 40, position: 'relative', paddingBottom: 60 }}>
              <CustomizedAccordions discountPrice={discountPrice} proposedPrice={proposedPrice} allAccountPricesCreated={allAccountPricesCreated} proposedPriceFromData={proposedPriceFromData} />
            </div>
        }
      </Paper>
      <CustomModal handleClose={handleClose} open={open} modalName='Account Price' footerButtonName='Submit for approval' styles={{ minWidth: 1000 }} onSubmit={handleAccountPriceSubmit}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', margin: 12 }}>
            <div style={{ display: 'flex' }}>
              {/* Price list type */}
              <CustomizedRadios radioValue={radioValue} handleChange={handleRadioChange} title="Price List" options={[{ label: "Matrix Pricing", value: "Matrix Pricing" }, { label: "Pre approved pricing (IDN contracts, 1124)", value: "Pre approved pricing (IDN contracts, 1124)" }]} />
            </div>
            <div style={{ width: '49%' }}>
              <CustomInput value={priceTitle} handleChange={handleChange} name='priceTitle' type='text' placeholder='Price list title' style={{ width: '100%' }} />

              {
                radioValue === 'Matrix Pricing' ? '' :
                  <CustomDropdown
                    data={[{ desc: "occasion 1", value: "occasion_1_value" }, { desc: "occasion 2", value: "occasion_2_value" }]}
                    name='discount-group'
                    value='occasion_1_value'
                  />
              }
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', margin: 12 }}>
            <div style={{ width: '48%' }}>
              <CustomInput value={startDate} handleChange={handleChange} name='startDate' type='text' placeholder='Start Date' style={{ width: '100%' }} />
            </div>
            <div style={{ width: '49%' }}>
              <CustomInput value={endDate} handleChange={handleChange} name='endDate' type='text' placeholder='End Date' style={{ width: '100%' }} />
            </div>
          </div>
          {proposedPrice && proposedPriceFromData?.length > 0 ? <AccountPriceTable discountPrice={discountPrice} proposedPrice={proposedPrice} proposedPriceFromData={proposedPriceFromData} handleProposedData={handleProposedData} /> : 'loading'}
        </div>
      </CustomModal>
    </div>
  )
}

export default AccountPrice
