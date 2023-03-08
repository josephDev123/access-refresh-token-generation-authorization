import {createBrowserRouter, Link} from 'react-router-dom';
import Login from './pages/Login'
import Register from './pages/Register'
import Landing from './pages/landing'

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing/>
  },
  {
     path: "/login",
     element: <Login/>
   },

   {
    path: "/register",
    element: <Register/>,
  },
 ]);
 