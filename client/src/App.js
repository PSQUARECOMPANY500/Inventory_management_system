import "./App.css";

// Importing components
import Navbar from "./components/Navbar";
import ScanQr from "./components/ScanQr";
import Login from "./components/Login";
import Register from "./components/Register";
import GenerateQr from "./components/GenerateQr";
import Homepage from "./components/Homepage";
import EditData from "./components/EditData";

// Importing react-router-dom to handle routing
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/scan-qr-code" element={<ScanQr />} />
        <Route path="/generate-qr-code" element={<GenerateQr />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/edit/:id" element={<EditData />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
