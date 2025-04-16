import type { ColorSwatch } from "@/utils/color/presets";
import React from "react";

interface ColorSwatchesProps {
  swatches: ColorSwatch[];
  savedSwatches: ColorSwatch[];
  onSelectSwatch: (color: string) => void;
  onRemoveSwatch?: (index: number) => void;
  showSavedSwatches?: boolean;
}

const ColorSwatches: React.FC<ColorSwatchesProps> = ({
  swatches,
  savedSwatches,
  onSelectSwatch,
  onRemoveSwatch,
  showSavedSwatches = true,
}) => {
  return (
    <div className="space-y-3">
      {/* Default swatches */}
      <div>
        <h3 className="text-xs font-medium text-muted-foreground mb-2">
          Presets
        </h3>
        <div className="grid grid-cols-6 gap-1">
          {swatches.map((swatch, index) => (
            <button
              key={`default-${index}-${swatch.color}`}
              onClick={() => onSelectSwatch(swatch.color)}
              className="w-6 h-6 rounded-md cursor-pointer border border-border hover:scale-110 transition-transform"
              style={{
                backgroundColor: swatch.color,
                boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.1)",
              }}
              title={swatch.name}
              aria-label={`Select color ${swatch.name}`}
            />
          ))}
        </div>
      </div>

      {/* Saved custom swatches */}
      {showSavedSwatches && savedSwatches.length > 0 && (
        <div>
          <h3 className="text-xs font-medium text-muted-foreground mb-2">
            Saved Colors
          </h3>
          <div className="grid grid-cols-6 gap-1">
            {savedSwatches.map((swatch, index) => (
              <div
                key={`saved-${index}-${swatch.color}`}
                className="relative group"
              >
                <button
                  onClick={() => onSelectSwatch(swatch.color)}
                  className="w-6 h-6 rounded-md cursor-pointer border border-border hover:scale-110 transition-transform"
                  style={{
                    backgroundColor: swatch.color,
                    boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.1)",
                  }}
                  title={swatch.name}
                  aria-label={`Select saved color ${swatch.name}`}
                />

                {onRemoveSwatch && (
                  <button
                    onClick={() => onRemoveSwatch(index)}
                    className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-red-500 text-white flex items-center justify-center text-[8px] opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label={`Remove saved color ${swatch.name}`}
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorSwatches;
