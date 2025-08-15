import React from 'react';
import styles from './SlidePages.module.css';

function Slide2() {
  return (
    <div className={styles.slidePage}>
      <div className={styles.slideCard}>
        <div className={styles.title}>Kiruna Explorer</div>
        <div className={styles.content}>
          You are navigating a beta version{"\n"}
          developed at Politecnico di Torino{"\n"}
          in collaboration with{"\n"}
          the City of Kiruna
        </div>
      </div>
    </div>
  );
}

export default Slide2;
