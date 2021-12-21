import { Button, Divider, Paper } from '@mui/material'
import React, { ReactElement, useState } from 'react'
import { useDispatch } from 'react-redux';
import CustomInput from '../../../../components/input/CustomInput';
import { updateOneAccountAction } from '../../actions';
import { PaymentTermsEnum } from '../../UseAccountFormik';
import { AccountInformationType_ } from './accountInformation_';
import { useStyles } from './styles'
interface Props {
  data: any;
}

function AccountInfoComponent({ data }: Props): ReactElement {
  const classes = useStyles();
  const [clinicPhysicianLicenseNumber_, setClinicPhysicianLicenseNumber_] = useState('')
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
  const [attention_, setAttention_] = useState("")



  const [updateFlag, setUpdateFlag] = useState(false);

  const dispatch = useDispatch()

  const onSubmit = () => {
    console.log("submit from update account!")
    dispatch(updateOneAccountAction({ ...acc, accountId: data._id }))
  }
  const [acc, setAcc] = useState<AccountInformationType_>(() => ({
    addressLine1: data?.addressLine1 ? data.addressLine1 : '',
    attention: data?.attention,
    country: data?.country,
    ein: data?.ein ? data.ein : "",
    email: data?.email ? data.email : '',
    name: data?.name ? data.name : '',
    phone: data?.phone ? data.phone : '',
    state: data?.state ? data.state : '',
    addressLine2: data?.addressLine2 ? data.addressLine2 : '',
    addressLine3: data?.addressLine3 ? data.addressLine3 : '',
    city: data?.city,
    paymentType: data?.paymentTerms || PaymentTermsEnum.NET45,
    accountStatus: data?.accountStatus
  }))

  return (
    <div>
      {data ?
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
                value={acc.name}
                handleChange={(e: React.ChangeEvent<any>) => setAcc({ ...acc, name: e.target.value })}
                name='accountName'
                type='text'
                placeholder=''
                classNames={classes.fields}
                style={{ margin: 10 }}
              />
            </div>
            <div className={classes.inputWrap}>
              <label className={classes.label}>Attention</label>
              <CustomInput
                value={acc.attention}
                name='attention'
                type='text'
                placeholder=''
                classNames={classes.fields}
                handleChange={(e: React.ChangeEvent<any>) => setAcc({ ...acc, attention: e.target.value })}
                style={{ margin: 10 }}
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
                style={{ margin: 10 }}
              />
            </div>
            <div className={classes.inputWrap}>
              <label className={classes.label}>EIN #</label>
              <CustomInput
                value={acc.ein}
                name='ein'
                type='text'
                placeholder=''
                classNames={classes.fields}
                handleChange={(e: React.ChangeEvent<any>) => setAcc({ ...acc, ein: e.target.value })}
                style={{ margin: 10 }}
              />
            </div>
          </div>
          <div className={classes.rowWrap}>
            <div className={classes.inputWrap}>
              <label className={classes.label}>Phone</label>
              <CustomInput
                value={acc.phone}
                name='phone'
                type='text'
                placeholder=''
                classNames={classes.fields}
                handleChange={(e: React.ChangeEvent<any>) => setAcc({ ...acc, phone: e.target.value })}
                style={{ margin: 10 }}
              />
            </div>
            <div className={classes.inputWrap}>
              <label className={classes.label}>Email</label>
              <CustomInput
                value={acc.email}
                name='email'
                type='text'
                placeholder=''
                classNames={classes.fields}
                handleChange={(e: React.ChangeEvent<any>) => setAcc({ ...acc, email: e.target.value })}
                style={{ margin: 10 }}
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
                style={{ margin: 10 }}
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
                style={{ margin: 10 }}
              />
            </div>
          </div>
          <Divider style={{ marginTop: 23, marginBottom: 12 }} />
          <div className={classes.rowWrap}>
            <div className={classes.inputWrap}>
              <label className={classes.label}>Ship To Street 1 *</label>
              <CustomInput
                value={acc.addressLine1}
                name='addressline1'
                type='text'
                placeholder=''
                classNames={classes.fields}
                handleChange={(e: React.ChangeEvent<any>) => setAcc({ ...acc, addressLine1: e.target.value })}
                style={{ margin: 10 }}
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
                style={{ margin: 10 }}
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
                style={{ margin: 10 }}
              />
            </div>
            <div className={classes.inputWrap}>
              <label className={classes.label}>Ship To City *</label>
              <CustomInput
                value={acc.city}
                name='city'
                type='text'
                placeholder=''
                classNames={classes.fields}
                handleChange={(e: React.ChangeEvent<any>) => setAcc({ ...acc, city: e.target.value })}
                style={{ margin: 10 }}
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
                style={{ margin: 10 }}
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
                style={{ margin: 10 }}
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
                style={{ margin: 10 }}
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
                style={{ margin: 10 }}
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
                style={{ margin: 10 }}
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
                style={{ margin: 10 }}
              />
            </div>
          </div>
        </Paper>
        : <div>loading</div>
      }
    </div>
  )
}

export default AccountInfoComponent
