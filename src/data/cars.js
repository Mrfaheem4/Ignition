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
  engine: "AMG 4.0L V8 Biturbo",
  torque: "630 Nm",
  topspeed: "Over 177 mph (285 km/h) — *Variable by gearing*",
  transmission: "Sequential AMG 6-speed Racing Gearbox",
  zeroTo60: "3.6 seconds",

  hotspots: [
    {
      id: "front",
      label: "Front",
      position: { x: 0, y: 0.4, z: 2.3 },
      view: "front",
      info: {
        title: "Carbon Fiber Front Splitter",
        description:
          "Aerodynamically sculpted splitter generates front downforce at racing speeds, keeping the GT4 planted through high-speed corners on circuit.",
      },
    },
    {
      id: "side",
      label: "Side",
      position: { x: 1.1, y: 0.5, z: 0.5 },
      view: "side",
      info: {
        title: "GT4 Race Body",
        description:
          "Full FIA-compliant GT4 bodywork with integrated side sills, widened arches, and aerodynamic door panels developed through CFD simulation.",
      },
    },
    {
      id: "rear",
      label: "Rear",
      position: { x: 0, y: 0.7, z: -2.3 },
      view: "rear",
      info: {
        title: "Fixed Rear Wing",
        description:
          "Large fixed rear wing generates significant downforce at speed. Angle is set pre-race for optimal balance between straight-line speed and cornering grip.",
      },
    },
  ],

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
};

// ─── Red Bull F1 (Lower/Longer Profile) ───────────────────────────────────────
const redbull_f1 = {
  ...baseCarConfig,
  id: "redbull_f1",
  name: "RB19 F1 Car",
  brand: "Red Bull Racing",
  model: "/redbull_f1.glb",
  engine: "Honda RBPTH002 1.6L V6 Turbo Hybrid",
  torque: "864 Nm",
  topspeed: "210-220 mph (340-355 km/h)",
  transmission: "8-speed Sequential",
  zeroTo60: "2.4 seconds",
  hotspots: [
    {
      id: "front",
      label: "Nose",
      position: { x: 0, y: 0.5, z: 3.25 },
      view: "front",
      info: {
        title: "Carbon Nose Cone",
        description:
          "Precision-shaped carbon fiber nose directs airflow to the front wing and underfloor. Designed to survive impacts while channeling maximum aerodynamic efficiency.",
      },
    },
    {
      id: "side",
      label: "Side",
      position: { x: 0.8, y: 0.5, z: 0.5 },
      view: "side",
      info: {
        title: "Sidepod & Cooling Package",
        description:
          "Radical undercut sidepod design maximizes airflow to the rear diffuser. Houses the intercooler, oil cooler, and hybrid energy recovery system radiators.",
      },
    },
    {
      id: "rear",
      label: "Rear",
      position: { x: 0, y: 0.5, z: -2.5 },
      view: "rear",
      info: {
        title: "Rear Wing & Diffuser",
        description:
          "DRS-enabled rear wing cuts drag on straights for overtaking. The aggressive diffuser below extracts air from the underfloor generating massive downforce.",
      },
    },
  ],
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
};

const koenigsegg_one = {
  ...baseCarConfig,
  id: "koenigsegg_one",
  name: "One",
  brand: "Koenigsegg",
  model: "/koenigsegg_one.glb",
  engine: "5.0L V8 ",
  torque: "1000+ Nm with Max at 1371 Nm @ 6000 rpm",

  topspeed: "273 mph (440 km/h)",
  transmission: "7-speed Dual Clutch (DCT)",
  zeroTo60: "2.8 seconds",
  hotspots: [
    {
      id: "front",
      label: "Front",
      position: { x: 0, y: 0.05, z: 0.2 },
      view: "front",
      info: {
        title: "Active Front Splitter",
        description:
          "Electronically controlled front splitter adjusts in real time based on speed and driving mode. At full extension it generates over 600 lbs of front downforce.",
      },
    },
    {
      id: "side",
      label: "Side",
      position: { x: 0.1, y: 0.05, z: 0 },
      view: "side",
      info: {
        title: "Full Carbon Monocoque",
        description:
          "The entire body and chassis is hand-laid carbon fiber. At just 1340 kg with 1360 hp, the One:1 achieves a perfect 1:1 power-to-weight ratio — a world first.",
      },
    },
    {
      id: "rear",
      label: "Rear",
      position: { x: 0, y: 0.1, z: -0.2 },
      view: "rear",
      info: {
        title: "Active Rear Wing & Top Mount Exhaust",
        description:
          "The massive active rear wing generates up to 1000 lbs of downforce. The centrally mounted top exhaust exit reduces turbulence over the wing for maximum efficiency.",
      },
    },
  ],
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
};

