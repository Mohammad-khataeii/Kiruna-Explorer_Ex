import React from 'react';
import styles from './SlidePages.module.css';

function Slide3() {
  return (
    <div className={styles.slidePage}>
      <div className={styles.slideCard}>
        <div className={styles.title}>Kiruna Explorer</div>
        <div className={styles.content}>
          Explore the transformation{"\n"}
          Login as resident / urban planner
        </div>
      </div>
    </div>
  );
}

export default Slide3;
