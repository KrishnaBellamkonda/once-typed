import React, { useState, useRef, useEffect } from "react";
import { FiClipboard } from "react-icons/fi";

function TextInputComponent({
  isTimerRunning,
  isTimerComplete,
  setTimerComplete,
  inputText,
  setInputText,
  inputRef
}) {

  useEffect(() => {
    const inputElement = inputRef.current;
    function handleKeyDown(event) {
      if (event.keyCode === 8 || event.keyCode === 46) {
        // Check for backspace or delete keys
        event.preventDefault(); // Prevent default behavior of these keys
      }
    }
    inputElement.addEventListener("keydown", handleKeyDown);
    return () => {
      inputElement.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  function handleInputChange(event) {
    const value = event.target.value;
    setInputText(old=>value);
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(inputText).then(
      () => {
        console.log("Text copied to clipboard");
      },
      () => {
        console.log("Failed to copy text to clipboard");
      }
    );
  }

  return (
    <div>
      <div className="text-input-area flex-column center-aligned-container">

          <div className="text-input-header flex space-between">
            {
              isTimerComplete ? <p>Countdown finished</p>:<p>Ready</p>
            }
            <FiClipboard onClick={copyToClipboard} color={"#F4F2E0"}/>
          </div>

        <textarea
          ref={inputRef}
          type="text"
          value={inputText}
          onChange={handleInputChange}
          disabled={!isTimerRunning}
          rows={20}
          cols={40}
          readOnly={isTimerComplete}
        />
      </div>
    </div>
  );
}

export default TextInputComponent;
