import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home.jsx";
import Form from "./components/Form.jsx";
import Alldocs from "./components/Alldocs.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/documents/upload" element={<Form />} />
          <Route path="/documents" element={<Alldocs />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
