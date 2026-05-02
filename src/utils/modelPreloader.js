import { useGLTF } from "@react-three/drei";

// Track preload status to avoid redundant preloads
const preloadedModels = new Set();

/**
 * Preload a car model immediately - fires before React renders
 * @param {Object} car - Car configuration object with model path
 */
export function preloadCarModel(car) {
  if (!car || !car.model) return;

  // Only preload once per session per model
  if (preloadedModels.has(car.model)) return;

  preloadedModels.add(car.model);
  useGLTF.preload(car.model);
}

/**
 * Preload multiple car models in sequence with priority
 * @param {Array} cars - Array of car objects
 * @param {Array} priorityIds - Optional array of car IDs to load first
 */
export function preloadMultipleModels(cars, priorityIds = []) {
  if (!cars || !Array.isArray(cars)) return;

  // Create priority order
  const priorityCars = priorityIds
    .map((id) => cars.find((c) => c.id === id))
    .filter(Boolean);

  const otherCars = cars.filter((c) => !priorityIds.includes(c.id));
  const orderedCars = [...priorityCars, ...otherCars];

  // Preload first car immediately, others with slight delay to not block UI
  orderedCars.forEach((car, index) => {
    if (index === 0) {
      preloadCarModel(car);
    } else {
      // Stagger preloads to avoid network congestion
      setTimeout(() => {
        preloadCarModel(car);
      }, 100 * index);
    }
  });
}

/**
 * Preload models for adjacent cars in a list
 * Useful for carousels/galleries where user likely to view nearby items
 * @param {Array} cars - All cars
 * @param {string} currentCarId - Currently viewing car ID
 * @param {number} range - How many adjacent cars to preload (default: 2)
 */
export function preloadAdjacentModels(cars, currentCarId, range = 2) {
  if (!cars || !currentCarId) return;

  const currentIndex = cars.findIndex((c) => c.id === currentCarId);
  if (currentIndex === -1) return;

  const startIndex = Math.max(0, currentIndex - range);
  const endIndex = Math.min(cars.length, currentIndex + range + 1);

  // Preload current car first (highest priority)
  preloadCarModel(cars[currentIndex]);

  // Then preload adjacent cars
  for (let i = startIndex; i < endIndex; i++) {
    if (i !== currentIndex) {
      setTimeout(
        () => {
          preloadCarModel(cars[i]);
        },
        50 * Math.abs(i - currentIndex),
      );
    }
  }
}

/**
 * Clear all preload tracking - useful for testing or page reload
 */
export function clearPreloadCache() {
  preloadedModels.clear();
}

/**
 * Get preload status
 * @returns {number} Number of models preloaded
 */
export function getPreloadStatus() {
  return preloadedModels.size;
}
