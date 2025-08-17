import { Outlet, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavHeader from "../components/NavHeader";
import { useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import styles from './RootLayout.module.css';

function RootLayout() {
    const { message, setMessage } = useContext(AuthContext);
    const location = useLocation();

    useEffect(() => {
        if (message) {
            toast(message.msg, {
                type: message.type
            });

            setMessage('');
        }
    }, [message, setMessage]);

    // Hide NavHeader only on slideshow (/)
    const hideNavbar = location.pathname === "/";

    return (
        <main className={styles.wrap}>
            {!hideNavbar && <NavHeader />}
            <Outlet />
        </main>
    );
}

export default RootLayout;
