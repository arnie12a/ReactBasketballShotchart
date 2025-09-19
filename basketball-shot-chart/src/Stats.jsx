// src/Stats.jsx
function Stats({ shots }) {
    let twoPointMade = 0,
      twoPointTotal = 0,
      threePointMade = 0,
      threePointTotal = 0;
  
    const hoopX = 260;
    const hoopY = 8;
  
    shots.forEach((shot) => {
      const x = shot.x - hoopX;
      const y = shot.y - hoopY;
      const distance = Math.sqrt(x * x + y * y);
      if (distance <= 240) {
        twoPointTotal++;
        if (shot.made) twoPointMade++;
      } else {
        threePointTotal++;
        if (shot.made) threePointMade++;
      }
    });
  
    const totalMade = twoPointMade + threePointMade;
    const totalShots = twoPointTotal + threePointTotal;
    const fgPct = totalShots ? Math.round((totalMade / totalShots) * 100) : 0;
    const threePct = threePointTotal
      ? Math.round((threePointMade / threePointTotal) * 100)
      : 0;
    const points = twoPointMade * 2 + threePointMade * 3;
  
    return (
      <div className="stats">
        <h1>Shooting Statistics</h1>
        <h2>Pts: {points}</h2>
        {totalShots > 0 && (
          <p>
            FG: {totalMade}/{totalShots} ({fgPct}%) <br />
            3PT: {threePointMade}/{threePointTotal} ({threePct}%)
          </p>
        )}
      </div>
    );
  }
  
  export default Stats;
  