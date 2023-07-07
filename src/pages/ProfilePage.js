
import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import FileUpload from '../components/FileUpload';
import NavBarNew from '../components/NavBarNew';
import Cookies from 'universal-cookie';
import jwt from 'jwt-decode';
import CircularProgress from '@mui/material/CircularProgress';





function ProfilePage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [token, setToken] = useState('');
  let [loading, setImageLoading] = useState(true);
  const [image, setImage] = useState();



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
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
        }}
      >
        <Box sx={{ marginLeft: 10, textAlign: 'right', marginRight: 5 }}>
          <Typography variant="h6">{name} : שם</Typography>
          <Typography variant="h6">{email} : מייל</Typography>
          <Typography variant="h6">{role} : תפקיד</Typography>
          <FileUpload onSubmit={() => getUserProfile(username, token)} id={username} />
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
            <CircularProgress />
          </Box>
        ) : (
          <Avatar
            alt="Your Avatar"
            src={`https://article-manager-api.onrender.com/images/${image}`}
            sx={{ width: 300, height: 300 }}
          />
        )}
      </Box>
    </>
  );

}

export default ProfilePage;