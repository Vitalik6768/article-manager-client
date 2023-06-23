import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import NavBarNew from '../components/NavBarNew';
import DashBordNew from '../components/DashBordNew';
import DataTable from 'react-data-table-component';
import { tableCustomStyles } from '../components/TableStyle';
import SignInModel from '../components/SignInModel';
import SelectMonth from '../components/SelectMonth';
import EditModel from '../components/EditModel';
import DropDownButton from '../components/DropDownButton';
import Cookies from 'universal-cookie';
import jwt from 'jwt-decode';
import DisplayDate from '../components/DisplayDate';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


function HomePage() {

  const cookies = new Cookies();
  const [userId, setUserId] = useState('');
  const [backendData, setBackEndData] = useState([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState();
  const [snackbarColor, setSnackbarColor] = useState('success');
  const [token, setToken] = useState('');

  const Item = styled(Paper)(({ theme }) => ({

    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '100%', // Set a fixed height for the items
  }));


  useEffect(() => {
    const token = cookies.get('jwt_authentication');
    if (token) {
      const decodedToken = jwt(token);
      setUserId(decodedToken.id);
      setToken(token);
      getDataByCorrentMonth(decodedToken.id, token)
     } //else {
    //   riderectToLogin();

    // }

  }, [])

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  async function getDataByCorrentMonth(userId, token) {
    const response = await fetch(`https://article-manager-api.onrender.com/articles/user/${userId}`, {
      headers: {
        'authorization': `Bearer ${token}`
      }
    });
    const data = await response.json();
    if (response.status == 400) {
      //riderectToLogin();

    }else{
      setBackEndData(data);
    }

  }



  async function getDataByMonth(month) {
    console.log('ok');
    const response = await fetch(`https://article-manager-api.onrender.com/articles/${month}/user/${userId}`, {
      headers: {
        'authorization': `Bearer ${token}`
      }
    });
    const data = await response.json();
    setBackEndData(data);
    
    
  }

  async function getDataByAlerts() {
    const response = await fetch(`https://article-manager-api.onrender.com/alerts/${userId}`);
    const data = await response.json();
    setBackEndData(data);

  }




  async function postData(dataObj) {
    console.log('data added ');
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        client_name: dataObj.client_name,
        article_name: dataObj.article_name,
        contractor: dataObj.contractor,
        article_type: dataObj.article_type,
        status: dataObj.status,
        user_id: userId
      })
    };
    const response = await fetch('https://article-manager-api.onrender.com/articles/newArticle/', requestOptions);
    const data = await response.json();

    if (response.status == 400) {
      setMessage(data.message);
      setSnackbarColor('error');
      handleClick();


    } else {
      setBackEndData(data);
      setMessage('המאמר הוסף בהצלחה')
      setSnackbarColor('success');
      handleClick();

    }

  }

  async function updateData(dataObj, id) {
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        client_name: dataObj.client_name,
        article_name: dataObj.article_name,
        contractor: dataObj.contractor,
        article_type: dataObj.article_type

      })
    };
    const response = await fetch(`https://article-manager-api.onrender.com/articles/${dataObj.id}/user/${userId}`, requestOptions);
    const data = await response.json();
    if (response.status == 400) {
      setMessage(data.message);
      setSnackbarColor('error');
      handleClick();

    } else {
      setBackEndData(data);
      setMessage('המאמר נערך בהצלחה')
      setSnackbarColor('success');
      handleClick();

    }
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
    const response = await fetch(`https://article-manager-api.onrender.com/articles/${id}/status/${userId}`, requestOptions);
    const data = await response.json();
    if (response.status == 400) {
      setMessage(data.message);
      setSnackbarColor('error');
      handleClick();

    } else {
      setBackEndData(data);
      setMessage('סטטוס עודכן בהצלחה')
      setSnackbarColor('success');
      handleClick();

    };
  }

  const riderectToLogin = () => {
    setTimeout(() => {
      window.location.replace('/login');
    }, 1000);
  }



  const columns = [
    {
      name: "פעולות",
      selector: (row) => <EditModel
        onSubmit={updateData}
        id={row.id}
        client_name={row.client_name}
        article_name={row.article_name}
        contractor={row.contractor}
        article_type={row.article_type}
      />
    },
    {
      name: "תאריך",
      selector: (row) => new Date(row.created_at).toLocaleDateString(),

    },
    {
      name: "סטטוס",
      selector: (row) => <DropDownButton onClick={updateStatus} id={row.id} status={row.status} />
    },
    {
      name: "מחיר",
      selector: (row) => row.price.toFixed(1),
    },
    {
      name: "סוג המאמר",
      selector: (row) => row.article_type,
    },
    {
      name: "ספק",
      selector: (row) => row.contractor,
    },
    {
      name: "שם המאמר",
      selector: (row) => row.article_name,
    },
    {
      name: "שם לקוח",
      selector: (row) => row.client_name,
    }
  ];



  return (
    <div>
      <NavBarNew image={backendData.image} />
      <Box sx={{ flexGrow: 1, m: 6 }}>
        <Grid sx={{ mt: 5 }} container spacing={2}>
          <DashBordNew price={backendData.spend} articles={backendData.count} alerts={backendData.alerts} onClick={getDataByAlerts} />
          <Grid item xs={3}>
            <Item sx={{ mt: 2, backgroundColor: '#fafafa' }} elevation={0}>
              <SelectMonth onSelect={getDataByMonth} />
            </Item>
          </Grid>

        </Grid>
      </Box>


      <Box sx={{ flexGrow: 1, m: 6 }}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Item sx={{ textAlign: 'left', mt: 5 }} elevation={0}><SignInModel onSubmit={postData} sx={{ display: 'inline-flex' }} />
            </Item>
          </Grid>
          <Grid item xs={4}>
            <Item sx={{ textAlign: 'right', mt: 5 }} elevation={0}>  <DisplayDate date={backendData.month}></DisplayDate></Item>
          </Grid>

        </Grid>
      </Box>

      <DataTable
        customStyles={tableCustomStyles}
        columns={columns} data={backendData.articles}
      />

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <MuiAlert onClose={handleClose} severity={snackbarColor} sx={{ width: '100%' }}>
          {message}
        </MuiAlert>
      </Snackbar>
    </div>
  );
}

export default HomePage;
