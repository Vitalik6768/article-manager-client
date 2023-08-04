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

        <Grid item xs={6} md={3} >
          <Item data-testid="item1" sx={{mt:2, backgroundColor:'#fafafa'}} elevation={0}><Typography sx={{pt:2}} variant="h6" component="h5">{formatter.format(props.price)} : תקציב</Typography></Item>
        </Grid>
        <Grid item xs={6} md={3}>
          <Item data-testid="item2" sx={{mt:2, backgroundColor:'#fafafa'}} elevation={0}><Typography sx={{pt:2}} variant="h6" component="h5">{props.alerts}: חריגה</Typography></Item>
        </Grid>
        <Grid item xs={6} md={3}>
          <Item data-testid="item3" sx={{mt:2, backgroundColor:'#fafafa'}} elevation={0}><Typography sx={{pt:2}} variant="h6" component="h5">{props.articles} : מאמרים</Typography></Item>
        </Grid>

        </>

  );
}

export default DashBordNew;



