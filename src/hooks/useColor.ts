import type { ColorFormat, ColorState } from "@/types/color";
import {
  hexToRgb,
  hslToRgb,
  isValidHex,
  rgbToHex,
  rgbToHsl,
  type HSL,
  type RGB,
} from "@/utils/color/colorConversions";
import { defaultColor } from "@/utils/color/presets";
import { useCallback, useEffect, useState } from "react";

/**
 * Hook for managing a color value with different format representations
 */
export const useColor = (
  initialColor?: string
): {
  color: ColorState;
  format: ColorFormat;
  setFormat: (format: ColorFormat) => void;
  updateHex: (hex: string) => void;
  updateRgb: (rgb: RGB) => void;
  updateHsl: (hsl: HSL) => void;
  updateAlpha: (alpha: number) => void;
} => {
  const [format, setFormat] = useState<ColorFormat>("hex");

  // Initialize with default or provided color
  const initColor = useCallback((colorStr: string): ColorState => {
    const validHex = isValidHex(colorStr)
      ? colorStr.replace(/^#/, "").padEnd(6, "0")
      : defaultColor.replace(/^#/, "");
    const hexColor = `#${validHex}`;
    const rgb = hexToRgb(hexColor) || { r: 0, g: 0, b: 0 };
    const hsl = rgbToHsl(rgb);

    return {
      hex: hexColor,
      rgb: rgb,
      rgba: { ...rgb, a: 1 },
      hsl: hsl,
      hsla: { ...hsl, a: 1 },
    };
  }, []);

  const [color, setColor] = useState<ColorState>(
    initColor(initialColor || defaultColor)
  );

  // Synchronize with initialColor prop changes
  useEffect(() => {
    if (initialColor) {
      setColor(initColor(initialColor));
    }
  }, [initialColor, initColor]);

  // Update functions for each color format
  const updateHex = useCallback((hex: string) => {
    if (!isValidHex(hex)) return;

    const cleanHex = hex.replace(/^#/, "");
    const rgb = hexToRgb(`#${cleanHex}`) || { r: 0, g: 0, b: 0 };
    const hsl = rgbToHsl(rgb);

    setColor((prev) => ({
      hex: `#${cleanHex}`,
      rgb: rgb,
      rgba: { ...rgb, a: prev.rgba.a },
      hsl: hsl,
      hsla: { ...hsl, a: prev.hsla.a },
    }));
  }, []);

  const updateRgb = useCallback((rgb: RGB) => {
    const hex = rgbToHex(rgb);
    const hsl = rgbToHsl(rgb);

    setColor((prev) => ({
      hex: hex,
      rgb: rgb,
      rgba: { ...rgb, a: prev.rgba.a },
      hsl: hsl,
      hsla: { ...hsl, a: prev.hsla.a },
    }));
  }, []);

  const updateHsl = useCallback((hsl: HSL) => {
    const rgb = hslToRgb(hsl);
    const hex = rgbToHex(rgb);

    setColor((prev) => ({
      hex: hex,
      rgb: rgb,
      rgba: { ...rgb, a: prev.rgba.a },
      hsl: hsl,
      hsla: { ...hsl, a: prev.hsla.a },
    }));
  }, []);

  const updateAlpha = useCallback((alpha: number) => {
    setColor((prev) => ({
      ...prev,
      rgba: { ...prev.rgb, a: alpha },
      hsla: { ...prev.hsl, a: alpha },
    }));
  }, []);

  return {
    color,
    format,
    setFormat,
    updateHex,
    updateRgb,
    updateHsl,
    updateAlpha,
  };
};
