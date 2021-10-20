import axios from 'axios';


const api = axios.create({
  baseURL: 'http://localhost:3000/'
});


export const getAccountList = () => {
  return api.get('/account').then((res: any)=> {
    console.log("data 00--> ", res.data)
    return res.data
  });
}

export const getAccountById = (id: string) =>{
  return api.get(`/account/${id}`).then((res: any) => {
    return res.data;
  })
}