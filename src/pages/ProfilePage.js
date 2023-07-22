
import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import FileUpload from '../components/FileUpload';
import NavBarNew from '../components/NavBarNew';
import Cookies from 'universal-cookie';
import jwt from 'jwt-decode';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import { Container } from "@mui/material";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';





function ProfilePage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [token, setToken] = useState('');
  let [loading, setImageLoading] = useState(true);
  const [image, setImage] = useState();

  const Item = styled(Paper)(({ theme }) => ({

    textAlign: 'center',

    height: '100%',
  }));



  useEffect(() => {
    const cookies = new Cookies();

    const token = cookies.get('jwt_authentication');

    if (token) {
      const decodedToken = jwt(token);
      setUsername(decodedToken.id);
      setName(decodedToken.name);
      setEmail(decodedToken.email);
      setRole(decodedToken.role);
      setToken(token);
      getUserProfile(decodedToken.id, token);
    }
  }, []);

  const getUserProfile = async (id, token) => {
    try {
      const response = await fetch(`https://article-manager-api.onrender.com/profile/userprofile/${id}`, {
        headers: {
          'authorization': `Bearer ${token}`
        }
      });
      setImageLoading(loading = true);
      console.log(loading);

      const data = await response.json();
      setImage(data.image);
      setImageLoading(loading = false);
      console.log(loading);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <NavBarNew image={image} />
      <Container maxWidth="xs">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '65vh',
          }}
        >


          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <CircularProgress />
            </Box>
          ) : (
            <Avatar
              alt="Your Avatar"
              src={`https://article-manager-api.onrender.com/images/${image}`}
              //sx={{ width: 300, height: 300 }}
              sx={{
                width: { xs: 150, md: 300 },
                height: { xs: 150, md: 300 },

                // Add some spacing at the bottom on small screens only
              }}
            />
          )}


        </Box>


        <Grid container spacing={2}>
          <Grid item xs={4} md={4} container justifyContent="center" alignItems="center">
            <Item elevation={0}>
              <Typography variant="h5">שם</Typography>
              <Typography variant="subtitle1">{name}</Typography>
            </Item>
          </Grid>
          <Grid item xs={4} md={4} container justifyContent="center" alignItems="center">
            <Item elevation={0}>
              <Typography variant="h5">מייל</Typography>
              <Typography variant="subtitle1">{email}</Typography>
            </Item>
          </Grid>
          <Grid item xs={4} md={4} container justifyContent="center" alignItems="center">
            <Item elevation={0}>
              <Typography variant="h5">תפקיד</Typography>
              <Typography variant="subtitle1">{role}</Typography>
            </Item>
          </Grid>

        </Grid>
        <FileUpload onSubmit={() => getUserProfile(username, token)} id={username} />


      </Container >
    </>
  );

}

export default ProfilePage;