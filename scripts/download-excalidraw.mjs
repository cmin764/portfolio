#!/usr/bin/env node
// Downloads and decrypts an Excalidraw shared scene to a local .excalidraw file.
//
// Usage:
//   node scripts/download-excalidraw.mjs <excalidraw-url> <output-path>
//
// Example:
//   node scripts/download-excalidraw.mjs \
//     "https://excalidraw.com/#json=SB1QPfIqUtb3kO5jcGZIz,-AVwb8XwY09W5jJmhLJNMQ" \
//     public/diagrams/traced-ai.excalidraw
//
// The URL must be the full shareable link including the #json= fragment.
// All project diagram URLs are stored in src/data/projects.ts (diagramExcalidrawUrl).

import { inflate, inflateRaw } from 'zlib';
import { writeFileSync } from 'fs';
import { promisify } from 'util';

const inflateAsync = promisify(inflate);
const inflateRawAsync = promisify(inflateRaw);

const [, , url, outputPath] = process.argv;

if (!url || !outputPath) {
  console.error('Usage: node scripts/download-excalidraw.mjs <excalidraw-url> <output-path>');
  process.exit(1);
}

// Parse the URL fragment: #json=<id>,<key>
const fragment = new URL(url).hash;
const match = fragment.match(/^#json=([^,]+),(.+)$/);
if (!match) {
  console.error('Could not parse Excalidraw URL. Expected format: #json=<id>,<key>');
  process.exit(1);
}

const [, sceneId, urlKey] = match;

// Fetch the encrypted scene from Excalidraw's storage backend
const res = await fetch(`https://json.excalidraw.com/api/v2/${sceneId}`);
if (!res.ok) {
  console.error(`Fetch failed: ${res.status} ${res.statusText}`);
  process.exit(1);
}

const raw = Buffer.from(await res.arrayBuffer());

// Binary envelope format:
//   4 bytes: version
//   4 bytes: header JSON length
//   N bytes: header JSON (e.g. {"version":2,"compression":"pako@1","encryption":"AES-GCM"})
//   4 bytes: IV length (always 12 for AES-GCM)
//   IV bytes
//   4 bytes: ciphertext length
//   ciphertext bytes
let offset = 0;
offset += 4; // version
const headerLen = raw.readUInt32BE(offset); offset += 4;
const header = JSON.parse(raw.slice(offset, offset + headerLen).toString('utf8')); offset += headerLen;
const ivLen = raw.readUInt32BE(offset); offset += 4;
const iv = raw.slice(offset, offset + ivLen); offset += ivLen;
const ciphertextLen = raw.readUInt32BE(offset); offset += 4;
const ciphertext = raw.slice(offset, offset + ciphertextLen);

// The URL key is the JWK 'k' field (base64url, A128GCM)
const cryptoKey = await crypto.subtle.importKey(
  'jwk',
  { alg: 'A128GCM', ext: true, k: urlKey, key_ops: ['encrypt', 'decrypt'], kty: 'oct' },
  { name: 'AES-GCM', length: 128 },
  false,
  ['decrypt']
);

const decrypted = Buffer.from(
  await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, cryptoKey, ciphertext)
);

// Decompress (pako@1 = zlib deflate; try inflate with header, fall back to raw)
let decompressed;
try {
  decompressed = await inflateAsync(decrypted);
} catch {
  decompressed = await inflateRawAsync(decrypted);
}

// The decompressed buffer has a small binary envelope before the JSON.
// Skip to the first '{'.
const str = decompressed.toString('utf8');
const jsonStart = str.indexOf('{');
const jsonEnd = str.lastIndexOf('}');
if (jsonStart < 0) {
  console.error('Could not find JSON object in decompressed data');
  process.exit(1);
}

const json = JSON.parse(str.slice(jsonStart, jsonEnd + 1));
writeFileSync(outputPath, JSON.stringify(json, null, 2));
console.log(`Saved ${json.elements?.length ?? '?'} elements to ${outputPath}`);
