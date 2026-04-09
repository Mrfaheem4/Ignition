// ─── Base Template ───────────────────────────────────────────────────────────
const baseCarConfig = {
  intro: {
    text: { style: "fade", accent: "#ffffff" },
    startPosition: { x: 6, y: 4, z: 6 },
  },
  hotspots: [],
};

// ─── Mercedes AMG GT4 ─────────────────────────────────────────────────────────
const mercedesGT4 = {
  ...baseCarConfig,
  id: "mercedes_GT4",
  name: "AMG GT4",
  brand: "Mercedes-AMG",
  model: "/mercedes_GT4.glb",
  intro: {
    ...baseCarConfig.intro,
    startPosition: { x: 7, y: 4, z: 7 },
    text: { style: "fade", accent: "#c0a060" },
  },
  views: {
    default: {
      position: { x: 3.61, y: 1.07, z: -2.28 },
      lookAt: { x: 0, y: 0.5, z: 0 },
    },
    front: {
      position: { x: 4.28, y: 0.68, z: -0.42 },
      lookAt: { x: 0, y: 0.4, z: 0 },
    },
    side: {
      position: { x: 0.25, y: 0.83, z: 4.28 },
      lookAt: { x: 0, y: 0.4, z: 0 },
    },
    rear: {
      position: { x: -4.25, y: 1, z: 0.4 },
      lookAt: { x: 0, y: 0.4, z: 0 },
    },
  },
  hotspots: [
    {
      id: "front",
      label: "Front",
      position: { x: 0, y: 0.4, z: 2.3 },
      view: "front",
    },
    {
      id: "side",
      label: "Side",
      position: { x: 1.1, y: 0.5, z: 0.5 },
      view: "side",
    },
    {
      id: "rear",
      label: "Rear",
      position: { x: 0, y: 0.7, z: -2.3 },
      view: "rear",
    },
  ],
};

// ─── Red Bull F1 (Lower/Longer Profile) ───────────────────────────────────────
const redbull_f1 = {
  ...baseCarConfig,
  id: "redbull_f1",
  name: "RB19 F1 Car",
  brand: "Red Bull Racing",
  model: "/redbull_f1.glb",
  intro: {
    ...baseCarConfig.intro,
    startPosition: { x: 5, y: 2, z: 8 },
    text: { style: "fade", accent: "#1e3a8a" },
  },
  views: {
    default: {
      position: { x: 5.79, y: 2.15, z: -2.7 },
      lookAt: { x: 0, y: 0.2, z: 0 },
    },
    front: {
      position: { x: 6.48, y: 1.8, z: 0.3 },
      lookAt: { x: 0, y: 0.2, z: 0 },
    },
    side: {
      position: { x: 0.17, y: 1.17, z: -6.43 },
      lookAt: { x: 0, y: 0.2, z: 0 },
    },
    rear: {
      position: { x: -6.48, y: 1.83, z: -0.3 },
      lookAt: { x: 0, y: 0.2, z: 0 },
    },
  },
  hotspots: [
    {
      id: "front",
      label: "Nose",
      position: { x: 3, y: 0.5, z: 0.19 },
      view: "front",
    },
    {
      id: "side",
      label: "Side",
      position: { x: 0, y: 0.5, z: -0.6 },
      view: "side",
    },
    {
      id: "rear",
      label: "Rear",
      position: { x: -2, y: 0.8, z: -0.09 },
      view: "rear",
    },
  ],
};

// ─── Volvo Polestar (Tallest/Crossover Profile) ───────────────────────────────
const volvo_polestar = {
  ...baseCarConfig,
  id: "volvo_polestar",
  name: "Polestar 2",
  brand: "Volvo",
  model: "/volvo_polestar.glb",
  intro: {
    ...baseCarConfig.intro,
    startPosition: { x: 7, y: 4, z: 7 },
    text: { style: "fade", accent: "#f5c400" },
  },
  views: {
    default: {
      position: { x: 4.16, y: 1.14, z: -7.07 },
      lookAt: { x: 0, y: 0.7, z: 0 },
    },
    front: {
      position: { x: 6.34, y: 0.52, z: -5.21 },
      lookAt: { x: 0, y: 0.7, z: 0 },
    },
    side: {
      position: { x: -5.5, y: 0.47, z: -6.05 },
      lookAt: { x: 0, y: 0.7, z: 0 },
    },
    rear: {
      position: { x: -6.34, y: 1.15, z: 5.19 },
      lookAt: { x: 0, y: 0.7, z: 0 },
    },
  },
  hotspots: [
    {
      id: "front",
      label: "Front",
      position: { x: 1.9, y: 0.3, z: -1.5 },
      view: "front",
    },
    {
      id: "side",
      label: "Side",
      position: { x: -0.6, y: 0.3, z: -0.9 },
      view: "side",
    },
    {
      id: "rear",
      label: "Rear",
      position: { x: -1.9, y: 0.3, z: 1.5 },
      view: "rear",
    },
  ],
};

