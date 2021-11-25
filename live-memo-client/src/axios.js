import axios from 'axios';

const token = window.localStorage.getItem('livememo-token');

export const api = axios.create({
    // baseURL: 'http://localhost:4000/api',
    baseURL: 'https://livememo-backend.herokuapp.com/api',
    headers: {
      'Content-Type': 'application/json',
      'authorization': token ? `Bearer ${token}` : ''
    }
});

export const baseUrl = 'https://livememo-backend.herokuapp.com/';
  
