// Imports
import { Routes, Route } from "react-router-dom";

// Components
import HomePage from "./routes/HomePage";
import HistoryPage from "./routes/HistoryPage";
import AddPrompts from "./routes/AddPrompts"

import './styles/style.scss'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/add-prompts" element={<AddPrompts />} />
      </Routes>
    </>
  );
}

export default App;
