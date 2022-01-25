import { Button, Paper } from '@mui/material';
import React, { ReactElement, useEffect, useState } from 'react'
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
import CustomDatePicker from '../../../../components/calendar';
import { addDays } from '../../../../utils/dateFunctions';
import { useDiscountGroups } from '../../../configuration/discount-groups/useDiscountGroups';
import CustomFullModal from '../../../../components/modal/customFullModal';
import Loading from '../../../../components/loading';
import DisocuntGroupDetailTable from '../../../configuration/discount-groups/discount-groups-detail-table';
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
  const [dgDropdown, setDgDropdown] = useState<string>('')
  const [selectedDG, setSelectedDG] = useState<string>('')
  const { data: discountgroupData } = useDiscountGroups()
  const discountgroupNames = discountgroupData?.map(({ name, _id, ...props }: any) => ({ desc: name, value: _id }))
  const discountPrices = discountgroupData?.find((a: any) => a._id === dgDropdown)?.discountPriceList
  console.log("discount prices ** --> ", discountgroupData, discountPrices)
  const currentDate = new Date()
  const [date, setDate] = useState({ startDate: currentDate.toISOString().split('T').toString(), endDate: addDays(currentDate, 60).toISOString().split("T")[0] })
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const { accountId } = useParams<{ accountId: string }>();
  const { data: allAccountPricesCreated, isLoading } = useQuery('getAllAccountPrices', () => getAllAccountPricesByAccountId(accountId))
  const mutation = useMutation(createAccountPrice)
  const handleAccountPriceSubmit = (event: any) => {
    console.log("account-price-quote ", typeof event, priceTitle, startDate, endDate, proposedPrice)
    mutation.mutateAsync({
      id: accountId,
      title: priceTitle,
      startDate,
      endDate,
      productWithPrice: accountPrices,
      accountPriceType: radioValue === 'Matrix Pricing' ? AccountPriceTypeEnum.MATRXPR : AccountPriceTypeEnum.PREAPPR
    })
    priceTitle && handleClose()
  }
  useEffect(() => {
    setProposedPrice(pp)
    setProposedPriceFromData(ppfd)
  }, [ppfd])
  const accountPrices = proposedPrice.map((p: any, idx: number) => ({
    ...p,
    proposedPrice: radioValue === 'Matrix Pricing' ? proposedPriceFromData[idx] : discountPrices?.length > 0 && +discountPrices[idx]?.proposedPrice,
    discountPrice: radioValue === 'Matrix Pricing' ? discountPrice[idx] : discountPrices?.length > 0 && +discountPrices[idx]?.discountPrice
  }))

  // here the e is given the type from being an any
  const handleProposedData = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    const sd: any[] = [...proposedPriceFromData]
    if (e.target.value > data?.map((d: any) => d.price)[id]) {
      setProposedPriceFromData(proposedPriceFromData)
    } else {
      sd[id] = e.target.value;
      setProposedPriceFromData(sd)
    }
    setDiscountPriceUpdateFlag(!discountPriceUpdateFlag)
    // setDiscountPrice(dis)
  }
  useEffect(() => { calculateDiscountPrice() }, [discountPriceUpdateFlag])
  const calculateDiscountPrice = () => {
    const dis = data?.map((d: any, i: number) => (((d.price - proposedPriceFromData[i]) / d.price) * 100).toFixed(2))
    setDiscountPrice(dis)
  }
  const { handleBlur, handleChange, values: { endDate, startDate, priceTitle } } = CustomAccountPriceQuoteFormik({ onsubmit: handleAccountPriceSubmit })

  // radion button setup
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRadioValue((event.target as HTMLInputElement).value);
  };
  const disableAddButtonIfOneInPending = (): boolean => {
    return allAccountPricesCreated?.find((aacpc: any) => aacpc.status === "Pending")
  }
  // handle discount group discount 
  const handleDiscountgroupDropdown = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // [e.target.name]=e.target.value
    const { value } = discountgroupNames.find((dg: any) => dg.value == e.target.value)
    setSelectedDG(value)
    setDgDropdown(e.target.value)
    console.log("set dg dropdow  ---> ", selectedDG, e.target.value, discountgroupNames)
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
              <CustomizedAccordions accordionType='account-price' discountPrice={discountPrice} proposedPrice={proposedPrice} allAccountPricesCreated={allAccountPricesCreated} proposedPriceFromData={proposedPriceFromData} />
            </div>
        }
      </Paper>
      <CustomFullModal handleClose={handleClose} open={open} modalName='Account Price' footerButtonName='Submit for approval' styles={{ minWidth: 1000 }} onSubmit={handleAccountPriceSubmit}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', margin: 12 }}>
            <div style={{ display: 'flex' }}>
              {/* Price list type */}
              <CustomizedRadios radioValue={radioValue} handleChange={handleRadioChange} title="Price List" options={[{ label: "Matrix Pricing", value: "Matrix Pricing" }, { label: "Pre approved pricing (IDN contracts, 1124)", value: "Pre approved pricing (IDN contracts, 1124)" }]} />
            </div>
            <div style={{ width: '49%' }}>
              <CustomInput value={priceTitle} handleChange={handleChange} name='priceTitle' type='text' placeholder='Price list title' style={{ width: '50%' }} />
              {
                radioValue === 'Matrix Pricing' ? '' :
                  <CustomDropdown
                    handleChange={handleDiscountgroupDropdown}
                    data={discountgroupNames}
                    name='discount-group'
                    value={dgDropdown}
                  />
              }
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', margin: 12 }}>
            <div style={{ width: '48%' }}>
              {/* <CustomInput value={startDate} handleChange={handleChange} name='startDate' type='text' placeholder='Start Date' style={{ width: '100%' }} /> */}
              <CustomDatePicker label='Start Date' name='startDate' value={date.startDate}
                handleDateChange={
                  (newValue: string) => setDate({
                    ...date,
                    startDate: newValue
                  })} />
            </div>
            <div style={{ width: '49%' }}>
              <CustomDatePicker label='End Date' name='endDate' value={date.endDate}
                handleDateChange={
                  (newValue: string) => setDate({
                    ...date,
                    endDate: newValue
                  })}
              />
              {/* <CustomInput value={endDate} handleChange={handleChange} name='endDate' type='text' placeholder='End Date' style={{ width: '100%' }} /> */}
            </div>
          </div>
          {radioValue === 'Matrix Pricing' ? (
            proposedPrice && proposedPriceFromData?.length > 0 ? <AccountPriceTable style={{ margin: 10, minHeight: 99 }} discountPrice={discountPrice} proposedPrice={proposedPrice} proposedPriceFromData={proposedPriceFromData} handleProposedData={handleProposedData} /> : <Loading />)
            : dgDropdown && <DisocuntGroupDetailTable discountProductWithPrices={discountPrices} />
          }
        </div>
      </CustomFullModal>
    </div>
  )
}

export default AccountPrice
