import React from "react";

function StatsOverlay({ onClose }) {
  return (
    <div className="overlay">
      <div className="content">
        <h2>Stats</h2>
        {/* Display stats here */}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default StatsOverlay;
