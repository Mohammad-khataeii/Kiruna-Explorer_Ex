import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Slide1 from './Slide1';
import Slide2 from './Slide2';
import Slide3 from './Slide3';
import Slide4 from './Slide4';

const SLIDE_DURATION = 5000; // ms per slide

// Store component types, not JSX elements
const slides = [Slide1, Slide2, Slide3, Slide4];

function SlideShow() {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (index >= slides.length) return; // safety guard

    const timer = setTimeout(() => {
      if (index < slides.length - 1) {
        setIndex((i) => i + 1);
      } else {
        navigate('/map');
      }
    }, SLIDE_DURATION);

    return () => clearTimeout(timer);
  }, [index, navigate]);

  if (index >= slides.length) return null; // avoid out-of-bounds render

  const CurrentSlide = slides[index];
  return <CurrentSlide />;
}

export default SlideShow;
