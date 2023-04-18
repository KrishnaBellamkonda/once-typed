import React, { useState, useEffect } from "react";
import { FaTrashAlt } from 'react-icons/fa';

import Header from "../components/Header";
import Footer from "../components/Footer";

const AddPrompts = () => {
  const [prompts, setPrompts] = useState(JSON.parse(localStorage.getItem("prompts"))||[]);
  const [newPrompt, setNewPrompt] = useState("");

  useEffect(() => {
    const storedPrompts = JSON.parse(localStorage.getItem("prompts"));
    if (storedPrompts) {
      setPrompts(old=>storedPrompts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("prompts", JSON.stringify(prompts));
  }, [prompts]);

  const handleInputChange = (event) => {
    setNewPrompt(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (!newPrompt.trim()) {
      alert("Please enter a non-empty prompt!");
      return;
    }

    if (prompts.includes(newPrompt)) {
      alert("This prompt is already in the list!");
      return;
    }

    setPrompts([...prompts, newPrompt]);
    setNewPrompt("");
    localStorage.setItem("prompts", JSON.stringify([...prompts, newPrompt]));
  };

  const deletePrompt = (prompt) => {
    const prompts = JSON.parse(localStorage.getItem("prompts"));
    const filteredPrompts = prompts.filter((p) => p !== prompt);
    localStorage.setItem("prompts", JSON.stringify(filteredPrompts));
  };

  const handleDelete = (prompt) => {
    deletePrompt(prompt);
    setPrompts(prompts.filter((p) => p !== prompt));
  };

  return (
    <div className="add-prompts-page bg-color ">
      <div className="container flex-column large-gap">
        <Header />
        <h3>Prompts</h3>
        <div className="flex-column medium-gap center-aligned-container">
          <textarea
            type="text"
            cols={40}
            rows={5}
            value={newPrompt}
            onChange={handleInputChange}
            placeholder={"Add your prompt here"}
          />
          <button className="button" onClick={handleFormSubmit} type="submit">
            Add Prompt
          </button>
        </div>
        <div className="your-prompts flex-column medium-gap">
          <h3>Your prompts</h3>
          <div className="flex-column small-gap">
            {prompts.map((prompt, index) => (
              <div className="prompt-tab flex space-between center-aligned-container" key={prompt}>
                <div className="prompt-content"><span>{prompt}</span></div>
                <div className="prompt-icon">
                    <FaTrashAlt color="#FF4136" onClick={() => handleDelete(prompt)} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* <Footer /> */}
      </div>
    </div>
  );
};

export default AddPrompts;
