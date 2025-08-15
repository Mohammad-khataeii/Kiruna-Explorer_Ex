// Slide4.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SlidePages.module.css';

function Slide4() {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate('/map');
  };

  return (
    <div className={styles.slidePage}>
      <div>
        <h1 className={styles.headline}>Kiruna Explorer</h1>
        <h1 
          className={styles.exploreLink} 
          onClick={handleExploreClick}
        >
          Explore the transformation
        </h1>
      </div>
    </div>
  );
}

export default Slide4;
