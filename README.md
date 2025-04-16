# ColorForge 🎨 - React Color Picker

A modern, accessible, and feature-rich color picker component for React applications.

## Features

- 🎨 **Interactive Color Wheel** - Select colors visually using the intuitive color wheel UI
- 📊 **Multiple Color Formats** - HEX, RGB, HSL with bi-directional syncing
- 🔍 **Fine-Tuned Control** - Precise sliders for RGB, HSL, and alpha values
- ⚡ **Responsive & Mobile-Friendly** - Works great on all screen sizes
- 🎭 **Theming Support** - Built with shadcn/ui and TailwindCSS for dark/light mode
- 🧩 **Swatches System** - Built-in preset colors and ability to save custom colors
- 📋 **Copy to Clipboard** - Quick copy of color values in different formats
- ♿ **Keyboard Accessible** - Navigable with keyboard for improved accessibility

## Installation

```bash
# Using npm
npm install color-forge

# Using yarn
yarn add color-forge

# Using pnpm
pnpm add color-forge

# Using bun
bun add color-forge
```

## Basic Usage

```jsx
import React, { useState } from "react";
import { ColorPicker } from "color-forge";

const MyComponent = () => {
  const [color, setColor] = useState("#3B82F6");

  const handleColorChange = (colorState) => {
    setColor(colorState.hex);
    console.log("Selected color:", colorState);
  };

  return (
    <div>
      <h2>Pick a color</h2>
      <ColorPicker initialColor={color} onChange={handleColorChange} />
    </div>
  );
};
```

## API Reference

### `<ColorPicker />` Component

The main component that combines all color picker functionality.

#### Props

| Prop                 | Type                          | Default           | Description                                     |
| -------------------- | ----------------------------- | ----------------- | ----------------------------------------------- |
| `initialColor`       | `string`                      | `'#3B82F6'`       | Initial color value (HEX format)                |
| `onChange`           | `(color: ColorState) => void` | `undefined`       | Callback when color changes                     |
| `defaultFormat`      | `'hex' \| 'rgb' \| 'hsl'`     | `'hex'`           | Default color format to display                 |
| `showFormatToggle`   | `boolean`                     | `true`            | Whether to show format switcher                 |
| `showSwatches`       | `boolean`                     | `true`            | Whether to show color swatches                  |
| `swatches`           | `ColorSwatch[]`               | `defaultSwatches` | Custom swatches to display                      |
| `enableSaveSwatches` | `boolean`                     | `true`            | Whether to allow saving custom swatches         |
| `maxSavedSwatches`   | `number`                      | `10`              | Max number of custom swatches that can be saved |
| `showCopyButton`     | `boolean`                     | `true`            | Whether to show the copy button                 |

#### ColorState Type

```typescript
interface ColorState {
  hex: string; // e.g., "#3B82F6"
  rgb: {
    r: number; // 0-255
    g: number; // 0-255
    b: number; // 0-255
  };
  rgba: {
    r: number; // 0-255
    g: number; // 0-255
    b: number; // 0-255
    a: number; // 0-1
  };
  hsl: {
    h: number; // 0-359
    s: number; // 0-100
    l: number; // 0-100
  };
  hsla: {
    h: number; // 0-359
    s: number; // 0-100
    l: number; // 0-100
    a: number; // 0-1
  };
}
```

## Advanced Usage

### Custom Swatches

You can provide your own custom swatches to the color picker:

```jsx
import { ColorPicker } from "color-forge";

const myCustomSwatches = [
  { name: "Brand Primary", color: "#0066CC" },
  { name: "Brand Secondary", color: "#FF9900" },
  { name: "Brand Accent", color: "#9933CC" },
  // ...more swatches
];

const MyColorPicker = () => (
  <ColorPicker swatches={myCustomSwatches} enableSaveSwatches={true} />
);
```

### Individual Components

You can also use the individual components for a more customized layout:

```jsx
import {
  ColorWheel,
  ColorSliders,
  ColorInputs,
  AlphaSlider,
} from "color-forge";
import { useColor } from "color-forge/hooks";

const CustomColorPicker = () => {
  const {
    color,
    format,
    setFormat,
    updateHex,
    updateRgb,
    updateHsl,
    updateAlpha,
  } = useColor("#3B82F6");

  return (
    <div className="my-custom-layout">
      <div className="my-preview" style={{ backgroundColor: color.hex }}>
        Current: {color.hex}
      </div>

      <ColorWheel
        hue={color.hsl.h}
        saturation={color.hsl.s}
        lightness={color.hsl.l}
        onChange={updateHsl}
      />

      <div className="my-controls">
        <ColorInputs
          color={color}
          format={format}
          setFormat={setFormat}
          onHexChange={updateHex}
          onRgbChange={updateRgb}
          onHslChange={updateHsl}
        />

        <AlphaSlider
          alpha={color.rgba.a}
          color={color.hex}
          onChange={updateAlpha}
        />

        <ColorSliders
          color={color}
          onRgbChange={updateRgb}
          onHslChange={updateHsl}
        />
      </div>
    </div>
  );
};
```

## Utility Hooks

ColorForge provides several utility hooks for working with colors:

### `useColor`

```jsx
import { useColor } from "color-forge/hooks";

const MyComponent = () => {
  const {
    color, // Current color state
    format, // Current format ('hex', 'rgb', 'hsl')
    setFormat, // Function to change format
    updateHex, // Function to update color by hex
    updateRgb, // Function to update color by RGB
    updateHsl, // Function to update color by HSL
    updateAlpha, // Function to update alpha/opacity
  } = useColor("#3B82F6");

  // Use color state and update functions
};
```

### `useSwatches`

```jsx
import { useSwatches } from "color-forge/hooks";

const MyComponent = () => {
  const {
    swatches, // Preset swatches
    savedSwatches, // User-saved swatches
    saveSwatch, // Function to save a new custom swatch
    removeSwatch, // Function to remove a saved swatch
  } = useSwatches(customSwatches, 10, true);

  // Use swatch functionality
};
```

## Utility Functions

ColorForge provides various color utility functions:

```jsx
import {
  hexToRgb,
  rgbToHex,
  rgbToHsl,
  hslToRgb,
  isValidHex,
  randomHexColor,
} from "color-forge/utils";

// Convert between formats
const rgb = hexToRgb("#3B82F6");
const hex = rgbToHex({ r: 59, g: 130, b: 246 });
const hsl = rgbToHsl({ r: 59, g: 130, b: 246 });
const rgbFromHsl = hslToRgb({ h: 217, s: 91, l: 60 });

// Validate and generate colors
const isValid = isValidHex("#3B82F6");
const randomColor = randomHexColor();
```

## Development

To start the development server:

```bash
bun install
bun run dev
```

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## License

MIT License
