#!/usr/bin/env node
/**
 * Bump version for both npm and Python packages.
 *
 * Usage: node bump-version.js [major|minor|patch]
 * Default: patch
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const bumpType = process.argv[2] || "patch";

if (!["major", "minor", "patch"].includes(bumpType)) {
  console.error("Usage: node bump-version.js [major|minor|patch]");
  process.exit(1);
}

function bumpVersion(version, type) {
  const [major, minor, patch] = version.split(".").map(Number);
  switch (type) {
    case "major":
      return `${major + 1}.0.0`;
    case "minor":
      return `${major}.${minor + 1}.0`;
    case "patch":
      return `${major}.${minor}.${patch + 1}`;
  }
}

// Update package.json
const packageJsonPath = path.join(__dirname, "package.json");
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));
const oldVersion = packageJson.version;
const newVersion = bumpVersion(oldVersion, bumpType);
packageJson.version = newVersion;
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + "\n");

// Update pyproject.toml
const pyprojectPath = path.join(__dirname, "pyproject.toml");
let pyproject = fs.readFileSync(pyprojectPath, "utf-8");
pyproject = pyproject.replace(/^version = ".*"$/m, `version = "${newVersion}"`);
fs.writeFileSync(pyprojectPath, pyproject);

// Update __init__.py
const initPath = path.join(
  __dirname,
  "tibetan_sanskrit_transliteration_data",
  "__init__.py"
);
let initPy = fs.readFileSync(initPath, "utf-8");
initPy = initPy.replace(/__version__ = ".*"/, `__version__ = "${newVersion}"`);
fs.writeFileSync(initPath, initPy);

console.log(`✓ Bumped version: ${oldVersion} → ${newVersion}`);
console.log("  - package.json");
console.log("  - pyproject.toml");
console.log("  - tibetan_sanskrit_transliteration_data/__init__.py");
