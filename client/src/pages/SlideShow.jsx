import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Slide1 from './Slide1';
import Slide2 from './Slide2';
import Slide3 from './Slide3';

const slides = [<Slide1 />, <Slide2 />, <Slide3 />];

function SlideShow() {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (index >= slides.length) {
      navigate('/map'); // ✅ go to landing page
      return;
    }

    const timer = setTimeout(() => {
      setIndex((prev) => prev + 1);
    }, 5000); // 7s per slide

    return () => clearTimeout(timer);
  }, [index, navigate]);

  return <>{slides[index]}</>;
}

export default SlideShow;
