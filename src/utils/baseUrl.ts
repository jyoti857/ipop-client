import axios from 'axios';

const s  = () => localStorage.getItem('token')!
const api = axios.create({
  baseURL: 'http://localhost:3003/',
  headers: {
    'Authorization': localStorage.getItem('token')! //s()
  }
});
// axios.defaults.headers.common = {'Authorization': s()}
export default axios;

// users 
export const getUserList = async () => {
  try{
    const result = await api.get('/user/')
    console.log("result user ---> ", result);
    return result.data;
  }catch(e){
    throw new Error("user, error caught from baseUrl.ts file")
  }
}


export const getAccountList = async () => {
  const result = await api.get('/user/currentUser', {
    headers: {
      'Authorization':  localStorage.getItem('token')!
    }
  });
  const res = result.data as unknown as any[];
  console.log("from usequery ---> ", res)
  return res;
} 

export const getAccountById = (id: string) =>{
  return api.get(`/account/${id}`).then((res: any) => {
    console.log("account fin 000> ", res.data)
    return res.data;
  })
}
export const updateAccountById = (id: string, body: any) => {
  return api.put(`/account/${id}`, {
    ...body, 
    // headers: config.headers
  }).then((res: any) => {
    return res.data;
  })
}

export const getAllProducts = () => {
  return api.get('/product').then((res: any) => {
    console.log("utils data sopw --->", res.data)
    return res.data;
  })
}

export const createProduct = (body: any) => {
  return api.post('/product/', {...body}).then((res: any) => {
    return res.data;
  })
}

export const updateProductById = (id: string, body: any) => {
  return api.put(`/product/${id}`, {...body}).then((res: any) => {
    return res.data;
  })
}

export const createAccountPrice = ( {id, ...body}: any) => {
  return api.post(`/account-price/${id}`, {...body}).then((res: any) => {
    return res.data;
  })
}

export const getAllAccountPricesByAccountId = (id: string) => {
  return api.get(`/account-price/${id}`).then((res: any) => {
    console.log("utils account prices by account id --->", res.data)
    return res.data;
  })
}

export const getAllDiscountPrices = () => {
  return api.get('/discount-price').then((res: any) => {
    console.log('utils discount prices ', res.data)
    return res.data;
  })
}

export const createDiscountPrice = ({name, startDate, endDate, desc, discountPriceList}: any) => {
  return api.post('/discount-price', {name, startDate, endDate, desc, discountPriceList}).then((res: any) => {
    console.log("utils create discount price ---> ", res.data)
    return res.data || ''
  })
}

export const getAccountPricesByAccountId = (accountId: string) => {
  return api.get(`/account-price/${accountId}`).then((res: any) => {
    console.log("get account prices by account id ----> ", res.data)
    return res.data || ''
  })
}

export const approveAccountPrice = (accountPriceId: string) => {
  return api.put(`/account-price/approve`, {accountPriceId} ).then((res: any) => {
    return res.data
  })
}

export const createQuote = async (payload: any) => {
  const {accountId, ...rest} = payload
  console.log("account id and rest ** ---> ", accountId, rest)
  try{
    const res = await api.post(`/quote/${accountId}`, rest)
    console.log("res****** ", res)
  }catch(err){
    console.log("err -----> ", err)
    console.log("res****** ", err)
  }
}

export const getQuotes = async() => {
  try{
    const res = await api.get('/quote')
    return res.data
  }catch(err){
    console.log("err in get quotes ---> ", err)
  }
}
export const getQuotesByAccountId = async(accountId: string) => {
  try{
    const res = await api.get(`/quote/${accountId}`)
    return res.data
  }catch(err){
    console.log("err in get quotes ---> ", err)
  }
}

export const getOrdersByAccountId = async(accountId: string) => {
  try{
    const res = await api.get(`/order/${accountId}`)
    return res.data
  }catch(err){
    console.log("err in get orders ---> ", err)
  }
}

export const createOrder = async(body: any) => {
  const {accountId, ...rest} = body
  try{
    const res = await api.post(`/order/${accountId}`, rest)
    console.log("res data create order ----> ", res.data)
    return res.data;
    
  }catch(err){
    console.log("err in create order ---> ", err)
  }
}

export const getAccountPriceInPendingStatus = async() => {
  try{
    const res = await api.get("/account-price/pending-all")
    console.log("data arr arr **", res.data)
    return res.data as any
  }catch(err){  
    console.log("err in account price in pending status")
  }
}