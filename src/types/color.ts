import type { HSL, HSLA, RGB, RGBA } from "@/utils/color/colorConversions";
import type { ColorSwatch } from "@/utils/color/presets";

export type ColorFormat = "hex" | "rgb" | "hsl";

export interface ColorState {
  hex: string;
  rgb: RGB;
  rgba: RGBA;
  hsl: HSL;
  hsla: HSLA;
}

export interface ColorPickerProps {
  /**
   * The initial color value
   * @default "#3B82F6"
   */
  initialColor?: string;

  /**
   * Function called when color changes
   */
  onChange?: (color: ColorState) => void;

  /**
   * The default color format to display
   * @default "hex"
   */
  defaultFormat?: ColorFormat;

  /**
   * Whether to show format switcher
   * @default true
   */
  showFormatToggle?: boolean;

  /**
   * Whether to show swatches
   * @default true
   */
  showSwatches?: boolean;

  /**
   * Custom swatches to display
   */
  swatches?: ColorSwatch[];

  /**
   * Whether to allow saving custom swatches
   * @default true
   */
  enableSaveSwatches?: boolean;

  /**
   * Max number of custom swatches that can be saved
   * @default 10
   */
  maxSavedSwatches?: number;

  /**
   * Whether to show the copy button
   * @default true
   */
  showCopyButton?: boolean;
}
