import { Button, Divider, Paper } from '@mui/material';
import { ReactElement, useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom'
import { useQuery } from 'react-query'
import CustomInput from '../../../../components/input/CustomInput'
import { ReducersType } from '../../../../reducers/rootReducers';
import { getAccountByIdAction } from '../../actions';
import { useStyles } from './styles'
import { getAccountById, updateAccountById } from '../../../../utils/baseUrl';
import CustomAccountForm from '../../../../utils/useCustomAccountFormik';
import AccountTabs from '../accountTabs';
interface Props {
  // accountName: string;
  // ein: string;
  // phone: string;
  // email: string;
}
export type AccountInformationType = {
  name: string;
  attention: number;
  ein: string;
}
function AccountInformation({ }: Props): ReactElement {
  const classes = useStyles();
  const history = useHistory()
  const params = useParams<{ accountId: string }>();
  const [accountInformation, setaccountInformation] = useState<AccountInformationType>()
  const dispatch = useDispatch();
  const { data } = useQuery(['accountInformation', params.accountId], () => getAccountById(params.accountId),
    { enabled: Boolean(params.accountId) }
  )
  const [name_, setName_] = useState(data?.name ? data.name : '')
  const [attention_, setAttention_] = useState(data?.attention ? data.attention : '')
  const [email_, setEmail_] = useState(data?.email ? data.email : '')
  const [ein_, setEin_] = useState(data?.ein ? data.ein : '')
  const [phone_, setphone_] = useState(data?.phone ? data.phone : '')
  const [city_, setCity_] = useState(data?.city ? data.city : '')
  const [clinicPhysicianLicenseNumber_, setClinicPhysicianLicenseNumber_] = useState('')
  const [addressLine1_, setAddressLine1_] = useState(data?.addressLine1 ? data.addressLine1 : '')
  const [addressLine2_, setAddressLine2_] = useState(data?.addressLine2 ? data.addressLine2 : '')
  const [addressLine3_, setAddressLine3_] = useState(data?.addressLine3 ? data.addressLine3 : '')
  const [hcpName_, setHcpName_] = useState(data?.hcpName ? data.hcpName : '')
  const [hcpNpi_, setHcpNpi_] = useState(data?.hcpNpi ? data.hcpNpi : '')
  const [state_, setState_] = useState("")
  const [zipcode_, setZipcode_] = useState("")
  const [apPhone_, setApPhone_] = useState("")
  const [apEmail_, setApEmail_] = useState("")
  const [taxId_, setTaxId_] = useState("")
  const [dun_, setDun_] = useState("")
  const [updateFlag, setUpdateFlag] = useState(false);

  const [count, setCount] = useState(0)

  const { data: updateFields } = useQuery('updateAccountInformation',
    () => updateAccountById(params.accountId,
      {
        name: name_,
        phone: phone_,
        city: city_,
        addressLine1: addressLine1_,
        email: email_,
        addressLine2: addressLine2_,
      }),
    { enabled: Boolean(updateFlag) }
  )

  useEffect(() => {
    setName_(data?.name)
    setphone_(data?.phone_)
    setCity_(data?.city)
    setEmail_(data?.email)
    setAddressLine1_(data?.addressLine1)
    console.log("setupdate flag sd")
    setUpdateFlag(false)
  }, [data, updateFlag])


  const onSubmit = () => {
    console.log("setupdate flag --->", updateFlag)
    setUpdateFlag(true)
  }
  const { handleChange, values } = CustomAccountForm({ onSubmit })
  return (
    <div>
      {/* <AccountTabs /> */}
      {data?.name ?
        <Paper className={classes.paper} style={{ position: 'relative' }}>
          <Button
            style={{ position: 'absolute', top: 10, right: 10, marginBottom: 12 }}
            type='submit'
            onClick={onSubmit}
            disabled={updateFlag}
          >Save</Button>
          <Divider style={{ marginTop: 43, marginBottom: 12 }} />
          <div className={classes.rowWrap}>
            <div className={classes.inputWrap}>
              <label className={classes.label}>Account Name</label>
              <CustomInput
                value={name_}
                handleChange={(e: React.ChangeEvent<any>) => setName_(e.target.value)}
                name='accountName'
                type='text'
                placeholder=''
                classNames={classes.fields}
              />
            </div>
            <div className={classes.inputWrap}>
              <label className={classes.label}>Attention</label>
              <CustomInput
                value={attention_}
                name='attention'
                type='text'
                placeholder=''
                classNames={classes.fields}
                handleChange={(e: React.ChangeEvent<any>) => setAttention_(e.target.value)}
              />
            </div>
          </div>
          <div className={classes.rowWrap}>
            <div className={classes.inputWrap}>
              <label className={classes.label}>Clinic/ Physician License Number</label>
              <CustomInput
                value={clinicPhysicianLicenseNumber_}
                name='Clinic/ Physician License Number'
                type='text'
                placeholder=''
                classNames={classes.fields}
                handleChange={(e: React.ChangeEvent<any>) => setClinicPhysicianLicenseNumber_(e.target.value)}
              />
            </div>
            <div className={classes.inputWrap}>
              <label className={classes.label}>EIN #</label>
              <CustomInput
                value={ein_}
                name='ein'
                type='text'
                placeholder=''
                classNames={classes.fields}
                handleChange={(e: React.ChangeEvent<any>) => setEin_(e.target.value)}
              />
            </div>
          </div>
          <div className={classes.rowWrap}>
            <div className={classes.inputWrap}>
              <label className={classes.label}>Phone</label>
              <CustomInput
                value={phone_}
                name='phone'
                type='text'
                placeholder=''
                classNames={classes.fields}
                handleChange={(e: React.ChangeEvent<any>) => setphone_(e.target.value)}
              />
            </div>
            <div className={classes.inputWrap}>
              <label className={classes.label}>Email</label>
              <CustomInput
                value={email_}
                name='email'
                type='text'
                placeholder=''
                classNames={classes.fields}
                handleChange={(e: React.ChangeEvent<any>) => setEmail_(e.target.value)}
              />
            </div>
          </div>
          <div className={classes.rowWrap}>
            <div className={classes.inputWrap}>
              <label className={classes.label}>Affiliated HCP Name</label>
              <CustomInput
                value={hcpName_}
                name='hcpname'
                type='text'
                placeholder=''
                classNames={classes.fields}
                handleChange={(e: React.ChangeEvent<any>) => setHcpName_(e.target.value)}
              />
            </div>
            <div className={classes.inputWrap}>
              <label className={classes.label}>Affiliated HCP NPI #</label>
              <CustomInput
                value={hcpNpi_}
                name='hcpnpi'
                type='text'
                placeholder=''
                classNames={classes.fields}
                handleChange={(e: React.ChangeEvent<any>) => setHcpNpi_(e.target.value)}
              />
            </div>
          </div>
          <Divider style={{ marginTop: 23, marginBottom: 12 }} />
          <div className={classes.rowWrap}>
            <div className={classes.inputWrap}>
              <label className={classes.label}>Ship To Street 1 *</label>
              <CustomInput
                value={addressLine1_}
                name='addressline1'
                type='text'
                placeholder=''
                classNames={classes.fields}
                handleChange={(e: React.ChangeEvent<any>) => setAddressLine1_(e.target.value)}
              />
            </div>
            <div className={classes.inputWrap}>
              <label className={classes.label}>Ship To Street 2</label>
              <CustomInput
                value={addressLine2_}
                name='addressline2'
                type='text'
                placeholder=''
                classNames={classes.fields}
                handleChange={(e: React.ChangeEvent<any>) => setAddressLine2_(e.target.value)}
              />
            </div>
          </div>
          <div className={classes.rowWrap}>
            <div className={classes.inputWrap}>
              <label className={classes.label}>Ship To Street 3</label>
              <CustomInput
                value={addressLine3_}
                name='addressline3'
                type='text'
                placeholder=''
                classNames={classes.fields}
                handleChange={(e: React.ChangeEvent<any>) => setAddressLine3_(e.target.value)}
              />
            </div>
            <div className={classes.inputWrap}>
              <label className={classes.label}>Ship To City *</label>
              <CustomInput
                value={city_}
                name='city'
                type='text'
                placeholder=''
                classNames={classes.fields}
                handleChange={(e: React.ChangeEvent<any>) => setCity_(e.target.value)}
              />
            </div>
          </div>
          <div className={classes.rowWrap}>
            <div className={classes.inputWrap}>
              <label className={classes.label}>Ship To State *</label>
              <CustomInput
                value={state_}
                name='state'
                type='text'
                placeholder=''
                classNames={classes.fields}
              />
            </div>
            <div className={classes.inputWrap}>
              <label className={classes.label}>Ship To Zip Code *</label>
              <CustomInput
                value={zipcode_}
                name='zipcode'
                type='text'
                placeholder=''
                classNames={classes.fields}
              />
            </div>
          </div>
          <div className={classes.rowWrap}>
            <div className={classes.inputWrap}>
              <label className={classes.label}>Ship To AP Contact Phone *</label>
              <CustomInput
                value={apPhone_}
                name='apPhone'
                type='text'
                placeholder=''
                classNames={classes.fields}
              />
            </div>
            <div className={classes.inputWrap}>
              <label className={classes.label}>Ship To AP Contact Email *</label>
              <CustomInput
                value={apEmail_}
                name='apemail'
                type='text'
                placeholder=''
                classNames={classes.fields}
              />
            </div>
          </div>
          <div className={classes.rowWrap}>
            <div className={classes.inputWrap}>
              <label className={classes.label}>EIN/Tax ID of Financially Responsible Entity *</label>
              <CustomInput
                value={taxId_}
                name='taxid'
                type='text'
                placeholder=' '
                classNames={classes.fields}
              />
            </div>
            <div className={classes.inputWrap}>
              <label className={classes.label}>DUN #</label>
              <CustomInput
                value={dun_}
                name='dun'
                type='text'
                placeholder=''
                classNames={classes.fields}
              />
            </div>
          </div>
        </Paper>
        : <div>loading</div>
      }
    </div>
  )
}

export default AccountInformation;