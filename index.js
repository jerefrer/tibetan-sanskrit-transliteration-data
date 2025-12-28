/**
 * Tibetan Sanskrit Transliteration Data
 *
 * Provides the replacement map for transliterating Tibetan-encoded Sanskrit.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Load and parse the replacements CSV file.
 * @returns {Array<{tibetan: string, transliteration: string, phonetics: string}>}
 */
export function loadReplacements() {
  const csvPath = path.join(__dirname, "replacements.csv");
  const content = fs.readFileSync(csvPath, "utf-8");

  const lines = content.split("\n").filter((line) => line.trim());

  return lines
    .slice(1)
    .map((line) => {
      // Parse CSV with quoted fields: "value1","value2","value3"
      const match = line.match(/^"([^"]*)","([^"]*)","([^"]*)"$/);
      if (!match) {
        return null;
      }
      return {
        tibetan: match[1],
        transliteration: match[2],
        phonetics: match[3] || "",
      };
    })
    .filter(Boolean);
}

/**
 * Get the path to the replacements CSV file.
 * @returns {string}
 */
export function getReplacementsPath() {
  return path.join(__dirname, "replacements.csv");
}

export default { loadReplacements, getReplacementsPath };
