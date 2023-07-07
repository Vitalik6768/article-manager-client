import { useState, useEffect } from 'react';
import NavBarNew from '../components/NavBarNew';
import Cookies from 'universal-cookie';
import jwt from 'jwt-decode';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { tableCustomStyles } from '../components/TableStyle';
import AddNewUser from '../components/AddNewUser';
import DeleteIcon from '@mui/icons-material/Delete';
import columns from '../dataTables/adminColumns';
import DataTable from 'react-data-table-component';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { fetchUsersData, addNewUsers, updateUsersRole, updateUsersStatus, deleteUsers } from '../apiCalls/adminApi';

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
    setLoading(true);
    try {
      const data = await fetchUsersData(id, token);
      setBackEndData(data.users);
      console.log(data);
      setLoading(false);
    } catch (error) {
      setMessageAdmin(error)
    }
  }


  async function AddUser(dataObj, tokenCaptch) {

    try {
      const data = await addNewUsers(dataObj, tokenCaptch, token, username);
      setBackEndData(data.users);
      messageHandling('המשתמש הוסף בהצלחה', true);


    } catch (error) {
      messageHandling(error.message, false);
    }
  }


  async function updateRole(dataObj, id) {
    try {
      const data = await updateUsersRole(dataObj, id, token, username);
      setBackEndData(data.users);
      messageHandling('התפקיד עודכן בהצלחה', true);

    } catch (error) {
      messageHandling(error.message, false);

    }

  }

  async function updateStatus(dataObj, id) {
    try {
      
      const data = await updateUsersStatus(dataObj, id, token, username);
      messageHandling('סטטוס עודכן בהצלחה', true)
      setBackEndData(data.users);

    } catch (error) {
      messageHandling(error.message, false)

    }

  }

  async function deleteUser(id) {
    try {
      const data = await deleteUsers(id, username);
      messageHandling('המשתמש נמחק בהצלחה', true)
      setBackEndData(data.users);
    } catch (error) {
      messageHandling(error.message, false)

    }

  }

  function messageHandling(mesg, stat){
    setMessage(mesg);
    setSnackbarColor(stat ? 'success' : 'error');
    handleClick();
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
            columns={columns(updateStatus, updateRole, deleteUser)} data={backendData}
            
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