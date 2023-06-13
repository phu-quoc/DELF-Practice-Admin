import React, { useState, useEffect } from 'react'

import { Helmet } from 'react-helmet-async';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  TextField,
  Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
// components
import Iconify from '../components/iconify';
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
import Scrollbar from '../components/scrollbar';
import * as examinationAPI from '../api/examination';

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' },
];

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'timeLimit', label: 'Time', alignRight: false },
  { id: 'description', label: 'Description', alignRight: false },
  {},
];

export default function ExaminationPage() {
  const navigate = useNavigate();
  const [examinations, setExaminations] = useState([]);
  const [isDisplay, setIsDisplay] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [timeLimit, setTimeLimit] = useState(25);
  const [type, setType] = useState('Full Test');
  const [id, setId] = useState(null);
  const [open, setOpen] = useState(null);

  useEffect(() => {
    getExaminations("Full Test")
  }, [])

  const getExaminations = async (type) => {
    const response = await examinationAPI.getAllExaminations(type);
    setExaminations(response.data);
  }

  const onToggleForm = () => {
    setIsDisplay(!isDisplay);
  }

  const handleDeleteItem = async () => {
  }

  const handleOpenMenu = (event) => {
    console.log(event.currentTarget.id);
    setId(event.currentTarget.id);
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const onCreateExamination = async () => {
    const response = await examinationAPI.createExamination(name, description, type, timeLimit);
    setExaminations([...examinations, response.data]);
    examinationAPI.createExercises(response.data.id)
  }

  const onEditExamination = async () => {
    navigate(`/dashboard/exams/${id}`)
  }

  return (
    <>
      <Helmet>
        <title> Dashboard: Examination | Minimal UI </title>
      </Helmet>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Examination
          </Typography>
          <Button variant="contained" onClick={onToggleForm} startIcon={<Iconify icon="eva:plus-fill" />}>
            New Examination
          </Button>
        </Stack>
        {isDisplay &&
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
              <TextField name='name' label="Examination Name" onChange={event => setName(event.target.value)} />
              <TextField name='description' label="Examination Description" onChange={event => setDescription(event.target.value)} />
              <TextField name="Time Limit" label="Time Limit" type="number" onChange={event => setTimeLimit(event.target.value)} />
              <TextField select label="Type" onChange={event => setType(event.target.value)}>
                <MenuItem value="Full Test">Full Test </MenuItem>
                <MenuItem value="Mini Test">Mini Test</MenuItem>
              </TextField>
              <Button variant="contained" onClick={onCreateExamination}>Create Examination</Button>
            </Box>
          </Card>
        }
        <Card>
          <UserListToolbar />
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  // order={order}
                  // orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={examinations.length}
                // numSelected={selected.length}
                // onRequestSort={handleRequestSort}
                // onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {examinations.map(item => (
                    <TableRow hover key={item.id} tabIndex={-1} role="checkbox">
                      <TableCell padding="checkbox">
                        <Checkbox />
                      </TableCell>

                      <TableCell component="th" scope="row" padding="none">
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <Avatar alt={{}} src={`/assets/images/grammars/grammar_default.jpg`} />
                          <Typography variant="subtitle2" noWrap>
                            {item.name}
                          </Typography>
                        </Stack>
                      </TableCell>

                      <TableCell align="left" className='bg-red-500'>{item.timeLimit}</TableCell>
                      <TableCell align="left" >{item.description}</TableCell>
                      <TableCell align="right">
                        <IconButton id={item.id} size="large" color="inherit" onClick={handleOpenMenu}>
                          <Iconify icon={'eva:more-vertical-fill'} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
        </Card>

      </Container>
      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem onClick={onEditExamination}>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem sx={{ color: 'error.main' }} onClick={handleDeleteItem}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  )
}
