import axios from 'axios';

const instance = axios.create({
  baseURL: `http://192.168.15.177:5000/api`,
});

export default instance;
