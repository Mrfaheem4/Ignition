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
      position: { x: 2.51, y: 1.74, z: 4.42 },
      lookAt: { x: 0, y: 0.5, z: 0 },
    },
    front: {
      position: { x: 0, y: 1.36, z: 5.53 },
      lookAt: { x: 0, y: 0.4, z: 0 },
    },
    side: {
      position: { x: 5.47, y: 1.14, z: -0.49 },
      lookAt: { x: 0, y: 0.4, z: 0 },
    },
    rear: {
      position: { x: 0, y: 1.55, z: -5.42 },
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
      position: { x: 2.33, y: 1.88, z: 6.03 },
      lookAt: { x: 0, y: 0.2, z: 0 },
    },
    front: {
      position: { x: 0, y: 1.8, z: 6.5 },
      lookAt: { x: 0, y: 0.2, z: 0 },
    },
    side: {
      position: { x: 6.66, y: 0.72, z: -0.16 },
      lookAt: { x: 0, y: 0.2, z: 0 },
    },
    rear: {
      position: { x: 0, y: 1.83, z: -6.5 },
      lookAt: { x: 0, y: 0.2, z: 0 },
    },
  },
  hotspots: [
    {
      id: "front",
      label: "Nose",
      position: { x: 0, y: 0.5, z: 3.25 },
      view: "front",
    },
    {
      id: "side",
      label: "Side",
      position: { x: 0.8, y: 0.5, z: 0.5 },
      view: "side",
    },
    {
      id: "rear",
      label: "Rear",
      position: { x: 0, y: 0.5, z: -2.5 },
      view: "rear",
    },
  ],
};

// ─── Ferrari 296 GT3 ───────────────────────────────
const ferrari_296 = {
  ...baseCarConfig,
  id: "ferrari_296",
  name: "296 GTB",
  brand: "Ferrari",
  model: "/ferrari_296_gt3.glb",
  intro: {
    ...baseCarConfig.intro,
    startPosition: { x: 7, y: 4, z: 7 },
    text: { style: "fade", accent: "#f5c400" },
  },
  views: {
    default: {
      position: { x: 4.16, y: 1.14, z: 7.07 },
      lookAt: { x: 0, y: 0.7, z: 0 },
    },
    front: {
      position: { x: 0, y: 0.52, z: 8.21 },
      lookAt: { x: 0, y: 0.7, z: 0 },
    },
    side: {
      position: { x: 8.2, y: 0.5, z: 0.06 },
      lookAt: { x: 0, y: 0.7, z: 0 },
    },
    rear: {
      position: { x: 0, y: 2.38, z: -8.21 },
      lookAt: { x: 0, y: 0.7, z: 0 },
    },
  },
  hotspots: [
    {
      id: "front",
      label: "Front",
      position: { x: 0, y: 0.3, z: 2.6 },
      view: "front",
    },
    {
      id: "side",
      label: "Side",
      position: { x: 1.2, y: 0.3, z: 0 },
      view: "side",
    },
    {
      id: "rear",
      label: "Rear",
      position: { x: 0, y: 0.55, z: -2.6 },
      view: "rear",
    },
  ],
};

const toyota_supra_gt3 = {
  ...baseCarConfig,
  id: "toyota_supra_gt3",
  name: "Supra GT3",
  brand: "Toyota",
  model: "/toyotagr_supra_gt300.glb",
  intro: {
    ...baseCarConfig.intro,
    startPosition: { x: 7, y: 4, z: 7 },
    text: { style: "fade", accent: "#f5c400" },
  },
  views: {
    default: {
      position: { x: 2.89, y: 1.47, z: 5.99 },
      lookAt: { x: 0, y: 0.7, z: 0 },
    },
    front: {
      position: { x: 0, y: 1.13, z: 6.68 },
      lookAt: { x: 0, y: 0.7, z: 0 },
    },
    side: {
      position: { x: 6.67, y: 1.13, z: -0.19 },
      lookAt: { x: 0, y: 0.7, z: 0 },
    },
    rear: {
      position: { x: 0.05, y: 1.54, z: -6.64 },
      lookAt: { x: 0, y: 0.7, z: 0 },
    },
  },
  hotspots: [
    {
      id: "front",
      label: "Front",
      position: { x: 0, y: 0.3, z: 2.6 },
      view: "front",
    },
    {
      id: "side",
      label: "Side",
      position: { x: 1.2, y: 0.3, z: 0 },
      view: "side",
    },
    {
      id: "rear",
      label: "Rear",
      position: { x: 0, y: 1, z: -2.6 },
      view: "rear",
    },
  ],
};

