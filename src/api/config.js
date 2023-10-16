import axios from 'axios';

// const URL = `http://localhost:3000/api/v1`
const URL = `${process.env.REACT_APP_BACKEND_URL}/api/v1`
export const api = axios.create({
    baseURL: URL
})
