import React from "react";
import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";
import MainPage from "./pages/MainPage";
import MixPreviewPage from "./pages/MixPreviewPage";

const App = () => {
  return (
    <Router>
      <div className="App">
        <nav style={{ marginBottom: "1rem", display: "flex", gap: "1rem" }}>
          <Link to="/">🔬 Reverse Solver</Link>
          <Link to="/preview">🧪 Mix Preview</Link>
        </nav>

        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/preview" element={<MixPreviewPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
