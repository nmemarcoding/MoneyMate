import axios from "axios";

const BASE_URL = " http://192.168.0.60:3002/api/";


export const publicRequest = (Token)=> axios.create({
  baseURL: BASE_URL,
  params: {token:Token},
});
