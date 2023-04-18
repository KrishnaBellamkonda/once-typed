import React from "react";
import { useState, useEffect, useRef } from "react";
import { IoIosRefresh } from "react-icons/io";

// Components
import TextInputComponent from "../components/TextInputComponent";
import CountDownTimer from "../components/CountDownTimer";
import Stats from "../components/Stats";
import SaveButton from "../components/SaveButton";
import Header from "../components/Header";
import Footer from "../components/Footer";

// Utility functions
import { countNumberOfCharacters, countUniqueWords } from "../Utility";
import Graph from "../components/Graph";

// Prompts
const defaultPrompts = [
  "What are the advantages and disadvantages of social media?",
  "Is technology making us more or less social?",
  "What is the impact of automation on the job market?",
  "Should animals be used for scientific experimentation?",
  "What is the role of government in society?",
  "How can we reduce our carbon footprint?",
];

function HomePage() {
  // State
  const [timeLeft, setTimeLeft] = useState(6);
  const [initialTime, setInitialTime] = useState(6);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isTimerComplete, setIsTimerComplete] = useState(false);
  const [inputText, setInputText] = useState("");
  const [prompt, setPrompt] = useState("");
  const [stats, setStats] = useState({});
  const [wps, setWps] = useState([]);
  const [cps, setCps] = useState([]);
  const [timesteps, setTimesteps] = useState([]);
  const [numberOfWords, setNumberOfWords] = useState([]);

  const [prompts, setPrompts] = useState(() => {
    const storedPrompts = localStorage.getItem("prompts");
    return storedPrompts.length ? JSON.parse(storedPrompts) : defaultPrompts;
  });

  // Initializing a random prompt
  useEffect(() => {

    if (prompts && prompts.length) {
      const randomIndex = Math.floor(Math.random() * prompts.length);
      setPrompt(old=>prompts[randomIndex]);
    } else {
      const randomIndex = Math.floor(Math.random() * defaultPrompts.length);
      setPrompt(defaultPrompts[randomIndex]);
    }

  }, []);

  const selectRef = useRef(null);
  const inputRef = useRef(null);

  // Speed Tracking
  useEffect(() => {
    let timerId;
    if (isTimerRunning && timeLeft > 0) {
      // calculate stats and add to history
      const elapsedTime = initialTime - timeLeft;
      const wordsTyped = countUniqueWords(inputText);
      const charactersTyped = countNumberOfCharacters(inputText);
      const wps = wordsTyped / elapsedTime;
      const cps = charactersTyped / elapsedTime;

      setWps((old) => [...old, wps]);
      setCps((old) => [...old, cps]);
      setTimesteps((old) => [...old, elapsedTime]);
      setNumberOfWords((old) => [...old, wordsTyped]);
    }
  }, [isTimerRunning, timeLeft]);

  // Restart Timer function
  function restartTimer() {
    setIsTimerComplete((old) => false);
    setIsTimerRunning((old) => false);
    setTimeLeft((old) => selectRef.current.value * 60);
    setInputText((old) => "");
    setPrompt(
      (old) => defaultPrompts[Math.floor(Math.random() * defaultPrompts.length)]
    );
    inputRef.current.value = "";
    // Clear Stats
    setWps((old) => []);
    setCps((old) => []);
    setTimesteps((old) => []);
    setNumberOfWords((old) => []);
  }

  function redoPrompt() {
    if (prompts && prompts.length) {
      const randomIndex = Math.floor(Math.random() * prompts.length);
      setPrompt(old=>prompts[randomIndex]);
    } else {
      const randomIndex = Math.floor(Math.random() * defaultPrompts.length);
      setPrompt(
        (old) => defaultPrompts[randomIndex]
      );
    }

  }

  // Generate the statistics for this entry
  useEffect(() => {
    if (isTimerComplete) {
      const newStats = {
        numberOfCharacters: countNumberOfCharacters(inputText),
        numberOfWords: countUniqueWords(inputText),
        timeSettings: initialTime, // in seconds
      };

      setStats((old) => newStats);
    }
  }, [isTimerComplete]);

  // Handling different timer settings - 3 minutes, 5 minutes
  function handleTimeChange(event) {
    const timeInMinutes = Number(event.target.value);
    setTimeLeft((old) => timeInMinutes * 60);
    setInitialTime((old) => timeInMinutes * 60);
  }

  return (
    <div className="home-page bg-color">
      <div className="container flex-column large-gap">
        <Header />
        <p className="desc">
          Empower your mind with clarity. Thinking before you type helps
          structure your thoughts and convey the right meaning. Add custom
          prompts in the "Add prompts" page.
        </p>

        <div className="timer flex-column medium-gap">
          <h2 className="timer-heading">Time Left: {timeLeft}s</h2>
          <div className="flex small-gap">
            <select
              className="timer-select"
              onChange={handleTimeChange}
              ref={selectRef}
              disabled={isTimerRunning}
            >
              <option value={0.1}>6 seconds</option>
              <option value={3}>3 minutes</option>
              <option value={5}>5 minutes</option>
              <option value={10}>10 minutes</option>
            </select>

            <CountDownTimer
              timeLeft={timeLeft}
              setTimeLeft={setTimeLeft}
              isTimerRunning={isTimerRunning}
              setIsTimerRunning={setIsTimerRunning}
              isTimerComplete={isTimerComplete}
              setIsTimerComplete={setIsTimerComplete}
              selectRef={selectRef}
              setInputText={setInputText}
              inputRef={inputRef}
              restartTimer={restartTimer}
            />
          </div>
        </div>

        <div className="prompt flex align-center large-gap center-aligned-container space-between">
          <div className="prompt-text">
            <h3>{prompt}</h3>
          </div>
          <IoIosRefresh
            onClick={redoPrompt}
            className="redo-icon"
            color={"#F4F2E0"}
          />
        </div>

        <TextInputComponent
          isTimerRunning={isTimerRunning}
          isTimerComplete={isTimerComplete}
          setIsTimerComplete={setIsTimerComplete}
          inputText={inputText}
          setInputText={setInputText}
          inputRef={inputRef}
        />
        {isTimerComplete && (
          <>
            {/* <Stats inputText={inputText} stats={stats} /> */}
            <SaveButton
              inputText={inputText}
              prompt={prompt}
              stats={stats}
              restartTimer={restartTimer}
              numberOfWordsArr={numberOfWords}
              timesteps={timesteps}
              cps={cps}
              wps={wps}
            />
          </>
        )}

        {isTimerComplete && (
          <div className="flex-column medium-gap">
            <h2>Statistics</h2>
            <Graph
              stats={stats}
              wps={wps}
              cps={cps}
              timesteps={timesteps}
              numberOfWords={numberOfWords}
              inputText={inputText}
            />
          </div>
        )}

        {/* <Footer /> */}
      </div>
    </div>
  );
}

export default HomePage;
