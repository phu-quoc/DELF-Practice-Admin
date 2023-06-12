import axios from "axios";
import { api } from './config'


export const getAllUsers = async () => {
    try {
        const response = await api.get('/grammars');
        console.log(response.data)
        return response.data;
    } catch (err) {
        console.error('grammar.js: ', err);
    }
    return 0;
};

export const deleteGrammar = async (id) => {
    try {
        const response = await api.delete(`/grammars/${id}`);
        console.log(response.status)
        alert("Delete successfully!");
        return response.status;
    } catch (err) {
        console.error('grammar.js: ', err);
    }
    return 0;
};

export const createGrammar = async (data) => {
    try {
        const response = await api.post(`/grammars`, {
            grammar: data.grammar,
            content: data.content
        });
        console.log(response.data)
        return response.data;
    } catch (err) {
        console.error('grammar.js: ', err);
    }
    return 0;
};
