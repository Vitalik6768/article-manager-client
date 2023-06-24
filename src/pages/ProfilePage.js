
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


    //const [jwtToken, setJwtToken] = useState(null);
    const [image, setImage] = useState();
    const [isLoading, setIsLoading] = useState(true); // Add a loading state


    useEffect(() => {
        const cookies = new Cookies();

        const token = cookies.get('jwt_authentication');

        if (token) {
            //setJwtToken(token);
            const decodedToken = jwt(token);
            setUsername(decodedToken.id);
            setName(decodedToken.name);
            setEmail(decodedToken.email);
            setRole(decodedToken.role);
            setToken(token);
            testSub(decodedToken.id, token);
        }
    }, []);

    const testSub = async (id, token) => {
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
            setIsLoading(false); // Set isLoading to false when data is received
            setImageLoading(loading = false);
            console.log(loading);
        } catch (error) {
            console.error(error);
        }
    };

    if (isLoading) { // Render a loading state while data is being fetched
        return <p>Loading...</p>;
    }



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
            <FileUpload onSubmit={() => testSub(username, token)} id={username} />
          </Box>
    

            <Avatar
              alt="Your Avatar"
              src={`https://article-manager-api.onrender.com/images/${image}`}
              sx={{ width: 300, height: 300 }}
            />
        
        </Box>
      </>
    );

}

export default ProfilePage;