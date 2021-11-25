import axios from 'axios';

const token = localStorage.getItem('livememo-token');

export const api = axios.create({
  baseURL: 'http://localhost:4000/api',
  headers: {
    'Content-Type': 'application/json',
    'authorization': token ? `Bearer ${token}` : ''
  }
});

export const baseUrl = 'http://localhost:4000/';

