import ColorPicker from "@/components/ui/color-picker";
import { type ColorState } from "@/types/color";
import React, { useState } from "react";

const ColorPickerExample: React.FC = () => {
  const [currentColor, setCurrentColor] = useState<ColorState | null>(null);

  const handleColorChange = (color: ColorState) => {
    setCurrentColor(color);
  };

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl font-bold mb-6">Color Forge - Color Picker</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-lg font-medium mb-4">Select a Color</h2>
          <ColorPicker
            initialColor="#3B82F6"
            onChange={handleColorChange}
            showFormatToggle={true}
            showSwatches={true}
            enableSaveSwatches={true}
            showCopyButton={true}
          />
        </div>

        <div>
          <h2 className="text-lg font-medium mb-4">Selected Color</h2>
          {currentColor ? (
            <div className="space-y-4">
              {/* Color Preview */}
              <div className="flex gap-3 items-center">
                <div
                  className="w-12 h-12 rounded-md border shadow-inner"
                  style={{
                    backgroundColor: currentColor.hex,
                    boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.1)",
                  }}
                />
                <div>
                  <p className="text-sm font-medium">{currentColor.hex}</p>
                  <p className="text-xs text-muted-foreground">
                    RGB: {currentColor.rgb.r}, {currentColor.rgb.g},{" "}
                    {currentColor.rgb.b}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    HSL: {currentColor.hsl.h}°, {currentColor.hsl.s}%,{" "}
                    {currentColor.hsl.l}%
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Alpha: {Math.round(currentColor.rgba.a * 100)}%
                  </p>
                </div>
              </div>

              {/* Example usage */}
              <div>
                <h3 className="text-sm font-medium mb-2">Example Usage</h3>
                <div className="space-y-2">
                  <div
                    className="p-4 rounded-md text-center font-medium"
                    style={{
                      backgroundColor: currentColor.hex,
                      color: currentColor.hsl.l > 60 ? "#000" : "#fff",
                    }}
                  >
                    Button with selected color
                  </div>

                  <div
                    className="p-4 rounded-md border"
                    style={{
                      borderColor: currentColor.hex,
                    }}
                  >
                    <p className="text-sm" style={{ color: currentColor.hex }}>
                      Text with selected color
                    </p>
                  </div>

                  <div
                    className="p-4 rounded-md text-white"
                    style={{
                      background: `linear-gradient(to right, ${currentColor.hex}, transparent)`,
                    }}
                  >
                    <p className="text-sm font-medium">
                      Gradient with selected color
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Select a color to see details
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ColorPickerExample;
