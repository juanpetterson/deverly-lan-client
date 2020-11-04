import axios from 'axios';

const instance = axios.create({
  baseURL: `http://10.0.3.2:5000/api`,
});

export default instance;
