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

export default function Reading2() {
    return (
        <>
            <TextField rows={5} multiline name='paragraph' label='paragraph' />
            <p>Select answer is correct!</p>
            <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="radio-buttons-group"
            >
                <FormControlLabel label='True' value="A" control={<Radio />} />
                <FormControlLabel label='False' value="B" control={<Radio />} />
            </RadioGroup>
            <Button variant="contained">Add</Button>
        </>
    )
}