const volvo_polestar = {
  ...baseCarConfig,
  id: "volvo_polestar",
  name: "Polestar 2",
  brand: "Volvo",
  model: "/volvo_polestar.glb",
  modelPosition: { x: 0, y: 0.5, z: 0 },
  engine:
    "2.0L Turbo Hybrid I4 \n2 electric motors and ISG \n626 bhp (467 kW) @ 5800 - 6100 rpm",
  torque: "738 lb⋅ft (1001 N·m) @ 4500 rpm",
  topspeed: "155 mph (249 km/h)",
  transmission: "8-speed Automatic",
  zeroTo60: "3.8 seconds",
  hotspots: [
    {
      id: "front",
      label: "Front",
      position: { x: 0, y: 0.3, z: 2.6 },
      view: "front",
      info: {
        title: "Thor Hammer DRL",
        description:
          "Polestar's signature Thor's Hammer LED daytime running lights. Instantly recognizable design inherited from Volvo's iconic lighting language.",
      },
    },
    {
      id: "side",
      label: "Side",
      position: { x: 1.2, y: 0.3, z: 0 },
      view: "side",
      info: {
        title: "Sport Fastback Body",
        description:
          "Sleek fastback roofline combines Scandinavian minimalism with aerodynamic efficiency. The clean flanks hide the battery pack running the full length of the floor.",
      },
    },
    {
      id: "rear",
      label: "Rear",
      position: { x: 0, y: 0.55, z: -2.6 },
      view: "rear",
      info: {
        title: "Pixel LED Taillights",
        description:
          "Full-width pixel LED rear light bar gives the Polestar 2 a distinctive night presence. The integrated spoiler lip improves rear stability at highway speeds.",
      },
    },
  ],

  intro: {
    ...baseCarConfig.intro,
    startPosition: { x: 7, y: 4, z: 7 },
    text: { style: "fade", accent: "#f5c400" },
  },
  views: {
    default: {
      position: { x: 4.67, y: 1.65, z: 5.64 },
      lookAt: { x: 0, y: 0.27, z: 0.12 },
    },
    front: {
      position: { x: -0.07, y: 1.15, z: 7.44 },
      lookAt: { x: 0.07, y: 0.17, z: -0.01 },
    },
    side: {
      position: { x: 7.34, y: 0.86, z: 0 },
      lookAt: { x: -0.01, y: 0.21, z: -0.01 },
    },
    rear: {
      position: { x: 0, y: 2.45, z: -7.04 },
      lookAt: { x: 0, y: -0.14, z: -0.17 },
    },
  },
};

