import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import sharp from "sharp";

const source = new URL("../public/logos/", import.meta.url);
const output = new URL("../src/assets/logos/", import.meta.url);
await mkdir(output, { recursive: true });
for (const name of await readdir(source)) {
  if (!name.endsWith(".png")) continue;
  const input = await readFile(new URL(name, source));
  if (name === "Icon.png") {
    await writeFile(new URL("../src/assets/favicon.png", import.meta.url), await sharp(input).resize(64, 64).png().toBuffer());
    continue;
  }
  for (const [size, width, height] of [["small", 256, 56], ["large", 512, 160]]) {
    const bytes = await sharp(input)
      .resize({ width, height, fit: "inside", withoutEnlargement: true })
      .webp({ quality: 90, alphaQuality: 100 }).toBuffer();
    await writeFile(new URL(`${name.slice(0, -4)}-${size}.webp`, output), bytes);
    console.log(`${name} (${size}): ${bytes.length} bytes`);
  }
}
