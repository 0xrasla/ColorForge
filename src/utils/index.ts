// Export all color utilities
import {
  hexToRgb,
  hslToRgb,
  isValidHex,
  randomHexColor,
  rgbaToString,
  rgbToHex,
  rgbToHsl,
  stringToRgba,
  type HSL,
  type HSLA,
  type RGB,
  type RGBA,
} from "./color/colorConversions";

import {
  defaultColor,
  defaultSwatches,
  materialColors,
  type ColorSwatch,
} from "./color/presets";

// Export color conversions functions
export {
  hexToRgb,
  hslToRgb,
  isValidHex,
  randomHexColor,
  rgbaToString,
  rgbToHex,
  rgbToHsl,
  stringToRgba,
};

// Export color presets
export { defaultColor, defaultSwatches, materialColors };

// Export types
export type { ColorSwatch, HSL, HSLA, RGB, RGBA };
