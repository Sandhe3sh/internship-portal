
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://internship-portalapi.onrender.com/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