const koenigsegg = {
  ...baseCarConfig,
  id: "koenigsegg",
  name: "One",
  brand: "Koenigsegg",
  model: "/koenigsegg_one.glb",
  intro: {
    ...baseCarConfig.intro,
    startPosition: { x: 7, y: 4, z: 7 },
    text: { style: "fade", accent: "#f5c400" },
  },
  views: {
    default: {
      position: { x: 0.27, y: 0.13, z: 0.42 },
      lookAt: { x: 0, y: 0, z: 0 },
    },
    front: {
      position: { x: 0, y: 0.12, z: 0.5 },
      lookAt: { x: 0, y: 0, z: 0 },
    },
    side: {
      position: { x: 0.5, y: 0.1, z: -0.01 },
      lookAt: { x: 0, y: 0, z: 0 },
    },
    rear: {
      position: { x: 0, y: 0.12, z: -0.5 },
      lookAt: { x: 0, y: 0, z: 0 },
    },
  },
  hotspots: [
    {
      id: "front",
      label: "Front",
      position: { x: 0, y: 0.05, z: 0.2 },
      view: "front",
    },
    {
      id: "side",
      label: "Side",
      position: { x: 0.1, y: 0.05, z: 0 },
      view: "side",
    },
    {
      id: "rear",
      label: "Rear",
      position: { x: 0, y: 0.1, z: -0.2 },
      view: "rear",
    },
  ],
};

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
      position: { x: 4.16, y: 1.14, z: 7.07 },
      lookAt: { x: 0, y: 0.7, z: 0 },
    },
    front: {
      position: { x: 0, y: 0.52, z: 8.21 },
      lookAt: { x: 0, y: 0.7, z: 0 },
    },
    side: {
      position: { x: 8.2, y: 0.5, z: 0.06 },
      lookAt: { x: 0, y: 0.7, z: 0 },
    },
    rear: {
      position: { x: 0, y: 2.38, z: -8.21 },
      lookAt: { x: 0, y: 0.7, z: 0 },
    },
  },
  hotspots: [
    {
      id: "front",
      label: "Front",
      position: { x: 0, y: 0.3, z: 2.6 },
      view: "front",
    },
    {
      id: "side",
      label: "Side",
      position: { x: 1.2, y: 0.3, z: 0 },
      view: "side",
    },
    {
      id: "rear",
      label: "Rear",
      position: { x: 0, y: 0.55, z: -2.6 },
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
      position: { x: 5.94, y: 4.66, z: 19.06 },
      lookAt: { x: 0, y: 0.5, z: 2.5 },
    },
    front: {
      position: { x: -0.13, y: 3.69, z: 20.3 },
      lookAt: { x: 0, y: 0.5, z: 2.5 },
    },
    side: {
      position: { x: 15.76, y: 2.16, z: 1.89 },
      lookAt: { x: 0, y: 0.5, z: 2.5 },
    },
    rear: {
      position: { x: 0, y: 5.36, z: -12.6 },
      lookAt: { x: 0, y: 0.5, z: 2.5 },
    },
  },
  hotspots: [
    {
      id: "front",
      label: "Front",
      position: { x: 0, y: 2.5, z: 10 },
      view: "front",
    },
    {
      id: "side",
      label: "Side",
      position: { x: 1.2, y: 0.4, z: 1.2 },
      view: "side",
    },
    {
      id: "rear",
      label: "Rear",
      position: { x: 0, y: 2.5, z: -3.5 },
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
      position: { x: 9.26, y: 2.79, z: 3.71 },
      lookAt: { x: 0, y: 0.5, z: 0 },
    },
    front: {
      position: { x: 10.04, y: 2.72, z: 0 },
      lookAt: { x: 0, y: 0.5, z: 0 },
    },
    side: {
      position: { x: 0.64, y: 1.6, z: 10.2 },
      lookAt: { x: 0, y: 0.5, z: 0 },
    },
    rear: {
      position: { x: -8.82, y: 2.62, z: 0.05 },
      lookAt: { x: 0, y: 0.5, z: 0 },
    },
  },
  hotspots: [
    {
      id: "front",
      label: "Grille",
      position: { x: 4, y: 1.5, z: 0 },
      view: "front",
    },
    {
      id: "side",
      label: "Door",
      position: { x: 0.5, y: 0.8, z: 1.5 },
      view: "side",
    },
    {
      id: "rear",
      label: "Trunk",
      position: { x: -3, y: 1.5, z: 0 },
      view: "rear",
    },
  ],
};

// ─── Export ───────────────────────────────────────────────────────────────────
const cars = [
  mercedesGT4,
  redbull_f1,
  volvo_polestar,
  hoonicorn,
  mercedes_300sl,
  ferrari_296,
  toyota_supra_gt3,
  koenigsegg,
];
export default cars;
