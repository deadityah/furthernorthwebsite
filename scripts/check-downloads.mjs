import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const downloadsDir = path.join(rootDir, "public", "downloads");

if (!fs.existsSync(downloadsDir)) {
  fs.mkdirSync(downloadsDir, { recursive: true });
}

const files = fs.readdirSync(downloadsDir);
let hasError = false;

for (const file of files) {
  if (file.startsWith(".")) continue; // Skip .gitkeep and dotfiles

  const filePath = path.join(downloadsDir, file);
  const stat = fs.statSync(filePath);

  if (stat.isFile()) {
    const sizeInMB = stat.size / (1024 * 1024);

    if (stat.size > 95 * 1024 * 1024) {
      console.error(
        `[check-downloads] ERROR: "${file}" is ${sizeInMB.toFixed(2)} MB. File too large for GitHub. Host it elsewhere and use a full URL.`
      );
      hasError = true;
    } else if (stat.size > 50 * 1024 * 1024) {
      console.warn(
        `[check-downloads] WARNING: "${file}" is ${sizeInMB.toFixed(2)} MB (exceeds 50 MB).`
      );
    }
  }
}

if (hasError) {
  process.exit(1);
}

console.log("[check-downloads] Downloads directory check passed.");
