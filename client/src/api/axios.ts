import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL;

export const apiRoutes = axios.create({ baseURL: baseURL.toString() });

export const apiProtectedRoutes = axios.create({ 
  baseURL: baseURL,  
  withCredentials: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
  },
})