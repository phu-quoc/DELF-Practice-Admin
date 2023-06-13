import { useState, useEffect } from 'react'

// @mui
import {
    Button,
    TextField,
    RadioGroup,
    FormControlLabel,
    Radio,
} from '@mui/material';
import * as examinationAPI from '../api/examination';

export default function Reading2(props) {
    const [paragraph, setParagraph] = useState(null)
    const [question, setQuestion] = useState("");
    const [answers, setAnswers] = useState([{ content: "False" }, { content: 'True' }]);
    const [point, setPoint] = useState(null)

    const onChangeAnswer = (event, index) => {
        setAnswers(answers.map((value, idx) => {
            if (idx === index) {
                return { ...value, content: event.target.value }
            }
            return value;
        }))

    }

    const selectIsCorrect = (event) => {
        const isCorrectIndex = event.target.value;
        setAnswers(answers.map((value, index) => {
            if (index === Number(isCorrectIndex)) {
                return { ...value, isCorrect: true }
            }
            return { ...value, isCorrect: false };
        }))
    }

    const onSubmit = async () => {
        const data = {
            question,
            options: [...answers],
            point: Number(point),
            category: props.category,
            exercise: props.exercise,
        }
        console.log(data);
        const response = await examinationAPI.postQuestion(data);
        props.setData(response);
        // console.log(paragraph);
    }

    return (
        <>
            <TextField rows={5} multiline name='paragraph' label='paragraph' />
            <TextField label='Question' name='question' onChange={event => setQuestion(event.target.value)} />
            <p>Select answer is correct!</p>
            <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="radio-buttons-group"
                onChange={selectIsCorrect}
            >
                <FormControlLabel label='True' value="1" control={<Radio />} />
                <FormControlLabel label='False' value="0" control={<Radio />} />
            </RadioGroup>
            <TextField type='number' label='Point' name='point' onChange={event => setPoint(event.target.value)} />
            <Button variant="contained" onClick={onSubmit}>Add</Button>
        </>
    )
}
