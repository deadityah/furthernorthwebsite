import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");
const indexPath = path.join(distDir, "index.html");
const productsDir = path.join(distDir, "products");
const productsIndexPath = path.join(productsDir, "index.html");

if (!fs.existsSync(distDir)) {
  console.error("Error: dist directory does not exist. Build the project first.");
  process.exit(1);
}

if (!fs.existsSync(indexPath)) {
  console.error("Error: dist/index.html does not exist.");
  process.exit(1);
}

// Ensure dist/products directory exists
fs.mkdirSync(productsDir, { recursive: true });

// Copy dist/index.html to dist/products/index.html
fs.copyFileSync(indexPath, productsIndexPath);
console.log("Successfully copied dist/index.html to dist/products/index.html");
