import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Components/Home.jsx";
import Showroom from "./pages/Showroom.jsx";
import CarViewer from "./Components/CarViewer.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/showroom" element={<Showroom />} />
        <Route path="/showroom/:carId" element={<CarViewer />} />
        <Route path="/car/:carId" element={<CarViewer />} />
      </Routes>
    </BrowserRouter>
  );
}
