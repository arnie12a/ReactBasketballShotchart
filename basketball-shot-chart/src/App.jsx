// src/App.jsx
import { useState } from "react";
import Court from "./Court";
import Controls from "./Controls";
import Stats from "./Stats";
import "./App.css";

function App() {
  const [shots, setShots] = useState([]); // {x, y, made}
  const [selected, setSelected] = useState(null); // "made" | "missed"

  const addShot = (x, y) => {
    if (!selected) return;
    setShots([...shots, { x, y, made: selected === "made" }]);
  };

  return (
    <div className="app">
      <Court shots={shots} addShot={addShot} />
      <div className="sidebar">
        <Controls selected={selected} setSelected={setSelected} />
        <Stats shots={shots} />
      </div>
    </div>
  );
}

export default App;
