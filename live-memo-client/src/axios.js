import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const token = localStorage.getItem('livememo-token');

export const api = axios.create({
  baseURL: `https://livememo-backend.herokuapp.com/api`,
  // baseURL: `http://localhost:4000/api`,
  // baseURL: `https://livememo.shop/api`,
  headers: {
    'Content-Type': 'application/json',
    'authorization': token ? `Bearer ${token}` : ''
  }
});

// export const baseUrl = 'https://livememo.shop/';
// export const baseUrl = 'http://localhost:4000/';
export const baseUrl = 'https://livememo-backend.herokuapp.com/';

