import React, { useState } from "react";
import "../App.css"; // import CSS

const ShotChart = () => {
  const [shots, setShots] = useState([]);
  const [shotType, setShotType] = useState("made");

  const handleCourtClick = (e) => {
    const court = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - court.left;
    const y = e.clientY - court.top;
    setShots([...shots, { x, y, type: shotType }]);
  };

  return (
    <div className="container">
      <h1>Basketball Shot Chart</h1>

      {/* Court */}
      <div className="court" onClick={handleCourtClick}>
        {/* Hoop */}
        <div className="hoop"></div>

        {/* Painted area */}
        <div className="painted-area"></div>

        {/* Shots */}
        {shots.map((shot, i) => (
          <div
            key={i}
            className={`shot ${shot.type === "made" ? "made" : "missed"}`}
            style={{ left: shot.x - 10, top: shot.y - 10 }}
          >
            {shot.type === "made" ? "O" : "X"}
          </div>
        ))}
      </div>

      {/* Controls */}
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
      </div>
    </div>
  );
};

export default ShotChart;
