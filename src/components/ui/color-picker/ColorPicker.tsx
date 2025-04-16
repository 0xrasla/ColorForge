import { useColor } from "@/hooks/useColor";
import { useSwatches } from "@/hooks/useSwatches";
import type { ColorPickerProps } from "@/types/color";
import { defaultColor } from "@/utils/color/presets";
import React, { useEffect } from "react";
import ColorInputs from "./ColorInputs";
import AlphaSlider from "./AlphaSlider";
import ColorActions from "./ColorActions";
import ColorSliders from "./ColorSliders";
import ColorSwatches from "./ColorSwatches";
import ColorWheel from "./ColorWheel";

const ColorPicker: React.FC<ColorPickerProps> = ({
  initialColor = defaultColor,
  onChange,
  defaultFormat = "hex",
  showFormatToggle = true,
  showSwatches = true,
  swatches,
  enableSaveSwatches = true,
  maxSavedSwatches = 10,
  showCopyButton = true,
}) => {
  const {
    color,
    format,
    setFormat,
    updateHex,
    updateRgb,
    updateHsl,
    updateAlpha,
  } = useColor(initialColor);

  const {
    swatches: colorSwatches,
    savedSwatches,
    saveSwatch,
    removeSwatch,
  } = useSwatches(swatches, maxSavedSwatches, enableSaveSwatches);

  // Notify parent component when color changes
  useEffect(() => {
    if (onChange) {
      onChange(color);
    }
  }, [color, onChange]);

  return (
    <div className="color-picker flex flex-col space-y-4 w-full max-w-sm rounded-lg border border-border bg-card p-4">
      {/* Color preview */}
      <div className="flex items-center space-x-4">
        <div
          className="w-16 h-16 rounded-md shadow-inner"
          style={{
            backgroundColor: color.hex,
            backgroundImage:
              "linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)",
            backgroundSize: "8px 8px",
            backgroundPosition: "0 0, 0 4px, 4px -4px, -4px 0px",
            boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.1)",
          }}
        >
          <div
            className="w-full h-full rounded-md"
            style={{
              backgroundColor: `rgba(${color.rgba.r}, ${color.rgba.g}, ${color.rgba.b}, ${color.rgba.a})`,
            }}
          />
        </div>

        <div className="flex-1">
          <ColorInputs
            color={color}
            format={format}
            setFormat={setFormat}
            showFormatToggle={showFormatToggle}
            onHexChange={updateHex}
            onRgbChange={updateRgb}
            onHslChange={updateHsl}
          />
        </div>
      </div>

      {/* Color wheel */}
      <ColorWheel
        hue={color.hsl.h}
        saturation={color.hsl.s}
        lightness={color.hsl.l}
        onChange={updateHsl}
      />

      {/* RGB and HSL sliders */}
      <ColorSliders
        color={color}
        onRgbChange={updateRgb}
        onHslChange={updateHsl}
      />

      {/* Alpha slider */}
      <AlphaSlider
        alpha={color.rgba.a}
        color={color.hex}
        onChange={updateAlpha}
      />

      {/* Actions: Copy, Save swatch */}
      <ColorActions
        color={color}
        format={format}
        showCopyButton={showCopyButton}
        enableSaveSwatches={enableSaveSwatches}
        onSaveSwatch={() => saveSwatch(color.hex)}
      />

      {/* Color swatches */}
      {showSwatches && (
        <ColorSwatches
          swatches={colorSwatches}
          savedSwatches={savedSwatches}
          onSelectSwatch={updateHex}
          onRemoveSwatch={removeSwatch}
          showSavedSwatches={enableSaveSwatches}
        />
      )}
    </div>
  );
};

export default ColorPicker;
