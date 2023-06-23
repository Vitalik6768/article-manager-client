import 'materialize-css/dist/css/materialize.min.css'
import { Link } from "react-router-dom";
import Cookies from 'universal-cookie';
import { useState, useEffect } from 'react';
import jwt from 'jwt-decode';





function NavBar() {
  const [username, setUsername] = useState('');
  const cookies = new Cookies();

  useEffect(() => {
    //const cookies = new Cookies();
    const jwtToken = cookies.get('jwt_authentication');
    if (jwtToken) {
      const decodedToken = jwt(jwtToken);
      setUsername(decodedToken.name);
    }
  }, []);


  const logOut = () => {
    setUsername(null);
    cookies.remove("jwt_authentication");
  }

  return (
    <div>
      <nav>
        <div className="nav-wrapper teal lighten-2">
        <Link to="/" style={{marginLeft: '50px'}} className="brand-logo">Article Manager</Link>
          <ul id="nav-mobile" style={{marginRight: '35px'}} className="right hide-on-med-and-down">
          {username ? (
            <>
              <li><a href="#" onClick={logOut}>יציאה</a></li>
              <li><a href="#">{username}</a></li>
            </>
          ) : (
            <li><Link to="/login">כניסה</Link></li>
          )}

          </ul>
        </div>
      </nav>
    </div>
  );
}
export default NavBar;



