import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';



  function AddNewUser(props) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [massage, setMassage] = useState(null);
    const [changeColor, setColor] = useState(null);
    const { executeRecaptcha } = useGoogleReCaptcha();
    const [isReCaptchaLoaded, setReCaptchaLoaded] = useState(false);


    useEffect(() => {
        const loadCaptcha = async () => {
          setReCaptchaLoaded(true);
        };
    
        loadCaptcha();
      }, []);



    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        passwordConfirm: "",
        role: ""
      
    });

    const onChangeMethod = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const  handleSubmit = async (event) => {
        event.preventDefault();

        if (Object.values(values).some((val) => val === "")) {
            setColor('red');
            return setMassage('נא למלות פרטים');
        }

        if (values.password.length < 8) {
            setColor('red');
            return setMassage('הסיסמא לחחבת לפחות להיות 8 תווים');
        }


        if (values.password !== values.passwordConfirm) {
            
            setColor('red');
            return setMassage('סיסמאות לא תואמות');

        }

        try {
            const token = await executeRecaptcha('registration');
            
      
            if (!token) {
              setColor('red-text right-align');
              return setMassage('אנא השלם את הבדיקה של reCAPTCHA');
            }
      
            //postData(values, token);
            props.onSubmit(values, token);

           
          } catch (error) {
            console.error('reCAPTCHA error:', error);
          }

     
        handleClose(false);

    };

    const style = {
        position: 'absolute',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '50%',
        higth: 200,
        bgcolor: 'background.paper',
        boxShadow: '24px',
        textAlign: 'right',
        p: 3,
        m: 3,
        borderRadius: '8px'
    };



    return (
        <div>

            <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleOpen}
            >
                הוספת משתמש חדש
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography sx={{ mb: 4 }} id="modal-modal-title" variant="h5" component="h2">
                        הוספת משתמש חדש
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            sx={{ textAlign: 'right', mb: 2 }} // Align input and label to the right
                            id="standard-basic"
                            onChange={onChangeMethod}
                            name="name"
                            placeholder='שם משתמש'
                            variant="standard"
                            fullWidth
                            inputProps={{ min: 0, style: { textAlign: 'right' } }}
                        />

                        <TextField
                            sx={{ textAlign: 'right', mb: 2 }} // Align input and label to the right
                            id="standard-basic"
                            onChange={onChangeMethod}
                            name="email"
                            placeholder='מייל'
                            variant="standard"
                            fullWidth
                            inputProps={{ min: 0, style: { textAlign: 'right' } }}
                        />

                        <TextField
                            sx={{ textAlign: 'right', mb: 2 }} // Align input and label to the right
                            id="standard-basic"
                            onChange={onChangeMethod}
                            name="password"
                            placeholder='סיסמא'
                            variant="standard"
                            type="password"
                            fullWidth
                            inputProps={{ min: 0, style: { textAlign: 'right' } }}
                        />
                        <TextField
                            sx={{ textAlign: 'right', mb: 2 }} // Align input and label to the right
                            id="standard-basic"
                            onChange={onChangeMethod}
                            name="passwordConfirm"
                            placeholder='וודא סיסמא'
                            variant="standard"
                            type="password"
                            fullWidth
                            inputProps={{ min: 0, style: { textAlign: 'right' } }}
                        />


                        <FormControl fullWidth variant='standard'>
                            <Select
                                sx={{ mb: 2 }}
                                defaultValue={5}
                                labelId="demo-simple-select-label"
                                name="role"
                                id="demo-simple-select"
                                label="role"
                                onChange={onChangeMethod}

                            >
                                <MenuItem disabled value={5} sx={{ justifyContent: 'flex-end' }}>תפקיד</MenuItem>
                                <MenuItem value={'ADMIN'} sx={{ justifyContent: 'flex-end' }}>ADMIN</MenuItem>
                                <MenuItem value={'SEO_PROMOTER'} sx={{ justifyContent: 'flex-end' }}>SEO_PROMOTER</MenuItem>
                                <MenuItem value={'SALES'} sx={{ justifyContent: 'flex-end' }}>SALES</MenuItem>


                            </Select>
                        </FormControl>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>

                        </Box>



                        <Typography sx={{ textAlign: 'center', color: changeColor }}>{massage}</Typography>
                        <Button sx={{ marginTop: '20px' }} type='submit' variant="contained" fullWidth>הוסף משתמש</Button>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}

export default AddNewUser;