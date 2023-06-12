import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

// @mui
import {
    Button,
    TextField,
    RadioGroup,
    FormControlLabel,
    Radio,
} from '@mui/material';

export default function Listening(props) {
    const [question, setQuestion] = useState("");
    const [answer1, setAnswer1] = useState({});
    const [answer2, setAnswer2] = useState({});
    const [answer3, setAnswer3] = useState({});

    const onChangeAnswer = (event, index) => {
    }
    const onSubmit = () => {
        console.log(question);
        console.log(answer1);
        console.log(answer2);
        console.log(answer3);
    }

    return (
        <>
            <TextField label='Question 1' name='question' onChange={event => setQuestion(event.target.value)} />
            <RadioGroup
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="radio-buttons-group"
            >
                <div>
                    <TextField label='answer' onChange={event => setAnswer1({ content: event.target.value })} control={<Radio />} style={{ width: 450 }} />
                    <FormControlLabel value="A" control={<Radio />} />
                </div>
                <div>
                    <TextField label='answer' onChange={event => setAnswer2({ content: event.target.value })} control={<Radio />} style={{ width: 450 }} />
                    <FormControlLabel value="B" control={<Radio />} />
                </div>
                <div>
                    <TextField label='answer' onChange={event => setAnswer3({ content: event.target.value })} control={<Radio />} style={{ width: 450 }} />
                    <FormControlLabel value="male" control={<Radio />} />
                </div>
            </RadioGroup>
            <Button variant="contained" onClick={onSubmit}>Add</Button>
        </>
    )
}
