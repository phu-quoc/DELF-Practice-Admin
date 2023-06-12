import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

// @mui
import {
  Card,
  Button,
  MenuItem,
  Container,
  TextField,
  Box,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
// components
import Listening from '../components/Listening';
import Reading1 from '../components/Reading1';
import Reading2 from '../components/Reading2';
import * as examinationAPI from '../api/examination';


export default function CreateExaminationPage() {
  const params = useParams();
  const [type, setType] = useState('');
  const [exerciseId, setExerciseId] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [category, setCategory] = useState(null);

  useEffect(() => {
    examinationAPI.getExercises(params.id, setExercises);
  }, []);

  useEffect(() => {
    const currentExercises = exercises?.find(exercise => exercise.type === type)
    if (type.includes('Listening')) {
      setCategory('Listening')
    } else if (type.includes('Reading')) {
      setCategory('Reading')
    }
    if (currentExercises) {
      console.log(currentExercises);
      setExerciseId(currentExercises.id)
    }
  }, [type])

  const render = (type) => {
    switch (type) {
      case "Listening 1":
        return <Listening exercise={exerciseId} category={category} />;
      case "Listening 2":
        return <Listening exercise={exerciseId} category={category} />;
      case "Listening 3":
        return <Listening exercise={exerciseId} category={category} />;
      case "Reading 1":
        return <Reading1 exercise={exerciseId} category={category} />;
      case "Reading 2":
        return <Reading2 exercise={exerciseId} category={category} />;
      default:
        return <Listening exercise={exerciseId} category={category} />;
    }
  }

  const onChangeExercise = (event) => {
    console.log(event);
    setType(event.target.value)
  }

  const onAddQuestion = () => {

  }

  return (
    <Container>
      <Card className='mb-5 py-3'>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '50ch' },
          }}
          noValidate
          autoComplete="off"
          className='d-flex flex-column align-items-center justify-content-center'
        >
          <TextField select label="Exercise" onChange={onChangeExercise}>
            <MenuItem value="Listening 1">Listening 1 </MenuItem>
            <MenuItem value="Listening 2">Listening 2 </MenuItem>
            <MenuItem value="Listening 3">Listening 3 </MenuItem>
            <MenuItem value="Reading 1">Reading 1 </MenuItem>
            <MenuItem value="Reading 2">Reading 2 </MenuItem>
          </TextField>
          {render(type)}
        </Box>
      </Card>
    </Container >
  )
}
