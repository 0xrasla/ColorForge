/**
 * Color format conversion utilities for ColorForge
 */

export type RGB = {
  r: number;
  g: number;
  b: number;
};

export type RGBA = RGB & {
  a: number;
};

export type HSL = {
  h: number;
  s: number;
  l: number;
};

export type HSLA = HSL & {
  a: number;
};

/**
 * Convert a hex color string to RGB object
 */
export const hexToRgb = (hex: string): RGB | null => {
  // Remove # if present
  hex = hex.replace(/^#/, "");

  // Parse hex to RGB
  if (hex.length === 3) {
    // Convert 3-digit hex to 6-digit
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }

  const bigint = parseInt(hex, 16);
  if (isNaN(bigint)) return null;

  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
};

/**
 * Convert RGB object to hex color string
 */
export const rgbToHex = (rgb: RGB): string => {
  const { r, g, b } = rgb;
  return (
    "#" +
    [r, g, b]
      .map((x) => {
        const hex = Math.max(0, Math.min(255, Math.round(x))).toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")
  );
};

/**
 * Convert RGB object to HSL object
 */
export const rgbToHsl = ({ r, g, b }: RGB): HSL => {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const diff = max - min;

  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (diff !== 0) {
    s = l > 0.5 ? diff / (2 - max - min) : diff / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / diff + (g < b ? 6 : 0)) * 60;
        break;
      case g:
        h = ((b - r) / diff + 2) * 60;
        break;
      case b:
        h = ((r - g) / diff + 4) * 60;
        break;
    }
  }

  return {
    h: Math.round(h),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
};

/**
 * Convert HSL object to RGB object
 */
export const hslToRgb = ({ h, s, l }: HSL): RGB => {
  s /= 100;
  l /= 100;
  h %= 360;
  if (h < 0) h += 360;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  let r = 0,
    g = 0,
    b = 0;

  if (h >= 0 && h < 60) {
    [r, g, b] = [c, x, 0];
  } else if (h >= 60 && h < 120) {
    [r, g, b] = [x, c, 0];
  } else if (h >= 120 && h < 180) {
    [r, g, b] = [0, c, x];
  } else if (h >= 180 && h < 240) {
    [r, g, b] = [0, x, c];
  } else if (h >= 240 && h < 300) {
    [r, g, b] = [x, 0, c];
  } else if (h >= 300 && h < 360) {
    [r, g, b] = [c, 0, x];
  }

  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
  };
};

/**
 * Convert a string in format "rgba(r, g, b, a)" to RGBA object
 */
export const stringToRgba = (rgba: string): RGBA | null => {
  const match = rgba.match(
    /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d*\.?\d+))?\)/
  );
  if (!match) return null;

  return {
    r: parseInt(match[1], 10),
    g: parseInt(match[2], 10),
    b: parseInt(match[3], 10),
    a: match[4] !== undefined ? parseFloat(match[4]) : 1,
  };
};

/**
 * Convert RGBA object to string "rgba(r, g, b, a)"
 */
export const rgbaToString = ({ r, g, b, a }: RGBA): string => {
  return `rgba(${r}, ${g}, ${b}, ${a})`;
};

/**
 * Validate if a string is a valid hex color
 */
export const isValidHex = (hex: string): boolean => {
  return /^#?([0-9A-F]{3}|[0-9A-F]{6})$/i.test(hex);
};

/**
 * Generate a random hex color
 */
export const randomHexColor = (): string => {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0")}`;
};
