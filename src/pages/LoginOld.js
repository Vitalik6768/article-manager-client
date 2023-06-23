import NavBar from '../components/NavBar';
import React, { useState } from "react";
import 'materialize-css/dist/css/materialize.min.css';
import 'material-icons/iconfont/material-icons.css'
import Cookies from 'universal-cookie';
import jwt from 'jwt-decode';




function Login() {
    const cookies = new Cookies();
    const [message, setMessage] = useState(null);
    const [changeColor, setColor] = useState(null);


    const [values, setValues] = useState({
        email: "",
        password: ""

    });

    const onChangeMethod = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })


    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (Object.values(values).some((val) => val === "")) {
            setColor('red-text right-align');
            return setMessage('נא למלות פרטים');
        }
        postData(values);


    }

    async function postData(dataObj) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: dataObj.email,
                password: dataObj.password
            })
        };
        const response = await fetch('auth/login/', requestOptions);
        const data = await response.json();
        console.log(response.status);

        if (response.status === 400) {
            setColor('red-text right-align');
            return setMessage(data.message);
        }


        setColor('green-text right-align');
        setMessage('התחברת בהצלחה');
        loginUser(data);
        riderectToHomePage();
    }

    const loginUser = (jwt_token) => {
        const decode = jwt(jwt_token.token);

        //setUser(decode.name);
        cookies.set("jwt_authentication", jwt_token.token, {
            expires: new Date(decode.exp * 1000)
        });
    }

    const riderectToHomePage = () => {
        setTimeout(() => {
            window.location.replace('/');
        }, 1000);
    }









    return (
        <>
            <NavBar></NavBar>
            <div className="container" id="content">


                <div className="row">
                    <div className="col l3 m3 s12"></div>
                    <div className="col l6 m6 s12">
                        <br></br>
                        <form onSubmit={handleSubmit}>
                            <div className="card-panel z-depth-3">
                                <h5 className="center">התחבר</h5>
                                <br></br>

                                <div className="input-field">
                                    <i className="material-icons prefix">email</i>
                                    <input placeholder='מייל' onChange={onChangeMethod} name="email" id="email" type="email" className="validate right-align" />

                                </div>

                                <div className="input-field">
                                    <i className="material-icons prefix">lock</i>
                                    <input placeholder='סיסמא' onChange={onChangeMethod} name="password" id="password" type="password" className="validate right-align" />

                                </div>
                                <p className={changeColor}>{message}</p>

                                <input type="submit" name="submit" value="התחבר" className="btn left col s12" />

                                <div className="clearfix"></div>
                            </div>
                        </form>

                    </div>
                    <div className="col l3 m3 s12"></div>
                </div>
            </div>


        </>


    )
}

export default Login;