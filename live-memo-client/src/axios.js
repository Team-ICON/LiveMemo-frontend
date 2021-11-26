import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const token = localStorage.getItem('livememo-token');

export const api = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER}/api`,
  headers: {
    'Content-Type': 'application/json',
    'authorization': token ? `Bearer ${token}` : ''
  }
});

export const baseUrl = 'http://localhost:4000/';

