import * as React from 'react';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';



const Item = styled(Paper)(({ theme }) => ({

  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: '100%', // Set a fixed height for the items
  
}));

function DashBordNew(props) {

  const formatter = new Intl.NumberFormat('he-Is', {
  });

  return (
    <>

        <Grid item xs={3} >
          <Item sx={{mt:2, backgroundColor:'#fafafa'}} elevation={0}><Typography sx={{pt:2}} variant="h5" component="h4">{formatter.format(props.price)} : תקציב</Typography></Item>
        </Grid>
        <Grid item xs={3}>
          <Item sx={{mt:2, backgroundColor:'#fafafa'}} elevation={0}><Typography sx={{pt:2}} variant="h5" component="h4">{props.alerts}: חריגה</Typography></Item>
        </Grid>
        <Grid item xs={3}>
          <Item sx={{mt:2, backgroundColor:'#fafafa'}} elevation={0}><Typography sx={{pt:2}} variant="h5" component="h4">{props.articles} : מאמרים שהוזמנו</Typography></Item>
        </Grid>

        </>

  );
}

export default DashBordNew;



