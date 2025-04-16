// Main library entry point
import {
  AlphaSlider,
  ColorActions,
  ColorInputs,
  ColorPicker,
  ColorSliders,
  ColorSwatches,
  ColorWheel,
} from "@/components/ui/color-picker";

// Re-export types
import type { ColorFormat, ColorPickerProps, ColorState } from "@/types/color";

// Export components
export {
  AlphaSlider,
  ColorActions,
  ColorInputs,
  ColorPicker,
  ColorSliders,
  ColorSwatches,
  ColorWheel,
};

// Export types
export type { ColorFormat, ColorPickerProps, ColorState };

// Default export
export default ColorPicker;
