/**
 * Tibetan Sanskrit Transliteration Data
 *
 * Provides the replacement map for transliterating Tibetan-encoded Sanskrit.
 * This module works in both Node.js and browser environments.
 */

import { replacements } from "./data.js";

/**
 * Load the replacements data.
 * @returns {Array<{tibetan: string, transliteration: string, phonetics: string}>}
 */
export function loadReplacements() {
  return replacements;
}

export { replacements };

export default { loadReplacements, replacements };
