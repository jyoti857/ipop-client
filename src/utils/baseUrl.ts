import axios from 'axios';

const s  = () => localStorage.getItem('token')!
const api = axios.create({
  baseURL: 'http://localhost:3000/',
  headers: {
    'Authorization': s()
  }
});
// axios.defaults.headers.common = {'Authorization': s()}
export default axios;


export const getAccountList = () => {
  return api.get('/user/currentUser').then(async (res: any)=> {
    console.log("data 00--> ", res.data);
    // if(await localStorage.getItem('token')){
      return res.data
    // }
  });
}

export const getAccountById = (id: string) =>{
  return api.get(`/account/${id}`).then((res: any) => {
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

export const createDiscountPrice = ({name, startDate, endDate, desc}: any) => {
  return api.post('/discount-price', {name, startDate, endDate, desc}).then((res: any) => {
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