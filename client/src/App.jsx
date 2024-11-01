import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { RouterProvider, createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './contexts/AuthContext';
import RootLayout from './pages/RootLayout';
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';
import  LoginPage  from './pages//LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  const { loggedIn } = useContext(AuthContext);
  const router = createBrowserRouter([
    {
      element: <RootLayout/>,

      /* Loading errors of a valid route.
      This handles route loading errors and other server errors if not handled directly in components */
      errorElement: <ErrorPage/>,

      children: [
        {
          path: "/",
          element: <HomePage />
        },
        {
          path: "/register",
          element: loggedIn ? <Navigate to="/" /> : <RegisterPage />,
        },
        {
          path: "/login",
          element: loggedIn ? <Navigate to="/" /> : <LoginPage  />,
        },
        {
          path: "*",
          element: <Navigate to="/" />
        }
      ]
    },
  
  ]);

  return <RouterProvider router={router} />;
}

export default App