import React, { useState } from "react";
import "../App.css";

const ShotChart = () => {
  const courtWidth = 600;
  const courtHeight = 500;
  const hoopX = courtWidth / 2; 
  const hoopY = 45; 
  const threeRadius = 120; 
  const freeThrowRadius = 80; // semicircle radius for free throw line

  const [shots, setShots] = useState([]);
  const [shotType, setShotType] = useState("made");

  const handleCourtClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setShots((s) => [...s, { x, y, type: shotType }]);
  };

  return (
    <div className="container">
      <h1>Basketball Shot Chart</h1>

      <div
        className="court"
        onClick={handleCourtClick}
        style={{ width: courtWidth, height: courtHeight }}
      >
        <svg
          className="svg-court"
          viewBox={`0 0 ${courtWidth} ${courtHeight}`}
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Court background */}
          <rect x="0" y="0" width={courtWidth} height={courtHeight} fill="#f5deb3" />

          {/* Painted area */}
          <rect
            x={(courtWidth - 160) / 2}
            y={30}
            width="160"
            height="190"
            rx="10"
            fill="rgba(255,255,0,0.18)"
            stroke="#222"
            strokeWidth="2"
          />

          {/* Free throw semicircle (top of key, rotated 180°) */}
          <path
            d={`
              M ${hoopX - freeThrowRadius} 220
              A ${freeThrowRadius} ${freeThrowRadius} 0 0 0 ${hoopX + freeThrowRadius} 220
            `}
            fill="none"
            stroke="#333"
            strokeWidth="2"
          />


          {/* Three-point line */}
          {/* Left sideline */}
          
          <line x1="50" y1="50" x2="50" y2="450" stroke="#333" strokeWidth="3" />
          
          {/* Right sideline */}
          <line x1="550" y1="50" x2="550" y2="450" stroke="#333" strokeWidth="3" />

          {/* Arc */}
          <path
            d={`M ${hoopX - 220} ${hoopY + 10}
               A ${threeRadius} ${threeRadius} 0 0 0 ${hoopX + 220} ${hoopY + 10}`}
            fill="none"
            stroke="#333"
            strokeWidth="3"
          />

          {/* Backboard */}
          <rect
            x={hoopX - 40}
            y={hoopY - 16}
            width="80"
            height="6"
            fill="#ffffff"
            stroke="#ccc"
            strokeWidth="1"
          />

          {/* Rim */}
          <circle
            cx={hoopX}
            cy={hoopY + 8}
            r={18}
            stroke="#c0392b"
            strokeWidth="4"
            fill="none"
          />
        </svg>

        {/* Shots */}
        {shots.map((shot, i) => (
          <div
            key={i}
            className={`shot ${shot.type === "made" ? "made" : "missed"}`}
            style={{
              left: `${shot.x - 10}px`,
              top: `${shot.y - 10}px`,
            }}
          >
            {shot.type === "made" ? "O" : "X"}
          </div>
        ))}
      </div>

      <div className="controls">
        <label>
          <input
            type="radio"
            value="made"
            checked={shotType === "made"}
            onChange={(e) => setShotType(e.target.value)}
          />
          Made
        </label>

        <label>
          <input
            type="radio"
            value="missed"
            checked={shotType === "missed"}
            onChange={(e) => setShotType(e.target.value)}
          />
          Missed
        </label>

        <button type="button" onClick={() => setShots([])}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default ShotChart;
