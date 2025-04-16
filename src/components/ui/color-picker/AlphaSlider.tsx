import React from "react";

interface AlphaSliderProps {
  alpha: number;
  color: string;
  onChange: (alpha: number) => void;
}

const AlphaSlider: React.FC<AlphaSliderProps> = ({
  alpha,
  color,
  onChange,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    onChange(value);
  };

  const alphaPercentage = Math.round(alpha * 100);

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="text-xs font-medium text-muted-foreground">
          Opacity
        </label>
        <span className="text-xs font-mono text-muted-foreground">
          {alphaPercentage}%
        </span>
      </div>

      <div
        className="relative h-6 rounded-md overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)",
          backgroundSize: "8px 8px",
          backgroundPosition: "0 0, 0 4px, 4px -4px, -4px 0px",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to right, transparent, ${color})`,
          }}
        />
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={alpha}
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          aria-label="Alpha/opacity slider"
        />
        <div
          className="absolute top-0 bottom-0 w-1 rounded bg-white border border-gray-400 shadow-sm pointer-events-none"
          style={{
            left: `calc(${alpha * 100}% - 2px)`,
            height: "100%",
          }}
        />
      </div>
    </div>
  );
};

export default AlphaSlider;
