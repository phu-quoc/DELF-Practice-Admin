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

export default function Reading1(props) {
    const [paragraph, setParagraph] = useState(props.exercise?.paragraph)
    const [question, setQuestion] = useState("");
    const [answers, setAnswers] = useState([{}, {}, {}]);
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
            exercise: props.exercise.id,
        }
        console.log(data);
        const response = await examinationAPI.postQuestion(data);
        props.setData(response);
    }

    const onUpdateParagraph = () => {
        examinationAPI.updateParagraph(props.exercise.id, paragraph);
    }

    return (
        <>
            <TextField
                rows={5} multiline
                label='Paragraph'
                value={paragraph}
                onChange={event => setParagraph(event.target.value)} />
            <Button variant="contained" onClick={onUpdateParagraph}>Update Paragraph</Button>
            <TextField label='Question' name='question' onChange={event => setQuestion(event.target.value)} />
            <RadioGroup
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="radio-buttons-group"
                onChange={selectIsCorrect}
            >
                <div>
                    <TextField label='answer' onChange={event => onChangeAnswer(event, 0)} control={<Radio />} style={{ width: 450 }} />
                    <FormControlLabel value="0" control={<Radio />} />
                </div>
                <div>
                    <TextField label='answer' onChange={event => onChangeAnswer(event, 1)} control={<Radio />} style={{ width: 450 }} />
                    <FormControlLabel value="1" control={<Radio />} />
                </div>
                <div>
                    <TextField label='answer' onChange={event => onChangeAnswer(event, 2)} control={<Radio />} style={{ width: 450 }} />
                    <FormControlLabel value="2" control={<Radio />} />
                </div>
            </RadioGroup>
            <TextField type='number' label='Point' name='point' onChange={event => setPoint(event.target.value)} />
            <Button variant="contained" onClick={onSubmit}>Add</Button>
        </>
    )
}
