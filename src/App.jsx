import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoadingScreen from "./Components/LoadingScreen.jsx";

const Home = lazy(() => import("./Components/Home.jsx"));
const Showroom = lazy(() => import("./pages/Showroom.jsx"));
const CarViewer = lazy(() => import("./Components/CarViewer.jsx"));

// Wraps CarViewer in its own Suspense so the global one never
// gets involved in CarViewer's lifecycle at all.
function CarViewerRoute() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <CarViewer />
    </Suspense>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/showroom" element={<Showroom />} />
          <Route path="/showroom/:carId" element={<CarViewerRoute />} />
          <Route path="/car/:carId" element={<CarViewerRoute />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
