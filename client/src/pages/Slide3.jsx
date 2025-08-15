// Slide3.jsx
import React from 'react';
import styles from './SlidePages.module.css';

function Slide3() {
  return (
    <div className={styles.slidePage}>
      <h1 className={styles.headline}>
        You are navigating a beta{" "}
        version developed at{" "}
        Politecnico di Torino in{" "}
        collaboration with the{" "}
        City of Kiruna
      </h1>
    </div>
  );
}

export default Slide3;
