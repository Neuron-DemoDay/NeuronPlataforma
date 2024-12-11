import axios from 'axios';

const api = axios.create({
    baseURL: 'https://neuron-api-emexdaavf5hab4e8.brazilsouth-01.azurewebsites.net',
});


export default api;

