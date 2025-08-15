import React from 'react';
import styles from './SlidePages.module.css';

function Slide1() {
  return (
    <div className={styles.slidePage}>
      <div className={styles.slideCard}>
        <div className={styles.title}>Kiruna Explorer</div>
        <div className={styles.content}>
          A digital tool to narrate the urban{"\n"}
          transformation of the{"\n"}
          European Capital of{"\n"}
          Culture 2029
        </div>
      </div>
    </div>
  );
}

export default Slide1;
