import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import './NavBarNew.css';




function EditModel(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const [values, setValues] = useState({
    id: props.id,
    client_name: props.client_name,
    article_name: props.article_name,
    contractor: props.contractor,
    article_type: props.article_type

  });

  const onChangeMethod = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSubmit(values);
    handleClose(false);

  };

  const style = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
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
      <EditIcon id='editIcon' onClick={handleOpen}></EditIcon>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography sx={{ mb: 4 }} id="modal-modal-title" variant="h5" component="h2">
            עריכת מאמר
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              sx={{ textAlign: 'right', mb: 2 }} // Align input and label to the right
              id="standard-basic"
              value={values.client_name}
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
              value={values.article_name}
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
                defaultValue={props.article_type}
                labelId="demo-simple-select-label"
                name="article_type"
                id="demo-simple-select"
                label="Age"
                onChange={onChangeMethod}

              >
                <MenuItem disabled value={props.article_type} sx={{ justifyContent: 'flex-end' }}>{props.article_type}</MenuItem>
                <MenuItem value={'מאמר לאתר 150'} sx={{ justifyContent: 'flex-end' }}>מאמר לאתר 150</MenuItem>
                <MenuItem value={'מאמר לאתר 300'} sx={{ justifyContent: 'flex-end' }}>מאמר לאתר 300</MenuItem>
                <MenuItem value={'מאמר לאתר 400'} sx={{ justifyContent: 'flex-end' }}>מאמר לאתר 400</MenuItem>
                <MenuItem value={'מאמר לאתר 500'} sx={{ justifyContent: 'flex-end' }}>מאמר לאתר 500</MenuItem>
              </Select>
            </FormControl>


            <FormControl fullWidth variant='standard'>
              <Select
                sx={{ mb: 2 }}
                defaultValue={props.contractor}
                labelId="demo-simple-select-label"
                name="contractor"
                id="demo-simple-select"
                label="Age"
                onChange={onChangeMethod}

              >
                <MenuItem disabled value={props.contractor} sx={{ justifyContent: 'flex-end' }}>{props.contractor}</MenuItem>
                <MenuItem value={'כתבנית'} sx={{ justifyContent: 'flex-end' }}>כתבנית</MenuItem>
                <MenuItem value={'נותנים מילה'} sx={{ justifyContent: 'flex-end' }}>נותנים מילה</MenuItem>
              </Select>
            </FormControl>

            <Button sx={{ marginTop: '20px' }} type='submit' variant="contained">שמור שינויים</Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default EditModel;