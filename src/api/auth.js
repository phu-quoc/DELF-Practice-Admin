import { api } from './config'

export const login = async (email, password) => {
    try {
        const response = await api.post('/users/login', {
            email,
            password
        });
        console.log(response.data)
        return response.data;
    } catch (err) {
        console.error('grammar.js: ', err);
        return 0;
    }
};
