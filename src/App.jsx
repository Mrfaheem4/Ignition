import { lazy, Suspense } from "react";
import { preload } from "react-dom";
import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";
import LoadingScreen from "./Components/LoadingScreen.jsx";
import ErrorBoundary from "./Components/ErrorBoundary.jsx";
import cars from "./data/cars.js";

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

// A keyed viewer resets loading and camera state when the selected car changes.
function CarViewerRoute() {
  const { carId } = useParams();
  const car = cars.find((entry) => entry.id === carId);
  if (car) {
    // Start scene downloads alongside the lazy viewer chunk, rather than
    // waiting for that chunk to download, parse, and mount first.
    preload(car.model, { as: "fetch", crossOrigin: "anonymous" });
    preload("/concrete_1.hdr", { as: "fetch", crossOrigin: "anonymous" });
  }
  return (
    <ErrorBoundary key={carId}>
      <Suspense fallback={<LoadingScreen />}>
        <CarViewer key={carId} />
      </Suspense>
    </ErrorBoundary>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<HomeRoute />} />
          <Route path="/showroom" element={<ShowroomRoute />} />
          <Route path="/showroom/:carId" element={<CarViewerRoute />} />
          <Route path="/car/:carId" element={<CarViewerRoute />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
}
