import NavBarNew from '../components/NavBarNew';
import Typography from '@mui/material/Typography';
import React, { useState } from "react";
import Cookies from 'universal-cookie';
import jwt from 'jwt-decode';
import { Container, Grid, Card, TextField, Button, InputAdornment } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';





function Login() {
    const cookies = new Cookies();
    const [message, setMessage] = useState(null);
    const [changeColor, setColor] = useState(null);


    const [values, setValues] = useState({
        email: "",
        password: ""

    });

    const onChangeMethod = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })


    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (Object.values(values).some((val) => val === "")) {
            setColor('red');
            return setMessage('נא למלות פרטים');
        }
        postData(values);


    }

    async function postData(dataObj) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: dataObj.email,
                password: dataObj.password
            })
        };
        const response = await fetch('https://article-manager-api.onrender.com/auth/login/', requestOptions);
        const data = await response.json();
        console.log(response.status);

        if (response.status === 400) {
            setColor('red');
            return setMessage(data.message);
        }


        setColor('green');
        setMessage('התחברת בהצלחה');
        loginUser(data);
        riderectToHomePage();
    }

    const loginUser = (jwt_token) => {
        const decode = jwt(jwt_token.token);

        //setUser(decode.name);
        cookies.set("jwt_authentication", jwt_token.token, {
            expires: new Date(decode.exp * 1000)
        });
    }

    const riderectToHomePage = () => {
        setTimeout(() => {
            window.location.replace('/');
        }, 1000);
    }


    

    return (
        <>
            <NavBarNew></NavBarNew>

            <Container id="content">
                <Grid container sx={{m:3}}>
                    <Grid item xs={12} sm={3} sx={{ml:3}} />
                    <Grid item xs={12} sm={6}>
                        <br />
                        <form onSubmit={handleSubmit}>
                            <Card variant="outlined">
                                <Typography variant='h4' sx={{textAlign: 'center', m:2}}>התחברות</Typography>
                                
                                <br />

                                <TextField
                                    placeholder='מייל'
                                    onChange={onChangeMethod}
                                    name="email"
                                    id="email"
                                    type="email"
                                    className="validate right-align"
                                    fullWidth
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <EmailIcon></EmailIcon>
                                            </InputAdornment>
                                        ),
                                    }}
                                    inputProps={{
                                        style: { textAlign: 'right' }
                                    }}
                                />

                                <TextField
                                    placeholder='סיסמא'
                                    
                                    onChange={onChangeMethod}
                                    name="password"
                                    id="password"
                                    type="password"
                                    className="validate right-align"
                                    fullWidth
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LockIcon></LockIcon>
                                            </InputAdornment>
                                        ),
                                    }}
                                    inputProps={{
                                        style: { textAlign: 'right' }
                                    }}
                                />
                                <Typography sx={{color:changeColor, textAlign: 'right'}}>{message}</Typography>
                                

                                <Button type="submit" name="submit" variant="contained" color="primary" fullWidth>
                                    התחבר
                                </Button>

                                <div className="clearfix"></div>
                            </Card>
                        </form>
                    </Grid>
                    <Grid item xs={12} sm={3} />
                </Grid>
            </Container>


        </>


    )
}

export default Login;