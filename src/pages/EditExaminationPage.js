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
  }, []);


  return (
    <>
      <Container />
    </>
  )
}
