import React, { useState, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { FaArrowsAltV } from 'react-icons/fa';
import MapComponent from '../components/Map';
import Diagram from "../components/Diagram";
import { MapLayoutProvider, useMapLayoutContext } from '../contexts/MapLayoutContext';
import styles from './MapPage.module.css';
import { DocumentContext } from '../contexts/DocumentContext';

function MapPage() {
    const { visualizeDiagram } = useContext(DocumentContext); // Must be true for diagram to show
    const { setIsMapHigh } = useMapLayoutContext();

    const containerRef = useRef(null);
    const maxHeight = window.innerHeight * 0.91;
    const minHeight = 0;

    const [diagramHeight, setDiagramHeight] = useState(300); // ✅ Default to visible, not full
    const [dragging, setDragging] = useState(false);

    const startDrag = (e) => {
        setDragging(true);
        e.preventDefault();
    };

    const stopDrag = () => setDragging(false);

    const handleDrag = (e) => {
        if (dragging) {
            const newHeight = containerRef.current.offsetTop + containerRef.current.clientHeight - e.clientY;
            const maxHeight = window.innerHeight - containerRef.current.offsetTop;

            if (newHeight > 0 && newHeight < maxHeight) {
                setDiagramHeight(newHeight);
                setIsMapHigh(newHeight < 250);
            }
        }
    };

    const handleClick = () => {
        setDiagramHeight(minHeight); // Collapse
    };

    const handleDoubleClick = () => {
        setDiagramHeight(maxHeight); // Expand
    };

    const navigate = useNavigate();

useEffect(() => {
  const timer = setTimeout(() => {
    navigate('/'); // redirect back to main page after 10s
  }, 60000);

  return () => clearTimeout(timer); // cleanup if user leaves earlier
}, [navigate]);


    return (
        <div
            className={styles.mainContainer}
            ref={containerRef}
            onMouseMove={handleDrag}
            onMouseUp={stopDrag}
            onMouseLeave={stopDrag}
            tabIndex="0"
            role="button"
        >
            <div className={styles.mapContainer}>
                <MapComponent />
            </div>

            {visualizeDiagram && (
                <div className="diagramComponents">
                    <div
                        className={styles.resizeBar}
                        onMouseDown={startDrag}
                        onClick={handleClick}
                        onDoubleClick={handleDoubleClick}
                        tabIndex="0"
                        role="button"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                handleClick();
                            } else if (e.key === 'ArrowUp') {
                                handleDoubleClick();
                            }
                        }}
                    >
                        <FaArrowsAltV className={styles.resizeIcon} />
                    </div>

                    <div className={styles.diagramContainer} style={{ height: diagramHeight }}>
                        <Diagram />
                    </div>
                </div>
            )}
        </div>
    );
}

export default function App() {
    return (
        <MapLayoutProvider>
            <MapPage />
        </MapLayoutProvider>
    );
}
