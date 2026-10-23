import { readFile, writeFile, readdir } from "node:fs/promises";
import sharp from "sharp";

// Keep Draco geometry intact. Resize textures to 2K and use WebP; preserve
// normal/roughness/metallic data losslessly. Run once on newly imported GLBs.
const root = new URL("../public/", import.meta.url);
const align = (n) => Math.ceil(n / 4) * 4;
let before = 0;
let after = 0;
for (const name of (await readdir(root)).filter((name) =>
  name.endsWith(".glb"),
)) {
  const path = new URL(name, root);
  const input = await readFile(path);
  const jsonLength = input.readUInt32LE(12);
  const gltf = JSON.parse(input.subarray(20, 20 + jsonLength));
  if (gltf.asset.extras?.ignitionTextures === "webp-2k-v1") continue;
  if (gltf.buffers.length !== 1 || gltf.buffers[0].uri)
    throw new Error(`${name}: expected an embedded buffer`);
  const binary = input.subarray(28 + jsonLength);
  const colors = new Set();
  const data = new Set();
  const source = (info) => info && gltf.textures[info.index].source;
  for (const material of gltf.materials ?? []) {
    colors.add(source(material.pbrMetallicRoughness?.baseColorTexture));
    colors.add(source(material.emissiveTexture));
    data.add(source(material.normalTexture));
    data.add(source(material.occlusionTexture));
    data.add(source(material.pbrMetallicRoughness?.metallicRoughnessTexture));
    // Extension maps may contain numerical material data, so keep them lossless.
    for (const extension of Object.values(material.extensions ?? {})) {
      for (const [key, value] of Object.entries(extension)) {
        if (key.endsWith("Texture")) data.add(source(value));
      }
    }
  }
  const replacements = new Map();
  const optimized = new Set();
  for (const [index, image] of (gltf.images ?? []).entries()) {
    if (image.bufferView === undefined)
      throw new Error(`${name}: external image`);
    const view = gltf.bufferViews[image.bufferView];
    const original = binary.subarray(
      view.byteOffset ?? 0,
      (view.byteOffset ?? 0) + view.byteLength,
    );
    const texture = sharp(original).resize({
      width: 2048,
      height: 2048,
      fit: "inside",
      withoutEnlargement: true,
    });
    const encoded = await texture
      .webp({
        lossless: !colors.has(index) || data.has(index),
        quality: 88,
        alphaQuality: 100,
        effort: 6,
      })
      .toBuffer();
    replacements.set(image.bufferView, encoded);
    image.mimeType = "image/webp";
    optimized.add(index);
  }
  for (const texture of gltf.textures ?? []) {
    if (!optimized.has(texture.source)) continue;
    texture.extensions = {
      ...texture.extensions,
      EXT_texture_webp: { source: texture.source },
    };
    delete texture.source;
  }
  gltf.extensionsUsed = [
    ...new Set([...(gltf.extensionsUsed ?? []), "EXT_texture_webp"]),
  ];
  gltf.extensionsRequired = [
    ...new Set([...(gltf.extensionsRequired ?? []), "EXT_texture_webp"]),
  ];
  const parts = [];
  let offset = 0;
  for (const [index, view] of gltf.bufferViews.entries()) {
    const bytes =
      replacements.get(index) ??
      binary.subarray(
        view.byteOffset ?? 0,
        (view.byteOffset ?? 0) + view.byteLength,
      );
    view.byteOffset = offset;
    view.byteLength = bytes.length;
    const padded = Buffer.alloc(align(bytes.length));
    bytes.copy(padded);
    parts.push(padded);
    offset += padded.length;
  }
  gltf.buffers[0].byteLength = offset;
  gltf.asset.extras = { ...gltf.asset.extras, ignitionTextures: "webp-2k-v1" };
  const json = Buffer.from(JSON.stringify(gltf));
  const jsonChunk = Buffer.alloc(align(json.length), 0x20);
  json.copy(jsonChunk);
  const header = Buffer.alloc(20);
  header.writeUInt32LE(0x46546c67, 0);
  header.writeUInt32LE(2, 4);
  header.writeUInt32LE(28 + jsonChunk.length + offset, 8);
  header.writeUInt32LE(jsonChunk.length, 12);
  header.writeUInt32LE(0x4e4f534a, 16);
  const binHeader = Buffer.alloc(8);
  binHeader.writeUInt32LE(offset, 0);
  binHeader.writeUInt32LE(0x004e4942, 4);
  const output = Buffer.concat([header, jsonChunk, binHeader, ...parts]);
  // Parse and validate bounds before replacing the source asset.
  if (output.length !== output.readUInt32LE(8))
    throw new Error(`${name}: invalid output length`);
  for (const view of gltf.bufferViews) {
    if (view.byteOffset % 4 || view.byteOffset + view.byteLength > offset)
      throw new Error(`${name}: invalid buffer view`);
  }
  await writeFile(path, output);
  before += input.length;
  after += output.length;
  console.log(
    `${name}: ${(input.length / 1e6).toFixed(2)} MB -> ${(output.length / 1e6).toFixed(2)} MB`,
  );
}
if (before)
  console.log(
    `Total: ${(before / 1e6).toFixed(2)} MB -> ${(after / 1e6).toFixed(2)} MB (${Math.round(100 * (1 - after / before))}% smaller)`,
  );