// ─── Ken Block Hoonicorn (Wide/Agressive) ─────────────────────────────────────
const hoonicorn = {
  ...baseCarConfig,
  id: "hoonicorn",
  name: "Hoonicorn V2",
  brand: "Hoonigan",
  model: "/hoonicorn.glb",

  engine: "6.7L Roush Yates Twin-Turbocharged V8 (Methanol Powered)",
  torque: "1,250 lb-ft (1,695 Nm)",
  topspeed: "255 mph (410 km/h) — *Estimated/Gearing limited*",
  transmission: "6-speed Sadev Sequential AWD",
  zeroTo60: "1.8 seconds",
  hotspots: [
    {
      id: "front",
      label: "Front",
      position: { x: 0, y: 2.5, z: 10 },
      view: "front",
      info: {
        title: "Custom Carbon Front End",
        description:
          "Fully custom carbon fiber front fascia replacing the original 1965 Mustang body. Designed by Hoonigan to withstand the violent forces of all-wheel drive drift attacks.",
      },
    },
    {
      id: "side",
      label: "Side",
      position: { x: 1.2, y: 0.4, z: 1.2 },
      view: "side",
      info: {
        title: "1965 Mustang Silhouette",
        description:
          "Beneath the custom bodywork lies a genuine 1965 Ford Mustang shell. The iconic fastback roofline is retained while everything else has been rebuilt for maximum performance.",
      },
    },
    {
      id: "rear",
      label: "Rear",
      position: { x: 0, y: 2.5, z: -3.5 },
      view: "rear",
      info: {
        title: "AWD Conversion & Exhaust",
        description:
          "Unlike the original rear-wheel drive Mustang, the Hoonicorn runs a Sadev AWD system. Quad exhaust exits scream on methanol fuel producing an otherworldly sound.",
      },
    },
  ],

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
};

// ─── Mercedes 300SL (Vintage/Narrow) ──────────────────────────────────────────
const mercedes_300sl = {
  ...baseCarConfig,
  id: "mercedes_300sl",
  name: "300SL Gullwing",
  brand: "Mercedes-Benz",
  model: "/mercedes_300sl.glb",

  engine: "3.0L M198 Inline-6 with Bosch Mechanical Direct Injection",
  torque: "202 lb-ft (274 Nm)",
  topspeed: "163 mph (263 km/h) — *Variable by rear-axle ratio*",
  transmission: "4-speed Manual",
  zeroTo60: "7.4 seconds",
  hotspots: [
    {
      id: "front",
      label: "Grille",
      position: { x: 4, y: 1.5, z: 0 },
      view: "front",
      info: {
        title: "Panoramic Grille",
        description:
          "The iconic wide-mouth grille feeds the world's first production fuel-injected engine. Its distinctive shape became the defining face of the 300SL and 1950s motorsport.",
      },
    },
    {
      id: "side",
      label: "Door",
      position: { x: 0.5, y: 0.8, z: 1.5 },
      view: "side",
      info: {
        title: "Gullwing Doors",
        description:
          "The 300SL's defining feature. Upward-opening doors were necessary due to the high tubular spaceframe chassis rails. No other car in history has made necessity so beautiful.",
      },
    },
    {
      id: "rear",
      label: "Trunk",
      position: { x: -3, y: 1.5, z: 0 },
      view: "rear",
      info: {
        title: "Streamlined Rear Deck",
        description:
          "The aerodynamically optimized rear was directly derived from the 300 SL racing car that won Le Mans in 1952. Form and function inseparably merged.",
      },
    },
  ],
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
};

const mclaren_f1_gtr = {
  ...baseCarConfig,
  id: "mclaren_f1_gtr",
  name: "F1 GTR",
  brand: "McLaren",
  model: "/mclaren_f1_gtr.glb",

  engine: "6.0L BMW S70/2 V12 Naturally Aspirated",
  torque: "527 lb-ft (715 Nm)",
  topspeed: "200–211 mph (322–340 km/h) — *Variable by gearing and aero*",
  transmission: "6-speed Xtrac Sequential",
  zeroTo60: "2.9 seconds",
  hotspots: [
    {
      id: "front",
      label: "Front",
      position: { x: 0, y: 2.5, z: 25 },
      view: "front",
      info: {
        title: "GTR Front Splitter & Canards",
        description:
          "The GTR's widened front bodywork features a large carbon splitter and dive planes absent from the road car. Developed specifically for the 1995 Le Mans 24 Hours which it won outright.",
      },
    },
    {
      id: "side",
      label: "Side",
      position: { x: 10, y: 2.5, z: 1.5 },
      view: "side",
      info: {
        title: "Central Driving Position",
        description:
          "The driver sits in the center of the car flanked by two passengers — a layout unique to the F1. In the GTR, the passenger seats are replaced with a full roll cage and fire suppression system.",
      },
    },
    {
      id: "rear",
      label: "Rear",
      position: { x: 0, y: 5, z: -25 },
      view: "rear",
      info: {
        title: "BMW V12 & GTR Diffuser",
        description:
          "The naturally aspirated BMW S70/2 V12 screams to 7,500 rpm with no turbo lag. The extended rear diffuser and large wing generate the downforce needed to nail the Mulsanne corner flat.",
      },
    },
  ],

  intro: {
    ...baseCarConfig.intro,
    startPosition: { x: 6, y: 4, z: 6 },
    text: { style: "fade", accent: "#c0c0c0" },
  },
  views: {
    default: {
      position: { x: 22.2, y: 13.46, z: 55.97 },
      lookAt: { x: 0, y: 0.5, z: 0 },
    },
    front: {
      position: { x: -0.48, y: 15.94, z: 59.62 },
      lookAt: { x: 0, y: 0.5, z: 0 },
    },
    side: {
      position: { x: 61.08, y: 8.45, z: 0.12 },
      lookAt: { x: 0, y: 0.5, z: 0 },
    },
    rear: {
      position: { x: 0.17, y: 12.21, z: -60.47 },
      lookAt: { x: 0, y: 0.5, z: 0 },
    },
  },
};

