import axios from 'axios';

const token = window.localStorage.getItem('livememo-token');

export const api = axios.create({
    baseURL: 'http://localhost:4000/api/user',
    headers: {
      'Content-Type': 'application/json',
      'authorization': token ? `Bearer ${token}` : ''
    }
});

export const baseUrl = 'http://localhost:4000/';
  
