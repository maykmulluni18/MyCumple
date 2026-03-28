import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api-cumple.doram.lat/api',
});

export default api;
