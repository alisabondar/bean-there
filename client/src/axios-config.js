import axios from 'axios';

const instance = axios.create({
  baseURL: `http://localhost:${import.meta.env.VITE_PORT}`
});

export default instance;