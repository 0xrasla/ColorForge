import type { ColorFormat, ColorState } from "@/types/color";
import { isValidHex, type HSL, type RGB } from "@/utils/color/colorConversions";
import React, { useEffect, useState } from "react";

interface ColorInputsProps {
  color: ColorState;
  format: ColorFormat;
  setFormat: (format: ColorFormat) => void;
  showFormatToggle?: boolean;
  onHexChange: (hex: string) => void;
  onRgbChange: (rgb: RGB) => void;
  onHslChange: (hsl: HSL) => void;
}

const ColorInputs: React.FC<ColorInputsProps> = ({
  color,
  format,
  setFormat,
  showFormatToggle = true,
  onHexChange,
  onRgbChange,
  onHslChange,
}) => {
  // Local state for input values (to handle incomplete values)
  const [hexValue, setHexValue] = useState(color.hex);
  const [rgbValues, setRgbValues] = useState({ ...color.rgb });
  const [hslValues, setHslValues] = useState({ ...color.hsl });

  // Update local values when color prop changes
  useEffect(() => {
    setHexValue(color.hex);
    setRgbValues({ ...color.rgb });
    setHslValues({ ...color.hsl });
  }, [color]);

  // Format handlers
  const toggleFormat = () => {
    const formats: ColorFormat[] = ["hex", "rgb", "hsl"];
    const currentIndex = formats.indexOf(format);
    const nextIndex = (currentIndex + 1) % formats.length;
    setFormat(formats[nextIndex]);
  };

  // Input change handlers
  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setHexValue(value);

    // Process complete hex values only
    if (isValidHex(value)) {
      onHexChange(value);
    }
  };

  const handleRgbChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    channel: "r" | "g" | "b"
  ) => {
    const value = e.target.value;
    const numValue = value === "" ? 0 : parseInt(value, 10);

    // Update local state immediately for smoother typing
    setRgbValues((prev) => ({ ...prev, [channel]: value }));

    // Only update global state with valid numbers
    if (!isNaN(numValue)) {
      const clampedValue = Math.max(0, Math.min(255, numValue));
      onRgbChange({ ...color.rgb, [channel]: clampedValue });
    }
  };

  const handleHslChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    channel: "h" | "s" | "l"
  ) => {
    const value = e.target.value;
    const numValue = value === "" ? 0 : parseInt(value, 10);

    // Update local state immediately for smoother typing
    setHslValues((prev) => ({ ...prev, [channel]: value }));

    // Only update global state with valid numbers
    if (!isNaN(numValue)) {
      const maxValues = { h: 359, s: 100, l: 100 };
      const clampedValue = Math.max(0, Math.min(maxValues[channel], numValue));
      onHslChange({ ...color.hsl, [channel]: clampedValue });
    }
  };

  // Render appropriate input fields based on format
  const renderInputs = () => {
    switch (format) {
      case "hex":
        return (
          <div className="relative w-full">
            <input
              type="text"
              value={hexValue}
              onChange={handleHexChange}
              maxLength={7}
              className="w-full h-8 px-2 border rounded text-xs font-mono bg-background border-input focus:outline-none focus:ring-1 focus:ring-ring"
              placeholder="#000000"
              aria-label="HEX color value"
            />
          </div>
        );

      case "rgb":
        return (
          <div className="flex space-x-2">
            <div className="flex-1">
              <input
                type="number"
                value={rgbValues.r}
                onChange={(e) => handleRgbChange(e, "r")}
                min={0}
                max={255}
                className="w-full h-8 px-2 border rounded text-xs font-mono bg-background border-input focus:outline-none focus:ring-1 focus:ring-ring"
                aria-label="Red value"
              />
            </div>
            <div className="flex-1">
              <input
                type="number"
                value={rgbValues.g}
                onChange={(e) => handleRgbChange(e, "g")}
                min={0}
                max={255}
                className="w-full h-8 px-2 border rounded text-xs font-mono bg-background border-input focus:outline-none focus:ring-1 focus:ring-ring"
                aria-label="Green value"
              />
            </div>
            <div className="flex-1">
              <input
                type="number"
                value={rgbValues.b}
                onChange={(e) => handleRgbChange(e, "b")}
                min={0}
                max={255}
                className="w-full h-8 px-2 border rounded text-xs font-mono bg-background border-input focus:outline-none focus:ring-1 focus:ring-ring"
                aria-label="Blue value"
              />
            </div>
          </div>
        );

      case "hsl":
        return (
          <div className="flex space-x-2">
            <div className="flex-1">
              <input
                type="number"
                value={hslValues.h}
                onChange={(e) => handleHslChange(e, "h")}
                min={0}
                max={359}
                className="w-full h-8 px-2 border rounded text-xs font-mono bg-background border-input focus:outline-none focus:ring-1 focus:ring-ring"
                aria-label="Hue value"
              />
            </div>
            <div className="flex-1">
              <input
                type="number"
                value={hslValues.s}
                onChange={(e) => handleHslChange(e, "s")}
                min={0}
                max={100}
                className="w-full h-8 px-2 border rounded text-xs font-mono bg-background border-input focus:outline-none focus:ring-1 focus:ring-ring"
                aria-label="Saturation value"
              />
            </div>
            <div className="flex-1">
              <input
                type="number"
                value={hslValues.l}
                onChange={(e) => handleHslChange(e, "l")}
                min={0}
                max={100}
                className="w-full h-8 px-2 border rounded text-xs font-mono bg-background border-input focus:outline-none focus:ring-1 focus:ring-ring"
                aria-label="Lightness value"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center mb-1.5">
        <label className="text-xs font-medium text-muted-foreground mr-2">
          {format === "hex" ? "HEX" : format === "rgb" ? "RGB" : "HSL"}
        </label>

        {showFormatToggle && (
          <button
            onClick={toggleFormat}
            className="text-[10px] ml-auto text-muted-foreground hover:text-primary transition-colors"
            aria-label="Toggle color format"
          >
            Switch to{" "}
            {format === "hex" ? "RGB" : format === "rgb" ? "HSL" : "HEX"}
          </button>
        )}
      </div>

      {renderInputs()}
    </div>
  );
};

export default ColorInputs;
