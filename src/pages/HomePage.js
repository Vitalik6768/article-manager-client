import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import NavBarNew from '../components/NavBarNew';
import DashBordNew from '../components/DashBordNew';
import columns from '../dataTables/columns';
import DataTable from 'react-data-table-component';
import { tableCustomStyles } from '../components/TableStyle';
import SignInModel from '../components/SignInModel';
import SelectMonth from '../components/SelectMonth';
import Cookies from 'universal-cookie';
import jwt from 'jwt-decode';
import DisplayDate from '../components/DisplayDate';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { fetchData, addArticle, updateArticle, fetchDataByMonth, updateArticlesStatus } from '../apiCalls/articleApi';



function HomePage() {
  const cookies = new Cookies();
  const [userId, setUserId] = useState('');
  const [backendData, setBackEndData] = useState([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState();
  const [snackbarColor, setSnackbarColor] = useState('success');
  const [token, setToken] = useState('');
  let [loading, setLoading] = useState(true);

  const Item = styled(Paper)(({ theme }) => ({

    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '100%', 
  }));


  useEffect(() => {
    const token = cookies.get('jwt_authentication');
    if (token) {
      const decodedToken = jwt(token);
      setUserId(decodedToken.id);
      setToken(token);
      getArticlesByCurrentMonth(decodedToken.id, token)
    } else {
       riderectToLogin();
     }

  }, [])

  async function getArticlesByCurrentMonth(userId, token) {
    setLoading(true);
    try {
      const data = await fetchData(userId, token);
      setBackEndData(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  async function getArticlesByMonth(month) {
    setLoading(true);
    try {
      const data = await fetchDataByMonth(userId, token, month);
      setBackEndData(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  async function addNewArticle(dataObj) {
    try {
      const data = await addArticle(dataObj, userId, token);
      setBackEndData(data);
      messageHandling('המאמר הוסף בהצלחה', true)
    } catch (error) {
      messageHandling(error.message, false)
    }
  }

  async function editArticle(dataObj) {
    try {
      const data = await updateArticle(dataObj, userId, token);
      setBackEndData(data);
      messageHandling('המאמר נערך בהצלחה', true)
    } catch (error) {
      messageHandling(error.message, false)
    }
  }

  async function updateArticleStatus(dataObj, id) {
    try {
      await updateArticlesStatus(id, dataObj, userId, token);
      messageHandling('סטטוס עודכן בהצלחה', true)
    } catch (error) {
      messageHandling(error.message, false)
    }
  }

  //snackbar

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  function messageHandling(mesg, stat){
    setMessage(mesg);
    setSnackbarColor(stat ? 'success' : 'error');
    handleClick();
  }


  const riderectToLogin = () => {
    setTimeout(() => {
      window.location.replace('/login');
    }, 1000);
  }



  return (
    <div>
      <NavBarNew image={backendData.image} />
      <Box sx={{ flexGrow: 1, m: 6 }}>
        <Grid sx={{ mt: 5 }} container spacing={2}>
          <DashBordNew price={backendData.spend} articles={backendData.count} alerts={backendData.alerts}  />
          <Grid item xs={3}>
            <Item sx={{ mt: 2, backgroundColor: '#fafafa' }} elevation={0}>
              <SelectMonth onSelect={getArticlesByMonth} />
            </Item>
          </Grid>

        </Grid>
      </Box>


      <Box sx={{ flexGrow: 1, m: 6 }}>
        
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Item sx={{ textAlign: 'left', mt: 5, mb: 5 }} elevation={0}><SignInModel onSubmit={addNewArticle} sx={{ display: 'inline-flex' }} />
            </Item>
          </Grid>
          <Grid item xs={4}>
            <Item sx={{ textAlign: 'right', mt: 5 }} elevation={0}>  <DisplayDate date={backendData.month}></DisplayDate></Item>
          </Grid>

        </Grid>
    
        

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
          <CircularProgress />
        </Box>
      ) : (
        
                <DataTable  customStyles={tableCustomStyles} columns={columns(editArticle, updateArticleStatus)} data={backendData.articles} />

              )}
      </Box>
      
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <MuiAlert onClose={handleClose} severity={snackbarColor} sx={{ width: '100%' }}>
          {message}
        </MuiAlert>
      </Snackbar>
    </div>
  );
}

export default HomePage;