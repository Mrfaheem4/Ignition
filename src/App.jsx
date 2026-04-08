import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Showroom from "./pages/Showroom.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/showroom/porsche" />} />
        <Route path="/showroom/:carId" element={<Showroom />} />
      </Routes>
    </BrowserRouter>
  );
}