const jeep_wrangler = {
  ...baseCarConfig,
  id: "jeep_wrangler",
  name: "Wrangler",
  brand: "Jeep",
  model: "/jeep_wrangler.glb",

  engine: "6.4L HEMI V8 (392 cubic inches)",
  torque: "470 lb-ft (637 Nm)",
  topspeed: "111 mph (179 km/h) — *Electronic Limit / Tire Rating*",
  transmission: "8-speed TorqueFlite Automatic with Paddle Shifters",
  zeroTo60: "4.5 seconds",
  hotspots: [
    {
      id: "front",
      label: "Front",
      position: { x: 0, y: 1, z: 2.5 },
      view: "front",
      info: {
        title: "Hydro-Guide Air Intake",
        description:
          "The functional hood scoop uses a Tri-Level Hydro-Guide system to separate water from air, allowing the engine to breathe even when waves break over the hood during water fording.",
      },
    },
    {
      id: "side",
      label: "Side",
      position: { x: 1.3, y: 1, z: 0 },
      view: "side",
      info: {
        title: "FOX Shocks & Lift",
        description:
          "Equipped with a factory 2-inch lift and FOX 2.0-inch diameter aluminum-bodied monotube shocks, tuned specifically to handle the weight of the V8 while maximizing off-road articulation.",
      },
    },
    {
      id: "rear",
      label: "Rear",
      position: { x: 0, y: 1.5, z: -2.5 },
      view: "rear",
      info: {
        title: "Dual-Mode Active Exhaust",
        description:
          "Features a quad-tip exhaust system with a 'Performance' mode. At the push of a button, valves bypass the main muffler to unleash the signature deep roar of the naturally aspirated HEMI V8.",
      },
    },
  ],

  intro: {
    ...baseCarConfig.intro,
    startPosition: { x: 5.17, y: 1.58, z: 3.09 },
    text: { style: "fade", accent: "#c0c0c0" },
  },
  views: {
    default: {
      position: { x: 5.17, y: 1.58, z: 3.09 },
      lookAt: { x: 0, y: 0.5, z: 0 },
    },
    front: {
      position: { x: 0, y: 1.79, z: 5.97 },
      lookAt: { x: 0, y: 0.5, z: 0 },
    },
    side: {
      position: { x: 5.48, y: 1.21, z: 0 },
      lookAt: { x: 0, y: 0.5, z: 0 },
    },
    rear: {
      position: { x: 0, y: 2.3, z: -5.83 },
      lookAt: { x: 0, y: 0.5, z: 0 },
    },
  },
};

// ─── Export ───────────────────────────────────────────────────────────────────
const cars = [
  mercedesGT4,
  redbull_f1,
  volvo_polestar,
  hoonicorn,
  mercedes_300sl,
  koenigsegg_one,
  mclaren_f1_gtr,
  jeep_wrangler,
];
export default cars;
