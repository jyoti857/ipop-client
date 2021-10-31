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