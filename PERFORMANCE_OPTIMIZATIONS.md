# Loading and performance changes

The collection no longer fetches car models or music on mount or hover. Opening a car fetches only that car, with its lighting environment in parallel. The 3D runtime remains behind the viewer route's dynamic import. React's shared dependencies stay cacheable without a catch-all vendor chunk pulling in Three.js.

The loading screen uses actual asset completion progress, with an indeterminate indicator before totals are available. It never claims 100% while the scene is still being prepared, and stays visible through the first rendered frame. Slow loads offer retry and collection navigation; failures show a recovery screen. Viewer instances reset per car, including cached-model revisits. Camera animations stop on unmount and end at the configured default view.

Draco decoders are served locally. Audio waits until the scene is ready and a user gesture permits playback, honors manual pauses across navigation, and reflects actual playback events. Decorative rays render at a capped pixel ratio and 30 fps, stop in background tabs, and respect reduced-motion preferences.

The car viewer keeps a consistent device pixel ratio (capped at 2x) during camera motion and at rest. Interaction no longer triggers adaptive resolution reduction or pixelated canvas scaling. Model compression runs offline through the optimization script; dragging does not recompress textures. Demand rendering and cached contact shadows remain enabled.

Collection cards are keyboard-accessible links. Unknown routes recover to home, and unknown car IDs recover to the collection. The viewer controls and feature cards adapt to narrow screens; missing acceleration values are derived from the existing car data rather than displayed as blank numbers.

HTML shows a startup placeholder before React initializes, and the external font stylesheet loads without blocking the initial paint. Unversioned public assets revalidate instead of staying immutable for a year; hashed Vite assets retain immutable caching.

## Measured local results

- Combined model payload: 66.53 MB to 39.16 MB (41% smaller).
- Largest car: 20.96 MB to 13.74 MB; AMG GT4: 11.92 MB to 6.39 MB.
- The approximately 1.1 MB minified viewer chunk is excluded from the startup, home and collection dependency graphs. It remains a large, intentionally lazy chunk.
- Every embedded texture decodes successfully and fits within 2048 by 2048 pixels.
- Geometry buffer bytes, accessors, mesh definitions and node transforms match the original assets in Git.
- Local preview serves home, collection and direct car routes, versioned model URLs, JavaScript decoders and WASM with successful responses and appropriate content types.

## Verification

- `npm run lint`
- `npm run build`
- `npm run check:performance -- --compare-head` additionally compares geometry against the original Git revision. Without the flag, it checks route dependency isolation, GLB buffer bounds, texture dimensions and texture decoding.
- `npm run optimize:models` optimizes newly imported models in place. Original geometry is preserved; texture dimensions are capped at 2048. Existing optimized models are skipped.

These are local build and asset checks. No deployed-network timing or browser visual measurement is claimed.

## Network loading follow-up

The collection now uses display-sized WebP logos (23.54 KB combined instead of
1.17 MB of original PNGs, about 98% smaller). The viewer uses larger versions
sized for its 80-pixel logo display on 2x screens. The favicon is resized to
64 pixels. Vite emits these assets with content hashes so browsers can cache
them separately from JavaScript. Originals remain in `public/logos`; regenerate
display versions with `npm run optimize:logos` after replacing originals.

Opening a valid car route now preloads only the selected model and lighting
environment while the lazy viewer code downloads. Model geometry and textures
are unchanged. The largest model remains 13.74 MB, so cold loads still depend
on network bandwidth; localhost performance does not measure download time.
