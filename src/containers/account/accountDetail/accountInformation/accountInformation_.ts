import { PaymentTermsEnum } from "../../UseAccountFormik";


export interface AccountInformationType_ {
  hcpNpi: string | number;
  taxId: string | number;
  dun: string | number;
  hcpName: string | number;
  zip: string | number;
  name: string;
  attention: string;
  ein: string;
  phone: string;
  email: string;
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  state: string;
  country: string;
  city: string;
  paymentType: PaymentTermsEnum;
  accountStatus: string;
  apPhone: number;
  apEmail: string;
}

