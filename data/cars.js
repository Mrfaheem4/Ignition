const cars = [
  {
    id: "aventador",
    name: "Porsche ",
    year: "2022",
    tagline: "The last of its kind.",
    model: "/models/porsche.glb",

    // where the camera sits when you first land on this car
    defaultCamera: {
      position: { x: 4, y: 1.5, z: 4 },
      target: { x: 0, y: 0.5, z: 0 },
    },

    hotspots: [
      {
        id: "engine",
        label: "Engine",
        // where the floating circle sits on the car in 3D space
        position: { x: 0, y: 0.8, z: -1.2 },
        // where camera moves TO when clicked
        camera: {
          position: { x: 0, y: 2.5, z: -3 },
          target: { x: 0, y: 0.8, z: -1 },
          // midpoint of the arc swing for cinematic feel
          arc: { x: 2, y: 3, z: -2 },
        },
        info: {
          title: "6.5L V12 Engine",
          subtitle: "Naturally Aspirated",
          specs: [
            { label: "Power", value: "769 hp" },
            { label: "Torque", value: "690 Nm" },
            { label: "Redline", value: "8,500 rpm" },
            { label: "Layout", value: "Mid-mounted" },
          ],
          description: "INSERT ENGINE DESCRIPTION HERE",
        },
      },
      {
        id: "wheel",
        label: "Wheels",
        position: { x: -1.0, y: 0.3, z: 1.2 },
        camera: {
          position: { x: -3.5, y: 0.5, z: 1.2 },
          target: { x: -0.9, y: 0.3, z: 1.2 },
          arc: { x: -2, y: 2, z: 2.5 },
        },
        info: {
          title: "Pirelli P Zero",
          subtitle: "Front 255/30 ZR20 — Rear 335/30 ZR20",
          specs: [
            { label: "Rim Size", value: "20 inch" },
            { label: "Material", value: "Forged Aluminum" },
            { label: "Type", value: "Run Flat" },
            { label: "Brand", value: "Pirelli" },
          ],
          description: "INSERT WHEEL DESCRIPTION HERE",
        },
      },
      {
        id: "exhaust",
        label: "Exhaust",
        position: { x: 0.4, y: 0.3, z: -2.0 },
        camera: {
          position: { x: 2, y: 0.8, z: -4 },
          target: { x: 0, y: 0.3, z: -2 },
          arc: { x: 3, y: 2, z: -3 },
        },
        info: {
          title: "Titanium Exhaust",
          subtitle: "Quad exit system",
          specs: [
            { label: "Material", value: "Titanium" },
            { label: "Exits", value: "4 pipes" },
            { label: "Sound", value: "INSERT SOUND INFO" },
            { label: "Weight", value: "INSERT WEIGHT" },
          ],
          description: "INSERT EXHAUST DESCRIPTION HERE",
        },
      },
    ],
  },
];

export default cars;
