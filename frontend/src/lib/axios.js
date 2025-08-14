import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.baseURL,
    withCredentials: true
});

export default api;