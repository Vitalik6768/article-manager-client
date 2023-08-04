import Typography from '@mui/material/Typography';



function DisplayDate(props) {
    let month = props.date;
  return (
    <Typography data-testid="todo-1" variant='h7'>מאמרים לחודש: {month} </Typography>
   
    
  );
}
export default DisplayDate;
