import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

// @mui
import {
  Card,
  MenuItem,
  Container,
  TextField,
  Box,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Checkbox,
  IconButton,
} from '@mui/material';
// components
import Listening from '../components/Listening';
import Reading1 from '../components/Reading1';
import Reading2 from '../components/Reading2';
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
import Iconify from '../components/iconify';
import * as examinationAPI from '../api/examination';

const TABLE_HEAD = [
  { id: 'question', label: 'Question Content', alignRight: false },
  { id: 'point', label: 'Point', alignRight: false },
  { id: 'answer1', label: 'Answer', alignRight: false },
  { id: 'answer2', label: 'Answer', alignRight: false },
  { id: 'answer3', label: 'Answer', alignRight: false },
  {},
]

export default function CreateExaminationPage() {
  const params = useParams();
  const [type, setType] = useState('');
  const [currentExercise, setCurrentExercise] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [category, setCategory] = useState(null);
  const [data, setData] = useState([])
  const [id, setId] = useState(null);
  const [open, setOpen] = useState(null);

  useEffect(() => {
    examinationAPI.getExercises(params.id, setExercises);
  }, []);

  const render = (type) => {
    switch (type) {
      case "Listening 1":
        return <Listening exercise={currentExercise} category={category} setData={handleQuestionResponse} />;
      case "Listening 2":
        return <Listening exercise={currentExercise} category={category} setData={handleQuestionResponse} />;
      case "Listening 3":
        return <Listening exercise={currentExercise} category={category} setData={handleQuestionResponse} />;
      case "Reading 1":
        return <Reading1 exercise={currentExercise} category={category} setData={handleQuestionResponse} />;
      case "Reading 2":
        return <Reading2 exercise={currentExercise} category={category} setData={handleQuestionResponse} />;
      default:
        return <Listening exercise={currentExercise} category={category} setData={handleQuestionResponse} />;
    }
  }

  const onChangeExercise = (event) => {
    const type = event.target.value;
    setType(type)
    const currentExercise = exercises?.find(exercise => exercise.type === type)
    setCurrentExercise(currentExercise)
    if (type.includes('Listening')) {
      setCategory('Listening')
    } else if (type.includes('Reading')) {
      setCategory('Reading')
    }
    if (currentExercise) {
      setData(currentExercise)
      console.log(currentExercise);
    }
  }

  const handleOpenMenu = (event) => {
    console.log(event.currentTarget.id);
    setId(event.currentTarget.id);
    setOpen(event.currentTarget);
  };

  const handleQuestionResponse = (response) => {
    setData({
      ...data,
      questions: [
        ...data.questions,
        response.data
      ]
    })

  }

  return (
    <>
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
        <Card>

          <Table>
            <UserListHead
              headLabel={TABLE_HEAD}
              rowCount={exercises.length}
            />
            <TableBody>
              {data?.questions?.map((item) => (
                <TableRow hover key={item.id} tabIndex={-1} role="checkbox">
                  <TableCell padding="checkbox">
                    <Checkbox />
                  </TableCell>
                  <TableCell>{item.question}</TableCell>
                  <TableCell>{item.point}</TableCell>
                  {item.options.map((option) => {
                    if (option.isCorrect)
                      return <TableCell className='text-success'>{option.content}</TableCell>
                    return <TableCell>{option.content}</TableCell>

                  })}
                  <TableCell align="right">
                    <IconButton id={item.id} size="large" color="inherit" onClick={handleOpenMenu}>
                      <Iconify icon={'eva:more-vertical-fill'} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </Container >
    </>
  )
}
