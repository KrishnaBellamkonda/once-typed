import React from "react";

function Stats({ inputText, stats }) {

  return (
    <div>
      <div className="">
        <p>Time</p>
        <p>{stats.timeSettings} seconds</p>
      </div>
      <div className="">
        <p>Number of Characters</p>
        <p>{stats.numberOfCharacters}</p>
      </div>
      <div className="">
        <p>Number of Words</p>
        <p>{stats.numberOfWords}</p>
      </div>
    </div>
  );
}

export default Stats;
