import NavBar from '../components/NavBar';
import React, { useState } from "react";
import 'materialize-css/dist/css/materialize.min.css';
import 'material-icons/iconfont/material-icons.css'
import './Registration.css';
import ReCAPTCHA from "react-google-recaptcha";


function Registration() {

    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        passwordconfirm: "",
        role: ""

    });
    const [massage, setMassage] = useState(null);
    const [changeColor, setColor] = useState(null);
    const [token, setToken] = useState(null);



    const onChangeMethod = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })


    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(values.role);

        if (Object.values(values).some((val) => val === "")) {
            setColor('red-text right-align');
            return setMassage('נא למלות פרטים');
        }

        if (values.password.length < 8) {
            setColor('red-text right-align');
            return setMassage('הסיסמא לחחבת לפחות להיות 8 תווים');
        }


        if (values.password !== values.passwordconfirm) {
            setColor('red-text right-align');
            return setMassage('סיסמאות לא תואמות');

        }

        if (!token) {
            setColor('red-text right-align');
            return setMassage('CAPTCHA לא סומן');
        }

        postData(values);


    }

    async function postData(dataObj) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: dataObj.name,
                email: dataObj.email,
                password: dataObj.password,
                passwordConfirm: dataObj.passwordconfirm,
                role:dataObj.role,
                token: token
            })
        };
        const response = await fetch('auth/register/', requestOptions);
        const data = await response.json();

        if (response.status === 400) {
            setColor('red-text right-align');
            return setMassage(data.message)
        }

        setColor('green-text right-align');
        setMassage(data.message)
        riderectToHomeLogin();

    }

    const riderectToHomeLogin = () => {
        setTimeout(() => {
            window.location.replace('/login');
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
                                <h5 className="center">הרשמה</h5>
                                <br></br>
                                <div className="input-field">
                                    <i className="material-icons prefix">account_circle</i>
                                    <input placeholder='שם משתמש' onChange={onChangeMethod} name="name" id="first_name" type="text" className="validate right-align" />


                                </div>

                                <div className="input-field">
                                    <i className="material-icons prefix">email</i>
                                    <input placeholder='מייל' onChange={onChangeMethod} name="email" id="email" type="email" className="validate right-align" />

                                </div>

                                <div className="input-field">
                                    <i className="material-icons prefix">lock</i>
                                    <input placeholder='סיסמא' onChange={onChangeMethod} name="password" id="password" type="password" className="validate right-align" />

                                </div>
                                <div className="input-field">
                                    <i className="material-icons prefix">vpn_key</i>
                                    <input placeholder='וודא סיסמא' onChange={onChangeMethod} type="password" name="passwordconfirm" className="validate right-align" />

                                </div>
                                <div>

                                    <select style={{ marginTop: '6px' }} name='role' defaultValue="" onChange={onChangeMethod} className="browser-default right-align">
                                        <option value="" disabled>תפקיד</option>
                                        <option value="SEO_PROMOTER">SEO PROMOTER</option>
                                        <option value="SALES">SALES</option>
                                    </select>

                                </div>

                                <p className={changeColor}>{massage}</p>
                                <div className='center'>
                                    <ReCAPTCHA
                                        sitekey="6LfoGeMlAAAAAGicIfUevIX2zbnEvApm3yOwFcxZ
                                    "
                                        onChange={token => setToken(token)}

                                        onExpired={e => setToken}
                                    />

                                </div>



                                <input type="submit" name="submit" value="הרשם" className="btn left col s12" />

                                <div className="clearfix"></div>
                            </div>
                        </form>

                    </div>
                    <div className="col l3 m3 s12"></div>
                </div >
            </div >
        </>
    )
}

export default Registration;