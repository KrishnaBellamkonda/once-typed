import React from "react";
import { useState, useEffect } from "react";

import Header from "../components/Header";
import { countUniqueWords, formatDate } from "../Utility";
import { FaInfoCircle } from "react-icons/fa";
import StatsOverlay from "../components/StatsOverlay";
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import Footer from "../components/Footer";

function HistoryPage() {
  const [entries, setEntries] = useState([]);
  useEffect(() => {
    const storedEntries = JSON.parse(localStorage.getItem("entries"));
    console.log(storedEntries);

    if (storedEntries) {
      setEntries((old) => storedEntries);
    }
  }, []);

  const infoHandler = (e) => {
    const index = e.target.key;
  };


  return (
    <div className="history-page bg-color">
      <div className="container flex-column large-gap">
        <Header />
        <div className="history-components">
          {entries.length === 0 && (
            <p>
              Looks like there are no saved notebook. You seriously need to
              start writing!
            </p>
          )}
          {entries.map((entry, index) => {
            const formattedDate = formatDate(entry.time);
            const dateString = formattedDate[0];
            const dayString = formattedDate[1];
            const timeString = formattedDate[2];
            const propmt = entry.prompt;
            const inputText = entry.text;

            const statsString = `
            Time: ${entry.timeSettings} seconds
            <br/>
            No. of words: ${entry.numberOfWords}
            <br/>
            No. of characters: ${entry.numberOfCharacters}
            <br/>
            `;

            console.log(entry);
            return (
              <div
                className="history-component flex-column medium-gap"
                key={index}
              >
                <div className="history-header flex-column small-gap">
                  <div className="history-header-date flex space-between">
                    <div className="flex small-gap">
                      <h4>{dateString}</h4>
                      <h4>{dayString}</h4>
                    </div>

                    <FaInfoCircle
                      data-tooltip-html={statsString}
                      data-tooltip-id={`info_${index}`}
                      className="info-icon"
                      color="#F4F2E0"
                    />
                    <Tooltip id={`info_${index}`} />
                  </div>
                  <h4>{timeString}</h4>
                </div>
                <h3 className="history-prompt-text">{propmt}</h3>
                <div className="history-content">
                  <p className="history-content-p">{inputText}</p>
                </div>
              </div>
            );
          })}
        </div>
        {/* <Footer /> */}
      </div>

    </div>
  );
}

export default HistoryPage;
