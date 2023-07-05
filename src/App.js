import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage, {action as ridirecAction} from './pages/HomePage';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Admin from './pages/Admin';
import LogOut from './pages/LogOut';
import ProfilePage from './pages/ProfilePage';



function App() {

  const router = createBrowserRouter([
    
      {path: '/', element: <HomePage />},
      {path: '/registration', element: <Registration />},
      {path: '/admin', element: <Admin />},
      {path: '/login', element: <Login />},
      {path: '/logout', element: <LogOut />},
      {path: '/profile', element: <ProfilePage />},

  
  ]);

  return (
    <div>
     <RouterProvider router={router} />
 
      </div>
      
  );
}

export default App;