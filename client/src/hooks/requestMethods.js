import axios from "axios";

const BASE_URL = " http://192.168.0.60:3002/api/";
// const BASE_URL = "https://moneymate-7ivl.onrender.com/api/";


export const publicRequest = (Token)=> axios.create({
  baseURL: BASE_URL,
  params: {token:Token},
});
