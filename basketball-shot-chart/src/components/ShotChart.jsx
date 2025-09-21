import React, { useState } from "react";
import html2canvas from "html2canvas";
import "../App.css";

const ShotChart = () => {
  const courtWidth = 600;
  const courtHeight = 500;
  const hoopX = courtWidth / 2;
  const hoopY = 45;
  const freeThrowRadius = 80;

  const [shots, setShots] = useState([]);
  const [shotType, setShotType] = useState("made");
  const [showModal, setShowModal] = useState(false);

  // form inputs
  const [team, setTeam] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");

  const handleCourtClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setShots((s) => [...s, { x, y, type: shotType }]);
  };

  const handleDownload = async () => {
    const element = document.getElementById("export-area");
    const canvas = await html2canvas(element);
    const link = document.createElement("a");
    link.download = `game-summary-${date || "game"}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  // calculate stats
  const made = shots.filter((s) => s.type === "made").length;
  const missed = shots.filter((s) => s.type === "missed").length;
  const total = made + missed;
  const pct = total > 0 ? ((made / total) * 100).toFixed(1) : 0;

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

          {/* Free throw semicircle */}
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
          <line x1="50" y1={hoopY + 8} x2="50" y2="220" stroke="#333" strokeWidth="3" />
          <line x1="550" y1={hoopY + 8} x2="550" y2="220" stroke="#333" strokeWidth="3" />
          <path
            d={`M 50 220
               A 250 250 0 0 0 550 220`}
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

        <button type="button" onClick={() => setShowModal(true)}>
          Save Game
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Game Info</h2>
            <label>
              Opponent Team:
              <input value={team} onChange={(e) => setTeam(e.target.value)} />
            </label>
            <label>
              Date:
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </label>
            <label>
              Notes:
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
            </label>
            <button
              onClick={() => {
                setShowModal(false);
                handleDownload();
              }}
            >
              Submit & Download PNG
            </button>
            <button onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Hidden export area for PNG */}
      <div id="export-area" style={{ padding: "20px", background: "#fff", display: "none" }}>
        <h2>Game Summary</h2>
        <p><strong>Team:</strong> {team}</p>
        <p><strong>Date:</strong> {date}</p>
        <p><strong>Notes:</strong> {notes}</p>
        <p><strong>Made:</strong> {made} | <strong>Missed:</strong> {missed} | <strong>FG%:</strong> {pct}%</p>
        <div style={{ position: "relative", width: courtWidth, height: courtHeight }}>
          {/* Clone of court with shots */}
          <svg
            className="svg-court"
            viewBox={`0 0 ${courtWidth} ${courtHeight}`}
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ position: "absolute", top: 0, left: 0 }}
          >
            <rect x="0" y="0" width={courtWidth} height={courtHeight} fill="#f5deb3" />
            {/* Could re-render other court details if you want */}
          </svg>
          {shots.map((shot, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                left: `${shot.x - 10}px`,
                top: `${shot.y - 10}px`,
                color: shot.type === "made" ? "green" : "red",
                fontWeight: "bold",
              }}
            >
              {shot.type === "made" ? "O" : "X"}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShotChart;
