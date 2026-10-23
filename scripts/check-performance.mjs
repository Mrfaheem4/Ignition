import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { gzipSync } from "node:zlib";
import sharp from "sharp";
import { execFileSync } from "node:child_process";

const dist = new URL("../dist/", import.meta.url);
const manifest = JSON.parse(await readFile(new URL(".vite/manifest.json", dist), "utf8"));
function dependencies(key, seen = new Set()) {
  if (seen.has(key)) return seen;
  assert.ok(manifest[key], `Missing build entry: ${key}`);
  seen.add(key);
  for (const dependency of manifest[key].imports ?? []) dependencies(dependency, seen);
  return seen;
}
const viewer = "src/Components/CarViewer.jsx";
for (const route of ["index.html", "src/Components/Home.jsx", "src/pages/Showroom.jsx"]) {
  const graph = dependencies(route);
  assert.ok(!graph.has(viewer), `${route} eagerly loads the viewer`);
  let bytes = 0;
  for (const key of graph) {
    const code = await readFile(new URL(manifest[key].file, dist));
    assert.ok(!code.includes(Buffer.from("draco_wasm_wrapper")), `${route} loads the 3D engine`);
    bytes += gzipSync(code).length;
  }
  console.log(`${route}: ${(bytes / 1024).toFixed(1)} KiB gzipped JS (viewer excluded)`);
}
const publicRoot = new URL("../public/", import.meta.url);
let total = 0;
for (const name of (await readdir(publicRoot)).filter((name) => name.endsWith(".glb"))) {
  const file = await readFile(new URL(name, publicRoot));
  assert.equal(file.readUInt32LE(0), 0x46546c67);
  assert.equal(file.readUInt32LE(4), 2);
  assert.equal(file.readUInt32LE(8), file.length);
  const jsonLength = file.readUInt32LE(12);
  const gltf = JSON.parse(file.subarray(20, 20 + jsonLength));
  const binary = file.subarray(28 + jsonLength);
  if (process.argv.includes("--compare-head")) {
    const original = execFileSync("git", ["show", `HEAD:public/${name}`], { maxBuffer: 64 * 1024 * 1024 });
    const originalLength = original.readUInt32LE(12);
    const originalGltf = JSON.parse(original.subarray(20, 20 + originalLength));
    const originalBinary = original.subarray(28 + originalLength);
    assert.deepEqual(gltf.meshes, originalGltf.meshes, `${name}: geometry structure changed`);
    assert.deepEqual(gltf.accessors, originalGltf.accessors, `${name}: geometry accessors changed`);
    assert.deepEqual(gltf.nodes, originalGltf.nodes, `${name}: model transforms changed`);
    const imageViews = new Set((gltf.images ?? []).map((image) => image.bufferView));
    for (const [index, view] of gltf.bufferViews.entries()) {
      if (imageViews.has(index)) continue;
      const oldView = originalGltf.bufferViews[index];
      assert.deepEqual(
        binary.subarray(view.byteOffset ?? 0, (view.byteOffset ?? 0) + view.byteLength),
        originalBinary.subarray(oldView.byteOffset ?? 0, (oldView.byteOffset ?? 0) + oldView.byteLength),
        `${name}: geometry bytes changed`,
      );
    }
  }
  assert.equal(file.readUInt32LE(24 + jsonLength), 0x004e4942);
  assert.ok(binary.length >= gltf.buffers[0].byteLength);
  for (const view of gltf.bufferViews) {
    assert.equal((view.byteOffset ?? 0) % 4, 0);
    assert.ok((view.byteOffset ?? 0) + view.byteLength <= binary.length);
  }
  for (const image of gltf.images ?? []) {
    const view = gltf.bufferViews[image.bufferView];
    assert.ok(view, `${name}: missing image view`);
    const bytes = binary.subarray(view.byteOffset ?? 0, (view.byteOffset ?? 0) + view.byteLength);
    const metadata = await sharp(bytes).metadata();
    assert.ok(metadata.width <= 2048 && metadata.height <= 2048, `${name}: oversized texture`);
    // Decode every image, rather than just trusting its header.
    await sharp(bytes).raw().toBuffer();
  }
  for (const texture of gltf.textures ?? []) {
    const index = texture.extensions?.EXT_texture_webp?.source ?? texture.source;
    assert.ok(gltf.images[index], `${name}: missing texture source`);
  }
  for (const mesh of gltf.meshes ?? []) {
    for (const primitive of mesh.primitives) {
      const draco = primitive.extensions?.KHR_draco_mesh_compression;
      if (draco) assert.ok(gltf.bufferViews[draco.bufferView], `${name}: missing geometry`);
    }
  }
  total += file.length;
  console.log(`${name}: textures and buffer bounds valid`);
}
console.log(`Model payload: ${(total / 1e6).toFixed(2)} MB`);
