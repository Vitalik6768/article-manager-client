import { useState, useEffect } from 'react';
import NavBarNew from '../components/NavBarNew';
import Cookies from 'universal-cookie';
import jwt from 'jwt-decode';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { tableCustomStyles } from '../components/TableStyle';
import DropDownChangeRole from '../components/DropDownChangeRole';
import DropDownChangeStatus from '../components/DropDownChangeStatus';
import AddNewUser from '../components/AddNewUser';
import DeleteIcon from '@mui/icons-material/Delete';
import DataTable from 'react-data-table-component';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import './Admin.css';





const Admin = () => {
  const [username, setUsername] = useState('');
  const [token, setToken] = useState('');
  const [messageAdmin, setMessageAdmin] = useState('');
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);
  const [backendData, setBackEndData] = useState([]);
  const [snackbarColor, setSnackbarColor] = useState('success');
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    const cookies = new Cookies();
    const token = cookies.get('jwt_authentication');
    if (token) {
      const decodedToken = jwt(token);
      setUsername(decodedToken.id);
      setToken(token);
      getAllUsers(decodedToken.id, token);

    }

  }, []);

  async function getAllUsers(id, token) {
    const response = await fetch(`https://article-manager-api.onrender.com/admin/${id}/`, {
      headers: {
        'authorization': `Bearer ${token}`
      }
    });
    setLoading(loading = true);
    const data = await response.json();
    if (response.status == 400) {
      setMessageAdmin(data.message)
    }
    setLoading(loading = false);
    setBackEndData(data.users);


  }




  async function AddUser(dataObj, tokenCaptch) {
    console.log('data added ');
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        name: dataObj.name,
        email: dataObj.email,
        password: dataObj.password,
        passwordConfirm: dataObj.passwordConfirm,
        role: dataObj.role,
        token: tokenCaptch

      })
    };
    console.log(tokenCaptch);
    const response = await fetch(`https://article-manager-api.onrender.com/admin/${username}/register`, requestOptions);
    const data = await response.json();
    if (response.status === 400) {
      setSnackbarColor('error');
      return setMessage(data.message)
    }


    setMessage('המשתמש הוסף בהצלחה')
    setSnackbarColor('success');
    handleClick();

    setBackEndData(data.users);
  }


  async function updateRole(dataObj, id) {

    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        role: dataObj

      })
    };
    const response = await fetch(`https://article-manager-api.onrender.com/admin/${username}/update/${id}`, requestOptions);
    const data = await response.json();
    setMessage('התפקיד עודכן בהצלחה')
    setSnackbarColor('success');
    handleClick();
    setBackEndData(data.users);
  }

  async function updateStatus(dataObj, id) {
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`

      },
      body: JSON.stringify({
        status: dataObj

      })
    };
    const response = await fetch(`https://article-manager-api.onrender.com/admin/${username}/status/${id}`, requestOptions);
    const data = await response.json();
    setMessage('סטטוס עודכן בהצלחה')
    setSnackbarColor('success');
    handleClick();
    setBackEndData(data.users);
  }

  async function deleteUser(id) {

    const requestOptions = {
      method: 'DELETE'
    };
    const response = await fetch(`https://article-manager-api.onrender.com/admin/${username}/delete/${id}`, requestOptions);
    const data = await response.json();
    setMessage('המשתמש נמחק בהצלחה')
    setSnackbarColor('success');
    handleClick();
    setBackEndData(data.users);
  }



  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };



  const columns = [
    {
      name: "פעולות",
      selector: (row) => <DeleteIcon id='deleteIcon' onClick={() => deleteUser(row.id)}></DeleteIcon>,
    },

    {
      name: "סטטוס",
      selector: (row) => <DropDownChangeStatus onClick={updateStatus} id={row.id} status={row.status} />
    },
    {
      name: "תפקיד",
      selector: (row) => <DropDownChangeRole onClick={updateRole} id={row.id} status={row.role} />
    },
    {
      name: "מייל",
      selector: (row) => row.email,
    },
    {
      name: "שם משתמש",
      selector: (row) => row.name,
    },
    {
      name: "תמונה",
      selector: (row) => <Avatar src={`https://article-manager-api.onrender.com/images/${row.image}`} />,
    }
  ];





  return (
    <>
      <NavBarNew />
      <Box sx={{ height: 400, width: '100%' }}>
        <Typography variant="h3" component="h3" sx={{ textAlign: 'center', mt: 7, mb: 3 }}>
          ניהול משתמשים
        </Typography>
        <Typography variant="h3" component="h3" sx={{ textAlign: 'center', mt: 7, mb: 3 }}>
          {messageAdmin}
        </Typography>
        <Box sx={{ width: '50%', ml: 3, mb: 3, mt: 10 }}>
          <AddNewUser onSubmit={AddUser} />
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
            <CircularProgress />
          </Box>
        ) : (
          <DataTable
            customStyles={tableCustomStyles}
            columns={columns} data={backendData}
            fixedHeader
          />
        )}

      </Box>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <MuiAlert onClose={handleClose} severity={snackbarColor} sx={{ width: '100%' }}>
          {message}
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default Admin;