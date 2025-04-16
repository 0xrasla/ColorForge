import type { ColorState } from "@/types/color";
import type { HSL, RGB } from "@/utils/color/colorConversions";
import React from "react";

interface ColorSlidersProps {
  color: ColorState;
  onRgbChange: (rgb: RGB) => void;
  onHslChange: (hsl: HSL) => void;
}

const ColorSliders: React.FC<ColorSlidersProps> = ({
  color,
  onRgbChange,
  onHslChange,
}) => {
  // RGB handlers
  const handleRChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = clamp(parseInt(e.target.value, 10), 0, 255);
    onRgbChange({ ...color.rgb, r: value });
  };

  const handleGChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = clamp(parseInt(e.target.value, 10), 0, 255);
    onRgbChange({ ...color.rgb, g: value });
  };

  const handleBChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = clamp(parseInt(e.target.value, 10), 0, 255);
    onRgbChange({ ...color.rgb, b: value });
  };

  // HSL handlers
  const handleHueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = clamp(parseInt(e.target.value, 10), 0, 359);
    onHslChange({ ...color.hsl, h: value });
  };

  const handleSaturationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = clamp(parseInt(e.target.value, 10), 0, 100);
    onHslChange({ ...color.hsl, s: value });
  };

  const handleLightnessChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = clamp(parseInt(e.target.value, 10), 0, 100);
    onHslChange({ ...color.hsl, l: value });
  };

  // Helper function to clamp values
  const clamp = (value: number, min: number, max: number): number => {
    return Math.max(min, Math.min(max, value));
  };

  return (
    <div className="space-y-3">
      {/* RGB Sliders */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium w-8 text-muted-foreground">
            R
          </span>
          <input
            type="range"
            min="0"
            max="255"
            value={color.rgb.r}
            onChange={handleRChange}
            className="flex-grow h-2 rounded-lg appearance-none cursor-pointer bg-gradient-to-r from-black to-red-600"
          />
          <span className="text-xs font-mono w-8 text-right text-muted-foreground">
            {color.rgb.r}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-medium w-8 text-muted-foreground">
            G
          </span>
          <input
            type="range"
            min="0"
            max="255"
            value={color.rgb.g}
            onChange={handleGChange}
            className="flex-grow h-2 rounded-lg appearance-none cursor-pointer bg-gradient-to-r from-black to-green-600"
          />
          <span className="text-xs font-mono w-8 text-right text-muted-foreground">
            {color.rgb.g}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-medium w-8 text-muted-foreground">
            B
          </span>
          <input
            type="range"
            min="0"
            max="255"
            value={color.rgb.b}
            onChange={handleBChange}
            className="flex-grow h-2 rounded-lg appearance-none cursor-pointer bg-gradient-to-r from-black to-blue-600"
          />
          <span className="text-xs font-mono w-8 text-right text-muted-foreground">
            {color.rgb.b}
          </span>
        </div>
      </div>

      {/* HSL Sliders */}
      <div className="space-y-2 mt-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium w-8 text-muted-foreground">
            H
          </span>
          <input
            type="range"
            min="0"
            max="359"
            value={color.hsl.h}
            onChange={handleHueChange}
            className="flex-grow h-2 rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, 
                hsl(0, 100%, 50%),
                hsl(60, 100%, 50%),
                hsl(120, 100%, 50%),
                hsl(180, 100%, 50%),
                hsl(240, 100%, 50%),
                hsl(300, 100%, 50%),
                hsl(0, 100%, 50%))`,
            }}
          />
          <span className="text-xs font-mono w-8 text-right text-muted-foreground">
            {color.hsl.h}°
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-medium w-8 text-muted-foreground">
            S
          </span>
          <input
            type="range"
            min="0"
            max="100"
            value={color.hsl.s}
            onChange={handleSaturationChange}
            className="flex-grow h-2 rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, 
                hsl(${color.hsl.h}, 0%, 50%), 
                hsl(${color.hsl.h}, 100%, 50%))`,
            }}
          />
          <span className="text-xs font-mono w-8 text-right text-muted-foreground">
            {color.hsl.s}%
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-medium w-8 text-muted-foreground">
            L
          </span>
          <input
            type="range"
            min="0"
            max="100"
            value={color.hsl.l}
            onChange={handleLightnessChange}
            className="flex-grow h-2 rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, 
                #000, 
                hsl(${color.hsl.h}, ${color.hsl.s}%, 50%), 
                #fff)`,
            }}
          />
          <span className="text-xs font-mono w-8 text-right text-muted-foreground">
            {color.hsl.l}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default ColorSliders;
