import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import {useEffect, useState} from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
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
} from '@mui/material';
// components
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
// mock
import * as grammar from '../api/grammar';


// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: '', alignRight: false },
  { id: '', alignRight: false },
  { id: '', alignRight: false },
  { id: '', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_grammar) => _grammar.grammar.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function PaymentPage() {
  const [money, setMoney] = useState(1);
  const [selectedFile, setSelectedFile] = useState();
  const [isSelected, setIsSelected] = useState(false);
  const paymentHandle = async () => {
    const token = Cookies.get('jwt');
    const response = await axios.post('http://localhost:3000/api/v1/payment/create_payment_url', {}, { headers: {
      Authorization: `Bearer ${token}`
      }});
    window.location.replace(response.data.url);
  }
  const refundHandle = async () => {
    const token = Cookies.get('jwt');
    const res = await axios.post('http://localhost:3000/api/v1/payment/refund', {
      id: '64cbd2743f951b67f5340ad7',
      transDate: 20230803231505,
      amount: 10000,
      transType: '02',
    }, { headers: {
        Authorization: `Bearer ${token}`
      }});
    alert(res.data.message);
  }

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsSelected(true);
    console.log('alo', event.target.files[0]);
  };

  const submissionHandler = async () => {
    if (isSelected) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('examination', '64e08299a4f66ec48c8c2fcd');
      const response = await axios.post('http://localhost:3000/api/v1/examinations/import-xlsx', formData);
      console.log(response.data)
    } else {
      alert('No file')
    }
  }

  const tokenHandle = async () => {
    const token = Cookies.get('jwt');
    const response = await axios.get('http://localhost:3000/api/v1/users/me', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    alert(JSON.stringify(response));
  }
  return (
    <>
      <Helmet>
        <title> Payment | Minimal UI </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Payment
          </Typography>

        </Stack>
        <Button variant="contained" onClick={paymentHandle}>
          Checkout VNPAY
        </Button>
        <Button variant="contained" onClick={refundHandle}>
          Refund VNPAY
        </Button>
        <Button variant="contained" onClick={tokenHandle}>
          Get User
        </Button>
        <Button
            variant="contained"
            component="label"
        >
          Upload File
          <input
              type="file"
              hidden
              name='file'
              onChange={changeHandler}
          />
        </Button>
        <Button variant="contained" onClick={submissionHandler}>
          Submit
        </Button>
        {isSelected ? (
            <div>
              <p>Filename: {selectedFile.name}</p>
              <p>Filetype: {selectedFile.type}</p>
              <p>Size in bytes: {selectedFile.size}</p>
              <p>
                lastModifiedDate:{' '}
                {selectedFile.lastModifiedDate.toLocaleDateString()}
              </p>
            </div>
        ) : (
            <p>Select a file to show details</p>
        )}
      </Container>


    </>
  );
}
