import { Button, Divider, Paper } from '@mui/material';
import { ReactElement, useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom'
import { useStyles } from './styles'
import AccountTabs from './accountTabs';
import AccountInformation from './accountInformation';
import SupportingDocuments from './supportingDocuments';
import Purchaser from './purchaser';
import AccountPrice from './accountPrice';
import Quotes from './quotes';
import { useQuery } from 'react-query';
import { getAccountById } from '../../../utils/baseUrl';
import CreaditInformation from './creditInformation';
import { PaymentTermsEnum } from '../UseAccountFormik';
import { onApproveToAwaitingICSAction, updateToExternal3PlIdToApprove } from '../actions';
import { AccountStatusEnum } from '../../../types/accounts/AccountStatusEnum';
import { FaHospital, FaHospitalUser } from 'react-icons/fa';
import Orders from './orders';

export type AccountStatusColorType = 'APPROVED' | 'CRDREV' | 'PENDING' | 'FINANCEREV' | 'ICSCONF'
export const AccountStatusColorMapper = {
  APPROVED: "#C0FBAD",
  CRDREV: "#D2AEE0",
  PENDING: "#AEBDE0",
  FINANCEREV: "#E0CDAE",
  ICSCONF: '#AED9E0'
}
interface Props {
  accountName: string;
  ein: string;
  phone: string;
  email: string;
}
export type AccountDetailType = {
  name: string;
  attention: number;
  ein: string;
}

const accountTabs = [
  { label: "Account Information", code: "AccountInformation", idx: 0 },
  { label: "Credit Information", code: "CreditInformation", idx: 1 },
  { label: "Supporting Documents", code: "SupportingDocuments", idx: 2 },
  { label: "Purchaser", code: "Purchaser", idx: 3 },
  { label: "Account Price", code: "AccountPrice", idx: 4 },
  { label: "Quotes", code: "Quotes", idx: 5 },
  { label: "Orders", code: "Orders", idx: 6 },
]
function AccountDetail(): ReactElement {
  const [tabName, setTabName] = useState('AccountInformation');
  const params = useParams<{ accountId: string }>();
  const account = useSelector(({ accountReducers }: any) => accountReducers, shallowEqual)
  const { data } = useQuery(['accountInformation', params.accountId], () => getAccountById(params.accountId),
    { enabled: Boolean(params.accountId) }
  )
  const [value, setValue] = useState(0)
  const dispatch = useDispatch();
  const onApprove = () => {
    console.log("awaiting ics on approve")
    dispatch(onApproveToAwaitingICSAction(params.accountId))
  }
  const handleChange = (e: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
    setTabName(accountTabs.find(c => c.idx === newValue)?.code!)
  }
  const payload = {
    external3plId: "ICS-ID-867C95A2",
    accountStatus: AccountStatusEnum.APPROVED,
    accountId: params.accountId
  }
  const handleSubmitForApproval = () => {
    console.log("handle awaiting ---> ", payload)
    dispatch(updateToExternal3PlIdToApprove(payload))
  }
  function showTabPage(tabName: string): ReactElement {
    switch (tabName) {
      case 'AccountInformation': {
        return <AccountInformation />
      }
      case 'SupportingDocuments': {
        return <SupportingDocuments />
      }
      case 'Purchaser': {
        return <Purchaser />
      }
      case 'AccountPrice': {
        return <AccountPrice />
      }
      case 'Quotes': {
        return <Quotes />
      }
      case "CreditInformation": {
        return <CreaditInformation />
      }
      case "Orders": {
        return <Orders />
      }
      default: return <div style={{ height: 23, width: 160, margin: '80px auto', alignSelf: 'center', backgroundColor: 'green', color: 'white', display: 'flex', borderRadius: 2 }}>Under development</div> // <SupportingDocuments />
    }
  }
  console.log("use selector ***", account, data)
  return (
    <div style={{ marginTop: 23 }}>
      <Paper style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '99%',
        boxShadow: '0px 48px 100px 0px #110c2e', margin: 8, padding: 10
      }}>
        <div style={{ width: '40%' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
            <div style={{ display: 'flex' }}>
              <FaHospitalUser style={{ width: 60, height: 60, marginLeft: 18, color: AccountStatusColorMapper[String(data?.accountStatus) as AccountStatusColorType] }} />
              <div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ marginLeft: 12, marginRight: 12, fontSize: 20, fontWeight: 'bolder' }}>{account?.name || data?.name}</div>
                  <div style={{ backgroundColor: AccountStatusColorMapper[String(data?.accountStatus) as AccountStatusColorType], padding: 8, borderRadius: 8, fontFamily: 'sans-serif', fontSize: 14, textAlign: 'end' }}>{account?.accountStatus || data?.accountStatus}</div>
                </div>
                <div style={{ display: 'flex', marginLeft: 12, justifyContent: 'flex-start' }}>
                  <div>{account?.addressLine1 || data?.addressLine1},</div>
                  <div>{account?.addressLine2 || data?.addressLine2},</div>
                  <div>{account?.city || data?.city},</div>
                  <div>{account?.state || data?.state},</div>
                  <div>{account?.zip || data?.zip},</div>
                  <div>{account?.country || data?.country}</div>
                </div>
              </div>
            </div>
            <div>
            </div>
          </div>
        </div>
        <div style={{ width: '100%' }}>
          {
            data?.accountStatus === AccountStatusEnum.FINANCEREV ?
              <div style={{ display: 'flex', width: "94%", justifyContent: 'flex-end', gap: 6, backgroundColor: 'transparent' }}>
                <Button
                  disabled={(account?.financeDetails.creditLimit === 0) || Object.keys(account.financeDetails).length === 0}
                  variant='contained'
                  color='primary'
                  onClick={onApprove}
                >Approve</Button>

                <Button
                  disabled={account.financeDetails.creditLimit !== 0}
                  variant='outlined'
                  color='secondary'
                >Reject</Button>
              </div>
              : ''
          }
        </div>
        <div style={{ width: '20%' }}>
          {data?.paymentType === PaymentTermsEnum.PREPAID || data?.accountStatus === AccountStatusEnum.ICSCONF
            //  || (account?.accountStatus === "Awaiting for ICS Confirmation" && data?.paymentType === PaymentTermsEnum.NET45) 
            ?
            <Button
              variant='contained'
              color='primary'
              onClick={handleSubmitForApproval}
            >Submit for approval</Button> : ''
          }
        </div>
      </Paper>
      <AccountTabs tabs={accountTabs} tab={tabName} value={value} handleChange={handleChange} />
      {showTabPage(tabName)}
    </div>
  )
}

export default AccountDetail