import React from 'react'


function SaveButton({inputText, stats, prompt, restartTimer, wps, cps, timesteps, numberOfWordsArr}) {

    function saveDataToLocalStorage() {
        const newEntry = {
          prompt:prompt,
          time: new Date().getTime(),
          text: inputText,
          wps:wps, 
          cps:cps, 
          timesteps:timesteps,
          numberOfWordsArr:numberOfWordsArr, 
          ...stats,
        };
        const existingEntries = JSON.parse(localStorage.getItem('entries')) || [];
        localStorage.setItem('entries', JSON.stringify([...existingEntries, newEntry]));
        restartTimer() // Reset everything 

    }
      

  return (
    <div>
        <button className="button yellow-background-color" onClick={saveDataToLocalStorage}>Save to Notebook</button>
    </div>
  )
}

export default SaveButton;