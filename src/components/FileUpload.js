import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Stack from "@mui/material/Stack";
import { Container } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from '@mui/material/Typography';


function FileUpload(props) {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState(null);

    const handleFile = (e) => {
        setFile(e.target.files[0]);
    };

    const validateFile = () => {
        const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg'];

        if (file.size > 2 * 1024 * 1024) {
            setMessage('הגודל המקסימלי חייב להיות 2 מגה')
            return false;
        }

        if (!allowedTypes.includes(file.type)) {
            setMessage('הקובץ חייב להיות בפורמטים הבאים: (png, jpg, jpeg)');
            return false;
        }
    }

    const handleUpload = async () => {
        if (file == null) {
            return setMessage('נא לבחור תמונה')
        }

        const formData = new FormData();

        formData.append('image', file);
        let fileCheak = validateFile();

        if (fileCheak == false) {
            console.log('ok');
        } else {

            try {
                const response = await fetch(`https://article-manager-api.onrender.com/profile/user/${props.id}/upload/`, {
                    method: 'POST',
                    body: formData
                });

                const data = await response.json();

                if (response.status === 400) {
                    setMessage(data.message);
                } else {
                    console.log(data);
                    props.onSubmit();
                    setMessage('הועלה בהצלחה');
                }

            } catch (error) {
                setMessage('הקובץ לא תקין')
                console.error(error);
            }
        }
    };

    return (
        <>
            <Container maxWidth="md" sx={{ mt: 3 }}>

                <Stack direction="row" alignItems="right" spacing={5}>
                    <Button variant="contained" component="span" type="submit" onClick={handleUpload}>
                        Upload
                    </Button>
                    <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="label"
                    >
                        <input hidden accept="image/*" type="file" onChange={handleFile} />
                        <PhotoCamera />
                    </IconButton>

                </Stack>
                <Typography sx={{ mt: 3, color: "red" }} variant="h6">{message}</Typography>
            </Container>

            <div>
            </div>


            <br></br>

        </>
    )
}

export default FileUpload;