// ─── Ferrari GT3 (Low Mid-Engine) ─────────────────────────────────────────────
const ferrari_GT3 = {
  ...baseCarConfig,
  id: "ferrari_GT3",
  name: "488 GT3",
  brand: "Ferrari",
  model: "/ferrari_GT3.glb",
  intro: {
    ...baseCarConfig.intro,
    startPosition: { x: 6, y: 3, z: 6 },
    text: { style: "fade", accent: "#ff2800" },
  },
  views: {
    default: {
      position: { x: 4.16, y: 1.14, z: -7.07 },
      lookAt: { x: 0, y: 0.7, z: 0 },
    },
    front: {
      position: { x: 6.34, y: 0.52, z: -5.21 },
      lookAt: { x: 0, y: 0.7, z: 0 },
    },
    side: {
      position: { x: -5.5, y: 0.47, z: -6.05 },
      lookAt: { x: 0, y: 0.7, z: 0 },
    },
    rear: {
      position: { x: -6.34, y: 1.15, z: 5.19 },
      lookAt: { x: 0, y: 0.7, z: 0 },
    },
  },
  hotspots: [
    {
      id: "front",
      label: "Front",
      position: { x: 0, y: 0.35, z: 2.2 },
      view: "front",
    },
    {
      id: "side",
      label: "Intake",
      position: { x: 1.0, y: 0.5, z: -0.5 },
      view: "side",
    },
    {
      id: "rear",
      label: "Diffuser",
      position: { x: 0, y: 0.6, z: -2.2 },
      view: "rear",
    },
  ],
};

// ─── Ken Block Hoonicorn (Wide/Agressive) ─────────────────────────────────────
const hoonicorn = {
  ...baseCarConfig,
  id: "hoonicorn",
  name: "Hoonicorn V2",
  brand: "Hoonigan",
  model: "/hoonicorn.glb",
  intro: {
    ...baseCarConfig.intro,
    startPosition: { x: 6, y: 4, z: 6 },
    text: { style: "fade", accent: "#cc0000" },
  },
  views: {
    default: {
      position: { x: -8.69, y: 3.3, z: -16.51 },
      lookAt: { x: 3, y: 0.8, z: 0 },
    },
    front: {
      position: { x: 20.1, y: 3.66, z: -2.2 },
      lookAt: { x: 3, y: 0.8, z: 0 },
    },
    side: {
      position: { x: 5.58, y: 2.7, z: 17.18 },
      lookAt: { x: 3, y: 0.8, z: 0 },
    },
    rear: {
      position: { x: -14.11, y: 4.01, z: 1.51 },
      lookAt: { x: 3, y: 0.8, z: 0 },
    },
  },
  hotspots: [
    {
      id: "front",
      label: "Turbos",
      position: { x: 0, y: 0.8, z: 2.0 },
      view: "front",
    },
    {
      id: "side",
      label: "Exhaust",
      position: { x: 1.2, y: 0.4, z: 1.2 },
      view: "side",
    },
    {
      id: "rear",
      label: "Wing",
      position: { x: 0, y: 1.1, z: -2.3 },
      view: "rear",
    },
  ],
};

// ─── Mercedes 300SL (Vintage/Narrow) ──────────────────────────────────────────
const mercedes_300sl = {
  ...baseCarConfig,
  id: "mercedes_300sl",
  name: "300SL Gullwing",
  brand: "Mercedes-Benz",
  model: "/mercedes_300sl.glb",
  intro: {
    ...baseCarConfig.intro,
    startPosition: { x: 6, y: 4, z: 6 },
    text: { style: "fade", accent: "#c0c0c0" },
  },
  views: {
    default: {
      position: { x: 8.69, y: 3.13, z: 4.31 },
      lookAt: { x: 0, y: 0.5, z: 0 },
    },
    front: {
      position: { x: 7.11, y: 2.3, z: 7.21 },
      lookAt: { x: 0, y: 0.5, z: 0 },
    },
    side: {
      position: { x: -6.61, y: 1.45, z: 7.81 },
      lookAt: { x: 0, y: 0.5, z: 0 },
    },
    rear: {
      position: { x: -6.9, y: 2.64, z: -7.25 },
      lookAt: { x: 0, y: 0.5, z: 0 },
    },
  },
  hotspots: [
    {
      id: "front",
      label: "Grille",
      position: { x: 0, y: 0.45, z: 2.3 },
      view: "front",
    },
    {
      id: "side",
      label: "Door",
      position: { x: 0.85, y: 0.8, z: 0.2 },
      view: "side",
    },
    {
      id: "rear",
      label: "Trunk",
      position: { x: 0, y: 0.7, z: -2.3 },
      view: "rear",
    },
  ],
};

// ─── Export ───────────────────────────────────────────────────────────────────
const cars = [
  mercedesGT4,
  redbull_f1,
  volvo_polestar,
  ferrari_GT3,
  hoonicorn,
  mercedes_300sl,
];
export default cars;
