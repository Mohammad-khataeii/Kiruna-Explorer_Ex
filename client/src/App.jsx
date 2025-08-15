import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { RouterProvider, createBrowserRouter, Navigate, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useContext, useEffect, useRef } from 'react';
import { AuthContext } from './contexts/AuthContext';
import { DocumentProvider } from './contexts/DocumentContext';

// Pages
import RootLayout from './pages/RootLayout';
import LandingPage from './pages/LandingPage';
import ErrorPage from './pages/ErrorPage';
import MapPage from './pages/MapPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DocumentCreationPage from './pages/DocumentCreationPage';
import ScrollableDocumentsList from './components/ListDocument';
import SlideShow from './pages/SlideShow';

function InactivityHandler({ children }) {
  const navigate = useNavigate();
  const timerRef = useRef(null);

  const resetTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      navigate('/'); // redirect to slide show ("/") after inactivity
    }, 7000); // 10 seconds
  };

  useEffect(() => {
    const events = ['mousemove', 'mousedown', 'touchstart', 'keydown'];
    events.forEach((event) => window.addEventListener(event, resetTimer));
    resetTimer();

    return () => {
      events.forEach((event) => window.removeEventListener(event, resetTimer));
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return children;
}

function AppRoutes() {
  const { loggedIn } = useContext(AuthContext);

  const router = createBrowserRouter([
    {
      element: <InactivityHandler><RootLayout /></InactivityHandler>,
      errorElement: <ErrorPage />,
      children: [
        { path: '/', element: <SlideShow /> }, // ✅ slide show on initial load
        { path: '/landing', element: <LandingPage /> }, // ✅ landing after slideshow
        { path: '/map', element: <MapPage /> },
        { path: '/register', element: loggedIn ? <Navigate to="/map" /> : <RegisterPage /> },
        { path: '/login', element: loggedIn ? <Navigate to="/map" /> : <LoginPage /> },
        { path: '/document-creation', element: <DocumentCreationPage /> },
        { path: '/documents-list', element: <ScrollableDocumentsList /> },
        { path: '*', element: <Navigate to="/" /> }
      ]
    }
  ]);

  return <RouterProvider router={router} />;
}

function App() {
  return (
    <DocumentProvider>
      <AppRoutes />
      <ToastContainer 
        position="top-center" 
        autoClose={3000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
      />
    </DocumentProvider>
  );
}

export default App;
