import Typography from '@mui/material/Typography';



function DisplayDate(props) {
    let month = props.date;
  return (
    <Typography variant='h5'>מאמרים לחודש: {month} </Typography>
   
    
  );
}
export default DisplayDate;
