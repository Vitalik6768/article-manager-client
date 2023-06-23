import Cookies from 'universal-cookie';
import jwt from 'jwt-decode';
import { useEffect } from 'react';
import NavBarNew from '../components/NavBarNew';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';

function LogOut() {



    useEffect(() => {
        const cookies = new Cookies();
        removeCookie(cookies);

        // Add any side effects you need here
    }, []);

    const removeCookie = (cookies) => {
        cookies.remove("jwt_authentication");
    };

    return (
        <>
            <NavBarNew></NavBarNew>
            <Typography variant='h3' sx={{ mt: 5, textAlign: 'center' }}>התנתקת בהצלחה</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt:3 }}>
                <Link to={`/login`}>חזור</Link>
            </Box>


        </>



    )

}


export default LogOut;