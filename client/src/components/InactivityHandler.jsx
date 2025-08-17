import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./InactivityHandler.module.css";

function InactivityHandler({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [showInactivityPrompt, setShowInactivityPrompt] = useState(false);
  const [countdown, setCountdown] = useState(10); // inactivity countdown
  const countdownRef = useRef(null);
  const inactivityTimerRef = useRef(null);

  // Show login prompt 7s after reaching /map ---
  useEffect(() => {
    if (location.pathname === "/map") {
      const loginTimer = setTimeout(() => {
        setShowLoginPrompt(true);
      }, 7000); // 7s delay for login prompt
      return () => clearTimeout(loginTimer);
    }
  }, [location.pathname]);

  // Handle login answer ---
  const handleLoginYes = () => {
  setShowLoginPrompt(false);
  navigate("/login");   
};


  const handleLoginNo = () => {
    setShowLoginPrompt(false);

    // After 10s of login prompt dismissed → show inactivity
    inactivityTimerRef.current = setTimeout(() => {
      setShowInactivityPrompt(true);

      // start countdown
      countdownRef.current = setInterval(() => {
        setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);

      // auto redirect after countdown
      setTimeout(() => {
        navigate("/");
      }, 10000);
    }, 10000);
  };

  // --- Step 3: Handle inactivity stay ---
  const handleStay = () => {
    setShowInactivityPrompt(false);
    setCountdown(10);

    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    if (countdownRef.current) clearInterval(countdownRef.current);
  };

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
