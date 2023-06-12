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

export default function Reading1() {
    return (
        <>
            <TextField rows={5} multiline name='paragraph' label='paragraph' />
            <RadioGroup
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="radio-buttons-group"
            >
                <div>
                    <TextField label='answer' control={<Radio />} style={{ width: 450 }} />
                    <FormControlLabel value="A" control={<Radio />} />
                </div>
                <div>
                    <TextField label='answer' control={<Radio />} style={{ width: 450 }} />
                    <FormControlLabel value="B" control={<Radio />} />
                </div>
                <div>
                    <TextField label='answer' control={<Radio />} style={{ width: 450 }} />
                    <FormControlLabel value="male" control={<Radio />} />
                </div>
            </RadioGroup>

            <Button variant="contained">Add</Button>
        </>
    )
}
