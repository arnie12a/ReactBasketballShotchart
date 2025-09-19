// src/Controls.jsx
function Controls({ selected, setSelected }) {
    return (
      <div className="controls">
        <h3>Add Shots here</h3>
        <p>Select where you shot the ball.</p>
        <p>Did you make or miss the shot?</p>
        <form>
          <label>
            <input
              type="radio"
              value="made"
              checked={selected === "made"}
              onChange={(e) => setSelected(e.target.value)}
            />
            Made Shot
          </label>
          <br />
          <label>
            <input
              type="radio"
              value="missed"
              checked={selected === "missed"}
              onChange={(e) => setSelected(e.target.value)}
            />
            Missed Shot
          </label>
        </form>
      </div>
    );
  }
  
  export default Controls;
  