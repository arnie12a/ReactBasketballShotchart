// src/Court.jsx
function Court({ shots, addShot }) {
    const handleClick = (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (x > 10 && x < rect.width - 10 && y > 10 && y < rect.height - 10) {
        addShot(x, y);
      }
    };
  
    return (
      <div className="court" onClick={handleClick}>
        {shots.map((shot, i) => (
          <div
            key={i}
            className={`shot ${shot.made ? "made" : "missed"}`}
            style={{ left: shot.x - 10, top: shot.y - 10 }}
          >
            {shot.made ? "O" : "X"}
          </div>
        ))}
      </div>
    );
  }
  
  export default Court;
  