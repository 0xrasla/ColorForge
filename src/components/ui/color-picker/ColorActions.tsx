import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import type { ColorFormat, ColorState } from "@/types/color";
import React from "react";

interface ColorActionsProps {
  color: ColorState;
  format: ColorFormat;
  showCopyButton?: boolean;
  enableSaveSwatches?: boolean;
  onSaveSwatch?: () => void;
}

const ColorActions: React.FC<ColorActionsProps> = ({
  color,
  format,
  showCopyButton = true,
  enableSaveSwatches = true,
  onSaveSwatch,
}) => {
  const { copied, copyToClipboard } = useCopyToClipboard();

  // Get formatted color string based on current format
  const getColorString = (): string => {
    switch (format) {
      case "hex":
        return color.hex;
      case "rgb":
        return `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`;
      case "hsl":
        return `hsl(${color.hsl.h}, ${color.hsl.s}%, ${color.hsl.l}%)`;
      default:
        return color.hex;
    }
  };

  const handleCopy = async () => {
    await copyToClipboard(getColorString());
  };

  return (
    <div className="flex gap-2">
      {showCopyButton && (
        <button
          onClick={handleCopy}
          className="flex-1 px-3 py-1.5 text-xs font-medium bg-muted hover:bg-muted/80 text-muted-foreground rounded-md transition-colors"
          aria-label="Copy color to clipboard"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      )}

      {enableSaveSwatches && onSaveSwatch && (
        <button
          onClick={onSaveSwatch}
          className="flex-1 px-3 py-1.5 text-xs font-medium bg-primary/10 hover:bg-primary/20 text-primary rounded-md transition-colors"
          aria-label="Save color to swatches"
        >
          Save Swatch
        </button>
      )}
    </div>
  );
};

export default ColorActions;
