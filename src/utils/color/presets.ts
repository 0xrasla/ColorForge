/**
 * Color presets and default swatches for ColorForge
 */

export type ColorSwatch = {
  name: string;
  color: string;
};

export const defaultSwatches: ColorSwatch[] = [
  { name: "Red", color: "#FF0000" },
  { name: "Orange", color: "#FF9500" },
  { name: "Yellow", color: "#FFCC00" },
  { name: "Green", color: "#4CD964" },
  { name: "Teal", color: "#5AC8FA" },
  { name: "Blue", color: "#007AFF" },
  { name: "Purple", color: "#5856D6" },
  { name: "Pink", color: "#FF2D55" },
  { name: "Black", color: "#000000" },
  { name: "Gray", color: "#8E8E93" },
  { name: "White", color: "#FFFFFF" },
];

export const materialColors: ColorSwatch[] = [
  { name: "Red 500", color: "#F44336" },
  { name: "Pink 500", color: "#E91E63" },
  { name: "Purple 500", color: "#9C27B0" },
  { name: "Deep Purple 500", color: "#673AB7" },
  { name: "Indigo 500", color: "#3F51B5" },
  { name: "Blue 500", color: "#2196F3" },
  { name: "Light Blue 500", color: "#03A9F4" },
  { name: "Cyan 500", color: "#00BCD4" },
  { name: "Teal 500", color: "#009688" },
  { name: "Green 500", color: "#4CAF50" },
  { name: "Light Green 500", color: "#8BC34A" },
  { name: "Lime 500", color: "#CDDC39" },
  { name: "Yellow 500", color: "#FFEB3B" },
  { name: "Amber 500", color: "#FFC107" },
  { name: "Orange 500", color: "#FF9800" },
  { name: "Deep Orange 500", color: "#FF5722" },
  { name: "Brown 500", color: "#795548" },
  { name: "Gray 500", color: "#9E9E9E" },
  { name: "Blue Gray 500", color: "#607D8B" },
];

export const defaultColor = "#3B82F6"; // Blue 500
