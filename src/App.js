import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';

import Cookies from 'universal-cookie';
import HomePage  from './pages/HomePage';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Admin from './pages/Admin';
import LogOut from './pages/LogOut';
import ProfilePage from './pages/ProfilePage';



function App() {
  const cookies = new Cookies();
  const token = cookies.get('jwt_authentication');


  const router = createBrowserRouter([

    { path: '/', element: token ? <HomePage /> : <Navigate to="/login" /> },


    { path: '/registration', element: <Registration /> },
    { path: '/admin', element: token ? <Admin /> : <Navigate to="/login" /> },
    { path: '/login', element: <Login /> },
    { path: '/logout', element: <LogOut /> },
    { path: '/profile', element: token ? <ProfilePage /> : <Navigate to="/login" />},


  ]);

  return (
    <div>
      <RouterProvider router={router} />

    </div>

  );
}

export default App;