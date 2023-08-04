import Typography from '@mui/material/Typography';



function DisplayDate(props) {
    let month = props.date;
  return (
    <Typography data-testid="todo-1" variant='h5' sx={{
      color: "secondary"
    }}> {month} </Typography>
   
    
  );
}
export default DisplayDate;
