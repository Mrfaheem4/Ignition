# Ignition

Ignition is an immersive automotive visualizer built with React, Three.js, and Vite. Browse a curated collection of cars, open interactive 3D models, inspect vehicle details through hotspots, and move between camera views with smooth, cinematic transitions.

## Features

- Curated automotive showroom with responsive car cards and specifications
- Interactive 3D vehicle viewer powered by React Three Fiber and Three.js
- Orbit controls for exploring each vehicle from any angle
- Cinematic camera intro and animated transitions between viewpoints
- Interactive hotspots for viewing vehicle details and features
- Ambient background music with play and pause controls
- HDRI environment lighting and contact shadows
- Responsive interface styled with Tailwind CSS
- Lazy-loaded routes for smaller initial bundles
- GLTF/GLB model preloading for faster navigation
- Performance-focused rendering with demand-based frame updates and adaptive pixel density
- Vercel SPA rewrites and long-term asset caching

## Technology Stack

- **React 19** — UI and route-based application structure
- **Vite** — Development server and production build tooling
- **React Router** — Client-side navigation
- **Three.js** — 3D rendering
- **React Three Fiber** — React renderer for Three.js
- **React Three Drei** — 3D helpers including orbit controls, environments, and shadows
- **GSAP** — Camera and interface animations
- **Tailwind CSS** — Styling and responsive layouts
- **OGL** — Visual effects used by the interface

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm
- A browser with WebGL support for the 3D viewer

### Installation

Clone the repository and install the dependencies:

```bash
git clone https://github.com/Mrfaheem4/Ignition.git
cd Ignition
npm install
```

### Run the development server

```bash
npm run dev
```

Vite will print the local development URL in your terminal, usually `http://localhost:5173`.

### Create a production build

```bash
npm run build
```

### Preview the production build locally

```bash
npm run preview
```

### Run linting

```bash
npm run lint
```

## Application Routes

| Route | Description |
| --- | --- |
| `/` | Redirects to the home page |
| `/home` | Landing page for the experience |
| `/showroom` | Browse the available vehicle collection |
| `/car/:carId` | Open a vehicle's interactive 3D viewer |
| `/showroom/:carId` | Alternate route for opening a vehicle viewer |

## Project Structure

```text
.
├── public/                 # 3D models, HDRI files, logos, and audio assets
├── src/
│   ├── Components/         # Reusable UI and 3D viewer components
│   ├── data/               # Vehicle data and viewer configuration
│   ├── pages/               # Route-level pages such as the showroom
│   ├── utils/               # Model preloading and shared utilities
│   ├── App.jsx              # Application routes
│   ├── index.css            # Global styles
│   └── main.jsx             # React entry point
├── index.html
├── tailwind.config.js
├── vite.config.js
└── vercel.json
```

## Performance

Ignition is designed to keep the 3D experience responsive, especially during vehicle navigation:

- Current and adjacent vehicle models are preloaded when possible.
- Showroom preloading is scheduled during browser idle time.
- The Three.js canvas uses demand-based rendering and a capped device pixel ratio.
- Contact shadow resolution and GPU settings are tuned for a balance between quality and performance.
- Routes are lazy-loaded with React `Suspense` boundaries.
- Static assets such as models, images, and audio are configured for immutable caching on Vercel.

More details are available in [`PERFORMANCE_OPTIMIZATIONS.md`](./PERFORMANCE_OPTIMIZATIONS.md).

## Asset Credits

The application currently references the following asset sources in the showroom interface:

- 3D models: Sketchfab
- HDRI environment: Poly Haven
- Vehicle logos: CarsLogo.org

Please review and comply with the license terms for each asset before redistributing the application or its assets.

## Deployment

The repository includes a `vercel.json` configuration with:

- SPA rewrites to support React Router routes
- Long-term caching for 3D, image, and audio assets
- Security-related response headers

To deploy with Vercel, import the repository into a Vercel project. The default Vite build command and output directory should be detected automatically.

## License

No license has been specified for this repository yet. Until a license is added, the source code and bundled assets should be treated as **all rights reserved**.

## Credits

Built as an automotive visualization experience by **Showroom Studio**.
