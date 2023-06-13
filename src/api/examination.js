import { api } from './config'

export const getAllExaminations = async (type) => {
    try {
        const response = await api.get(`/examinations?type=${type}`);
        console.log(response.data);
        return response.data
    } catch (error) {
        console.log("get all examinations failed");
        console.log(error);
        return null;
    }
}

export const createExamination = async (name, description, type, timeLimit) => {
    try {
        const response = await api.post("/examinations", {
            name,
            description,
            timeLimit,
            type
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log("Create Examination Failed");
        console.log(error);
        return null;
    }
}

export const createExercises = async (examination) => {
    try {
        const types = ['Listening 1', 'Listening 2', 'Listening 3', 'Reading 1', 'Reading 2', 'Writing'];
        types.forEach(type => {
            api.post('/exercises', {
                type,
                examination
            })
        });
    } catch (error) {
        console.log(error);
    }
}

export const getExercises = async (id, setExercises) => {
    try {
        const response = await api.get(`/examinations/${id}`);
        console.log(response.data);
        setExercises(response.data.data.exercises)
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const postQuestion = async (data) => {
    try {
        const response = await api.post(`/questions`, { ...data })
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const updateParagraph = async (id, paragraph) => {
    try {
        const response = await api.put(`/exercises/${id}`, { paragraph })
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}