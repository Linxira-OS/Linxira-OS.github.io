import sharp from "sharp";
import fs from "fs";

const svg = fs.readFileSync("zeta-logo.svg");
const sizes = [16, 32, 48, 64, 128, 256];

const frames = [];
for (const s of sizes) {
  const buf = await sharp(svg, { density: 384 }).resize(s, s).png().toBuffer();
  frames.push({ size: s, buf });
}

const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);            // reserved
header.writeUInt16LE(1, 2);            // icon type
header.writeUInt16LE(frames.length, 4);

let offset = 6 + 16 * frames.length;
const entries = Buffer.alloc(16 * frames.length);
const parts = [];
for (let i = 0; i < frames.length; i++) {
  const { size, buf } = frames[i];
  const e = Buffer.alloc(16);
  e.writeUInt8(size >= 256 ? 0 : size, 0); // width  (0 => 256)
  e.writeUInt8(size >= 256 ? 0 : size, 1); // height
  e.writeUInt8(0, 2);                      // colors
  e.writeUInt8(0, 3);                      // reserved
  e.writeUInt16LE(1, 4);                   // planes
  e.writeUInt16LE(32, 6);                  // bit count
  e.writeUInt32LE(buf.length, 8);          // bytes in resource
  e.writeUInt32LE(offset, 12);             // offset
  entries.set(e, i * 16);
  parts.push(buf);
  offset += buf.length;
}

fs.writeFileSync("zeta-logo.ico", Buffer.concat([header, entries, ...parts]));
console.log("ico written, sizes:", sizes.join(","));
