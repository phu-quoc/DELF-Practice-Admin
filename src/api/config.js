import axios from 'axios';

const URL = `http://localhost:3000/api/v1`
// const URL = `https://delf-practice.onrender.com/api/v1`
export const api = axios.create({
    baseURL: URL
})
