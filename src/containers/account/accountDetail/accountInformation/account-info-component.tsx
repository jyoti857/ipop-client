import { Button, Divider, Paper } from '@mui/material'
import React, { ReactElement, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import CustomInput from '../../../../components/input/CustomInput';
import { updateOneAccountAction } from '../../actions';
import { PaymentTermsEnum } from '../../UseAccountFormik';
import { AccountInformationType_ } from './accountInformation_';
import { useStyles } from './styles'
interface Props {
  data: any;
  isLoading: boolean
}

function AccountInfoComponent({ data, isLoading }: Props): ReactElement {
  const classes = useStyles();
  const [clinicPhysicianLicenseNumber, setClinicPhysicianLicenseNumber] = useState('')
  const [addressLine2, setAddressLine2] = useState(data?.addressLine2)
  const [addressLine3, setAddressLine3] = useState(data?.addressLine3)
  const [hcpName, setHcpName] = useState(data?.hcpName)
  const [hcpNpi, setHcpNpi] = useState(data?.hcpNp)
  const [state, setState] = useState("")
  const [zipcode, setZipcode] = useState("")
  const [apPhone, setApPhone] = useState("")
  const [apEmail, setApEmail] = useState("")
  const [taxId, setTaxId] = useState("")
  const [dun, setDun] = useState("")
  const [attention, setAttention] = useState("")


  console.log("data1 *& --> ", data)
  const [updateFlag, setUpdateFlag] = useState(false);

  const dispatch = useDispatch()

  const onSubmit = () => {
    console.log("submit from update account!")
    dispatch(updateOneAccountAction({
      ...acc,
      hcpName,
      hcpNpi,
      addressLine2,
      apPhone,
      apEmail,
      accountId: data._id
    }))
  }
  const [acc, setAcc] = useState<AccountInformationType_>(() => ({
    addressLine1: data?.addressLine1,
    attention: data?.attention,
    country: data?.country,
    ein: data?.ein,
    email: data?.email,
    name: data?.name,
    phone: data?.phone,
    state: data?.state,
    addressLine2: data?.addressLine2,
    addressLine3: data?.addressLine3,
    city: data?.city,
    paymentType: data?.paymentTerms || PaymentTermsEnum.NET45,
    accountStatus: data?.accountStatus,
    zip: data?.zip,
    apPhone: data?.apPhone,
    apEmail: data?.apEmail
  }))
  useEffect(() => {
    const s = () => ({
      addressLine1: data?.addressLine1,
      attention: data?.attention,
      country: data?.country,
      ein: data?.ein,
      email: data?.email,
      name: data?.name,
      phone: data?.phone,
      state: data?.state,
      addressLine2: data?.addressLine2,
      addressLine3: data?.addressLine3,
      city: data?.city,
      paymentType: data?.paymentTerms || PaymentTermsEnum.NET45,
      accountStatus: data?.accountStatus,
      zip: data?.zip,
      apPhone: data?.apPhone,
      apEmail: data?.apEmail
    })
    setAcc(s())
  }, [data])
  console.log("acc *& --> ", acc)
  {
    return (
      isLoading ? (<>Loading</>) : 
        <div>
          {!isLoading ?
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
                    value={clinicPhysicianLicenseNumber}
                name='Clinic/ Physician License Number'
                type='text'
                placeholder=''
                classNames={classes.fields}
                    handleChange={(e: React.ChangeEvent<any>) => setClinicPhysicianLicenseNumber(e.target.value)}
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
                    type='number'
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
                    type='email'
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
                    value={hcpName}
                name='hcpname'
                type='text'
                placeholder=''
                classNames={classes.fields}
                    handleChange={(e: React.ChangeEvent<any>) => setHcpName(e.target.value)}
                style={{ margin: 10 }}
              />
            </div>
            <div className={classes.inputWrap}>
              <label className={classes.label}>Affiliated HCP NPI #</label>
              <CustomInput
                    value={hcpNpi}
                name='hcpnpi'
                type='text'
                placeholder=''
                classNames={classes.fields}
                    handleChange={(e: React.ChangeEvent<any>) => setHcpNpi(e.target.value)}
                style={{ margin: 10 }}
              />
            </div>
          </div>
          <Divider style={{ marginTop: 23, marginBottom: 12 }} />
          <div className={classes.rowWrap}>
            <div className={classes.inputWrap}>
                  <label className={classes.label}>Ship To Street 1*</label>
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
                    value={addressLine2}
                name='addressline2'
                type='text'
                placeholder=''
                classNames={classes.fields}
                    handleChange={(e: React.ChangeEvent<any>) => setAddressLine2(e.target.value)}
                style={{ margin: 10 }}
              />
            </div>
          </div>
          <div className={classes.rowWrap}>
            <div className={classes.inputWrap}>
              <label className={classes.label}>Ship To Street 3</label>
              <CustomInput
                    value={addressLine3}
                name='addressline3'
                type='text'
                placeholder=''
                classNames={classes.fields}
                    handleChange={(e: React.ChangeEvent<any>) => setAddressLine3(e.target.value)}
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
                    value={acc.state}
                    name='state'
                    type='text'
                    placeholder=''
                    classNames={classes.fields}
                    handleChange={(e: React.ChangeEvent<any>) => setAcc({ ...acc, state: e.target.value })}
                    style={{ margin: 10 }}
                  />
            </div>
            <div className={classes.inputWrap}>
              <label className={classes.label}>Ship To Zip Code *</label>
              <CustomInput
                    value={acc.zip}
                    name='zipcode'
                    type='text'
                    placeholder=''
                    classNames={classes.fields}
                    handleChange={(e: React.ChangeEvent<any>) => setAcc({ ...acc, zip: e.target.value })}
                    style={{ margin: 10 }}
                  />
            </div>
          </div>
          <div className={classes.rowWrap}>
            <div className={classes.inputWrap}>
              <label className={classes.label}>Ship To AP Contact Phone *</label>
              <CustomInput
                    value={apPhone}
                    name='apPhone'
                    type='number'
                    placeholder=''
                    classNames={classes.fields}
                    handleChange={(e: React.ChangeEvent<any>) => setApPhone(e.target.value)}
                    style={{ margin: 10 }}
                  />
            </div>
            <div className={classes.inputWrap}>
              <label className={classes.label}>Ship To AP Contact Email *</label>
              <CustomInput
                    value={apEmail}
                name='apemail'
                    type='email'
                placeholder=''
                classNames={classes.fields}
                    handleChange={(e: React.ChangeEvent<any>) => setApEmail(e.target.value)}
                style={{ margin: 10 }}
              />
            </div>
          </div>
          <div className={classes.rowWrap}>
            <div className={classes.inputWrap}>
              <label className={classes.label}>EIN/Tax ID of Financially Responsible Entity *</label>
              <CustomInput
                    value={taxId}
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
                    value={dun}
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
}

export default AccountInfoComponent
