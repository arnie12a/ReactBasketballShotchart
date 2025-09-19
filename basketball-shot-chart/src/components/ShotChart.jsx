import React, { useState } from "react";
import "../App.css";

const ShotChart = () => {
  // court constants
  const courtWidth = 600;
  const courtHeight = 500;
  const hoopX = courtWidth / 2; // center X
  const hoopY = 45; // hoop position
  const threeRadius = 220; // radius for 3PT arc

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

          {/* Painted area (bigger than before) */}
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

          {/* Three-point line: straight sidelines + arc */}
          {/* Left sideline */}
          <line
            x1={hoopX - 220}
            y1={courtHeight-100}
            x2={hoopX - 220}
            y2={hoopY + 10}
            stroke="#333"
            strokeWidth="3"
          />
          {/* Right sideline */}
          <line
            x1={hoopX + 220}
            y1={courtHeight -100}
            x2={hoopX + 220}
            y2={hoopY + 10}
            stroke="#333"
            strokeWidth="3"
          />
          {/* Arc */}
          <path
            d={`M ${hoopX + 220} ${hoopY - 10}
               A ${threeRadius} ${threeRadius} 0 0 1 ${hoopX - 220} ${hoopY - 10}`}
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
