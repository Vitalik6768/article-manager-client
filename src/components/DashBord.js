import React, { useState } from "react";
import SelectMonth from './SelecMonth';
import 'materialize-css/dist/css/materialize.min.css';
import './DashBord.css';



function DashBord(props) {
    const formatter = new Intl.NumberFormat('he-Is', {
      });
    
  
    const handleAlerts = (e) => {

        props.onClick()
    };



    return (

        <div>
            <div className="col s2" ><h6 id='badget' style={{ margin: '20px' }}>{formatter.format(props.price)} : תקציב</h6></div>
            <div className="col s2" onClick={handleAlerts} ><h6 id='alerts' style={{ margin: '20px' }}>{props.alerts}: חריגה</h6></div>
            <div className="col s3" ><h6 id='articles-count' style={{ margin: '20px' }}>{props.articles} : מאמרים שהוזמנו</h6></div>
 
        </div>


    );
}
export default DashBord;



