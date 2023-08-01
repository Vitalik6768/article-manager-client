import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';
//import EditIcon from '@mui/icons-material/Edit';




function SignInModel(props) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const [values, setValues] = useState({
        client_name: "",
        article_name: "",
        article_type: "",
        contractor: "",
        status: ""
    });

    const onChangeMethod = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(values);
        props.onSubmit(values);
        handleClose(false);

    };

    const style = {
        position: 'absolute',
        top: '45%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        maxWidth: '500px',
        higth: 200,
        bgcolor: 'background.paper',
        boxShadow: '24px',
        textAlign: 'right',
        p: 4,
        borderRadius: '8px',
        justifyContent: 'center'
    };

    return (
        <>
           
            <Button variant="contained" onClick={handleOpen}>+ הוספת מאמר</Button>
           
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography sx={{ mb: 4 }} id="modal-modal-title" variant="h5" component="h2">
                      הוספת מאמר
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            sx={{ textAlign: 'right', mb: 2 }} // Align input and label to the right
                            id="standard-basic"
                            onChange={onChangeMethod}
                            name="client_name"
                            placeholder='שם לקוח'
                            variant="standard"
                            fullWidth
                            inputProps={{ min: 0, style: { textAlign: 'right' } }}
                        />

                        <TextField
                            sx={{ textAlign: 'right', mb: 2 }} // Align input and label to the right
                            id="standard-basic"
                            onChange={onChangeMethod}
                            name="article_name"
                            placeholder='שם המאמר'
                            variant="standard"
                            fullWidth
                            inputProps={{ min: 0, style: { textAlign: 'right' } }}
                        />


                        <FormControl fullWidth variant='standard'>
                            <Select
                                sx={{ mb: 2 }}
                                defaultValue={5}
                                labelId="demo-simple-select-label"
                                name="article_type"
                                id="demo-simple-select"
                                label="Age"
                                onChange={onChangeMethod}

                            >
                                <MenuItem disabled value={5} sx={{ justifyContent: 'flex-end' }}>סוג המאמר</MenuItem>
                                <MenuItem value={'מאמר לאתר 150'} sx={{ justifyContent: 'flex-end' }}>מאמר לאתר 150</MenuItem>
                                <MenuItem value={'מאמר לאתר 300'} sx={{ justifyContent: 'flex-end' }}>מאמר לאתר 300</MenuItem>
                                <MenuItem value={'מאמר לאתר 400'} sx={{ justifyContent: 'flex-end' }}>מאמר לאתר 400</MenuItem>
                                <MenuItem value={'מאמר לאתר 500'} sx={{ justifyContent: 'flex-end' }}>מאמר לאתר 500</MenuItem>

                            </Select>
                        </FormControl>


                        <FormControl fullWidth variant='standard'>
                            <Select
                                sx={{ mb: 2 }}
                                defaultValue={34}
                                labelId="demo-simple-select-label"
                                name="contractor"
                                id="demo-simple-select"
                                label="Age"
                                onChange={onChangeMethod}

                            >
                                <MenuItem disabled value={34} sx={{ justifyContent: 'flex-end' }}>ספק</MenuItem>
                                <MenuItem value={'כתבנית'} sx={{ justifyContent: 'flex-end' }}>כתבנית</MenuItem>
                                <MenuItem value={'נותנים מילה'} sx={{ justifyContent: 'flex-end' }}>נותנים מילה</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth variant='standard'>
                            <Select
                                sx={{ mb:2 }}
                                defaultValue={35}
                                labelId="demo-simple-select-label"
                                name="status"
                                id="demo-simple-select"
                                label="Age"
                                onChange={onChangeMethod}

                            >
                                <MenuItem disabled value={35} sx={{ justifyContent: 'flex-end' }}>סטטוס</MenuItem>
                                <MenuItem value={'הוזמן'} sx={{ justifyContent: 'flex-end' }}>הוזמן</MenuItem>
                                <MenuItem value={'ממתנין להזמנה'} sx={{ justifyContent: 'flex-end' }}>ממתין להזמנה</MenuItem>
                            </Select>
                        </FormControl>
                        <Button sx={{ marginTop: '20px' }} type='submit' variant="contained">שמור שינויים</Button>
                    </form>
                </Box>
            </Modal>
       
        </>
    );
}

export default SignInModel;