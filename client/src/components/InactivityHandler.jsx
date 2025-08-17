import { useState, useEffect, useRef, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";  // ✅ check login state
import styles from "./InactivityHandler.module.css";

function InactivityHandler({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { loggedIn } = useContext(AuthContext);

  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [showInactivityPrompt, setShowInactivityPrompt] = useState(false);
  const [countdown, setCountdown] = useState(10);

  const countdownRef = useRef(null);
  const inactivityTimerRef = useRef(null);
  const redirectTimerRef = useRef(null);

  
  useEffect(() => {
    if (!loggedIn && location.pathname === "/map") {
      const loginTimer = setTimeout(() => {
        setShowLoginPrompt(true);
      }, 7000); // 7s delay for login prompt

      return () => clearTimeout(loginTimer);
    }
  }, [location.pathname, loggedIn]);

  // Handle login answers ---
  const handleLoginYes = () => {
    setShowLoginPrompt(false);
    navigate("/login"); 
  };

  const handleLoginNo = () => {
    setShowLoginPrompt(false);

    // After 10s → show inactivity modal
    inactivityTimerRef.current = setTimeout(() => {
      setShowInactivityPrompt(true);

      // reset countdown
      setCountdown(10);

      // start countdown
      countdownRef.current = setInterval(() => {
        setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);

      // auto redirect after countdown
      redirectTimerRef.current = setTimeout(() => {
        setShowInactivityPrompt(false); 
        if (countdownRef.current) clearInterval(countdownRef.current);
        navigate("/");
      }, 10000);
    }, 10000);
  };

  // --- Step 3: Handle inactivity "Stay" ---
  const handleStay = () => {
    setShowInactivityPrompt(false);
    setCountdown(10);

    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    if (countdownRef.current) clearInterval(countdownRef.current);
    if (redirectTimerRef.current) clearTimeout(redirectTimerRef.current);
  };

  // --- Cleanup timers on unmount ---
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
      if (countdownRef.current) clearInterval(countdownRef.current);
      if (redirectTimerRef.current) clearTimeout(redirectTimerRef.current);
    };
  }, []);

  return (
    <>
      {children}

      {/* Login prompt */}
      {showLoginPrompt && (
        <div className={styles.overlay}>
          <div className={styles.modalBox}>
            <h2 className={styles.title}>
              Would you like to login as an urban planner to explore the app functionalities?
            </h2>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
              <button onClick={handleLoginYes} className={styles.stayButton}>
                Yes
              </button>
              <button onClick={handleLoginNo} className={styles.stayButton}>
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Inactivity prompt */}
      {showInactivityPrompt && (
        <div className={styles.overlay}>
          <div className={styles.modalBox}>
            <h2 className={styles.title}>Are you still there?</h2>
            <p className={styles.countdownText}>
              Redirecting in <strong>{countdown}</strong> seconds...
            </p>
            <button onClick={handleStay} className={styles.stayButton}>
              Yes, I’m here
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default InactivityHandler;
