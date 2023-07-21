import NavBarNew from '../components/NavBarNew';
import React, { useState, useEffect } from "react";
import { Container, Grid, Card, TextField, Button, InputAdornment, Select, MenuItem } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3';





function Registration() {
    return (
      <GoogleReCaptchaProvider reCaptchaKey="6Le6_CInAAAAAIlhbvGz5gpx-3OKusU-yEeMi5g8">
        <RegistrationCom />
      </GoogleReCaptchaProvider>
    );
  }



function RegistrationCom() {

    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        passwordconfirm: "",
        role: ""

    });
    const [massage, setMassage] = useState(null);
    const [changeColor, setColor] = useState(null);
    //const [token, setToken] = useState(null);
    const { executeRecaptcha } = useGoogleReCaptcha();
    const [isReCaptchaLoaded, setReCaptchaLoaded] = useState(false);
  


    useEffect(() => {
        const loadCaptcha = async () => {
          setReCaptchaLoaded(true);
        };
    
        loadCaptcha();
      }, []);



    const onChangeMethod = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })


    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        //console.log(values.role);
   

        if (Object.values(values).some((val) => val === "")) {
            setColor('red-text right-align');
            return setMassage('נא למלות פרטים');
        }

        if (values.password.length < 8) {
            setColor('red-text right-align');
            return setMassage('הסיסמא לחחבת לפחות להיות 8 תווים');
        }


        if (values.password !== values.passwordconfirm) {
            setColor('red-text right-align');
            return setMassage('סיסמאות לא תואמות');

        }


        if (!isReCaptchaLoaded) {
            setColor('red-text right-align');
            return setMassage('reCAPTCHA לא נטען');
          }
      
          try {
            const token = await executeRecaptcha('registration');
            
      
            if (!token) {
              setColor('red-text right-align');
              return setMassage('אנא השלם את הבדיקה של reCAPTCHA');
            }
      
            postData(values, token);
           
          } catch (error) {
            console.error('reCAPTCHA error:', error);
          }

         


    }

    async function postData(dataObj, token) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: dataObj.name,
                email: dataObj.email,
                password: dataObj.password,
                passwordConfirm: dataObj.passwordconfirm,
                role: dataObj.role,
                token: token
            })
        };
        const response = await fetch('https://article-manager-api.onrender.com/auth/register/', requestOptions);
        const data = await response.json();


        if (response.status === 400) {
            setColor('red-text right-align');
            return setMassage(data.message)
        }

        setColor('green-text right-align');
        setMassage(data.message)
        riderectToHomeLogin();

    }

    const riderectToHomeLogin = () => {
        setTimeout(() => {
            window.location.replace('/login');
        }, 1000);
    }


    return (
        <>
                <NavBarNew></NavBarNew>
                <Container id="content">
                    <Grid container>
                        <Grid item xs={12} md={3} />
                        <Grid item xs={12} md={6}>
                            <br />
                            <form onSubmit={handleSubmit}>
                                <Card variant="outlined">
                                    <Typography sx={{ textAlign: 'center' }} variant='h4'>הרשמה</Typography>

                                    <br />
                                    <div className="input-field">
                                        <TextField
                                            label="שם משתמש"
                                            onChange={onChangeMethod}
                                            name="name"
                                            id="first_name"
                                            type="text"
                                            className="validate"
                                            fullWidth
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <AccountCircleIcon></AccountCircleIcon>
                                                    </InputAdornment>
                                                ),
                                            }}
                                            inputProps={{
                                                style: { textAlign: 'right' }
                                            }}
                                        />
                                    </div>

                                    <div className="input-field">
                                        <TextField
                                            label="מייל"
                                            onChange={onChangeMethod}
                                            name="email"
                                            id="email"
                                            type="email"
                                            className="validate"
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
                                    </div>

                                    <div className="input-field">
                                        <TextField
                                            label="סיסמא"
                                            onChange={onChangeMethod}
                                            name="password"
                                            id="password"
                                            type="password"
                                            className="validate"
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
                                    </div>

                                    <div className="input-field">
                                        <TextField
                                            label="וודא סיסמא"
                                            onChange={onChangeMethod}
                                            type="password"
                                            name="passwordconfirm"
                                            className="validate"
                                            fullWidth
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <VpnKeyIcon></VpnKeyIcon>

                                                    </InputAdornment>
                                                ),
                                            }}
                                            inputProps={{
                                                style: { textAlign: 'right' }
                                            }}

                                        />
                                    </div>

                                    <div>
                                        <Select
                                            style={{ marginTop: '6px' }}
                                            name='role'
                                            defaultValue={5}
                                            onChange={onChangeMethod}
                                            className="right-align"
                                            fullWidth
                                        >
                                            <MenuItem disabled value={5} sx={{ justifyContent: 'flex-end' }}>תפקיד</MenuItem>
                                            <MenuItem value="SEO_PROMOTER">SEO PROMOTER</MenuItem>
                                            <MenuItem value="SALES">SALES</MenuItem>
                                        </Select>
                                    </div>

                                    <p className={changeColor}>{massage}</p>
                                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>


                                    </Box>


                                    <Button type="submit" name="submit" variant="contained" color="primary" sx={{ mb: 3 }} fullWidth>
                                        הרשם
                                    </Button>

                                    <div className="clearfix"></div>
                                </Card>
                            </form>
                        </Grid>
                        <Grid item xs={12} md={3} />
                    </Grid>
                    
                </Container>
                </>
              
        
    )
}


export default Registration;