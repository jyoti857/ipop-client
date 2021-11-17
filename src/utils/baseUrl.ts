import axios from 'axios';


const api = axios.create({
  baseURL: 'http://localhost:3000/'
});


export const getAccountList = () => {
  return api.get('/account').then(async (res: any)=> {
    console.log("data 00--> ", res.data);
    if(await localStorage.getItem('token')){
      return res.data
    }
  });
}

export const getAccountById = (id: string) =>{
  return api.get(`/account/${id}`).then((res: any) => {
    return res.data;
  })
}

export const updateAccountById = (id: string, body: any) => {
  return api.put(`/account/${id}`, {...body}).then((res: any) => {
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