import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoadingScreen from "./Components/LoadingScreen.jsx";

const Home = lazy(() => import("./Components/Home.jsx"));
const Showroom = lazy(() => import("./pages/Showroom.jsx"));
const CarViewer = lazy(() => import("./Components/CarViewer.jsx"));

// Wrap each route in its own Suspense to isolate loading states
function HomeRoute() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Home />
    </Suspense>
  );
}

function ShowroomRoute() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Showroom />
    </Suspense>
  );
}

// CarViewer retains its own Suspense to prevent WebGL context loss
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
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<HomeRoute />} />
        <Route path="/showroom" element={<ShowroomRoute />} />
        <Route path="/showroom/:carId" element={<CarViewerRoute />} />
        <Route path="/car/:carId" element={<CarViewerRoute />} />
      </Routes>
    </BrowserRouter>
  );
}
