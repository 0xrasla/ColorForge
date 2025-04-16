import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CodeBlock from "@/components/ui/code-block";
import { ColorPicker } from "@/components/ui/color-picker";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Separator } from "@/components/ui/separator";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div className="container mx-auto max-w-3xl py-10">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-3xl flex items-center justify-between gap-2 mb-4">
            <div>
              ColorForge <Badge>v1.0</Badge>
            </div>
            <div className="flex gap-2 items-center">
              <div
                className="cursor-pointer"
                onClick={() =>
                  window.open("https://github.com/0xrasla/ColorForge", "_blank")
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <g fill="none">
                    <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                    <path
                      fill="currentColor"
                      d="M6.315 6.176c-.25-.638-.24-1.367-.129-2.034a6.8 6.8 0 0 1 2.12 1.07c.28.214.647.283.989.18A9.3 9.3 0 0 1 12 5c.961 0 1.874.14 2.703.391c.342.104.709.034.988-.18a6.8 6.8 0 0 1 2.119-1.07c.111.667.12 1.396-.128 2.033c-.15.384-.075.826.208 1.14C18.614 8.117 19 9.04 19 10c0 2.114-1.97 4.187-5.134 4.818c-.792.158-1.101 1.155-.495 1.726c.389.366.629.882.629 1.456v3a1 1 0 0 0 2 0v-3c0-.57-.12-1.112-.334-1.603C18.683 15.35 21 12.993 21 10c0-1.347-.484-2.585-1.287-3.622c.21-.82.191-1.646.111-2.28c-.071-.568-.17-1.312-.57-1.756c-.595-.659-1.58-.271-2.28-.032a9 9 0 0 0-2.125 1.045A11.4 11.4 0 0 0 12 3c-.994 0-1.953.125-2.851.356a9 9 0 0 0-2.125-1.045c-.7-.24-1.686-.628-2.281.031c-.408.452-.493 1.137-.566 1.719l-.005.038c-.08.635-.098 1.462.112 2.283C3.484 7.418 3 8.654 3 10c0 2.992 2.317 5.35 5.334 6.397A4 4 0 0 0 8 17.98l-.168.034c-.717.099-1.176.01-1.488-.122c-.76-.322-1.152-1.133-1.63-1.753c-.298-.385-.732-.866-1.398-1.088a1 1 0 0 0-.632 1.898c.558.186.944 1.142 1.298 1.566c.373.448.869.916 1.58 1.218c.682.29 1.483.393 2.438.276V21a1 1 0 0 0 2 0v-3c0-.574.24-1.09.629-1.456c.607-.572.297-1.568-.495-1.726C6.969 14.187 5 12.114 5 10c0-.958.385-1.881 1.108-2.684c.283-.314.357-.756.207-1.14"
                    />
                  </g>
                </svg>
              </div>

              <ModeToggle />
            </div>
          </CardTitle>
          <CardDescription>
            A modern, accessible, and feature-rich color picker for React. Built
            with <span className="font-semibold">shadcn/ui</span> and{" "}
            <span className="font-semibold">Tailwind CSS</span>.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-2">
            <Badge variant="secondary">🎨 Color Wheel</Badge>
            <Badge variant="secondary">📊 HEX/RGB/HSL</Badge>
            <Badge variant="secondary">⚡ Responsive</Badge>
            <Badge variant="secondary">🧩 Swatches</Badge>
            <Badge variant="secondary">📋 Copy</Badge>
            <Badge variant="secondary">♿ Accessible</Badge>
          </div>
          <p className="text-muted-foreground text-sm">
            Try the interactive color picker below, or check out the usage
            examples and API.
          </p>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-1 gap-8 items-start mb-12">
        <Card>
          <CardHeader>
            <CardTitle>Live Color Picker</CardTitle>
            <CardDescription>
              All-in-one, fully interactive. Save swatches, copy, and more.
            </CardDescription>
          </CardHeader>
          <CardContent className="w-full">
            <ColorPicker
              initialColor="#3B82F6"
              showFormatToggle
              showSwatches
              enableSaveSwatches
              showCopyButton
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Basic Usage</CardTitle>
            <CardDescription>
              Import and use <span className="font-mono">ColorPicker</span> in
              your app.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CodeBlock
              language="tsx"
              code={`import { ColorPicker } from "color-forge";

<ColorPicker initialColor="#3B82F6" onChange={color => console.log(color)} />`}
            />
          </CardContent>
        </Card>
      </div>

      <Separator className="my-10" />

      <div className="grid md:grid-cols-1 gap-8 items-start mb-12">
        <Card>
          <CardHeader>
            <CardTitle>Custom Swatches</CardTitle>
            <CardDescription>
              Provide your own palette for brand or theme colors.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CodeBlock
              language="tsx"
              code={`const mySwatches = [
  { name: "Brand Primary", color: "#0066CC" },
  { name: "Accent", color: "#FF9900" },
];

<ColorPicker swatches={mySwatches} />`}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Headless Usage</CardTitle>
            <CardDescription>
              Compose your own UI with hooks and primitives.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CodeBlock
              language="tsx"
              code={`import { useColor, ColorWheel, ColorInputs } from "color-forge";

const { color, updateHex, updateHsl } = useColor("#3B82F6");

<ColorWheel {...color.hsl} onChange={updateHsl} />
<ColorInputs color={color} onHexChange={updateHex} />`}
            />
          </CardContent>
        </Card>
      </div>

      <Separator className="my-10" />

      <Card>
        <CardHeader>
          <CardTitle>API Reference</CardTitle>
          <CardDescription>
            Key props for <span className="font-mono">ColorPicker</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border rounded-md">
              <thead>
                <tr className="bg-muted">
                  <th className="p-2 text-left font-semibold">Prop</th>
                  <th className="p-2 text-left font-semibold">Type</th>
                  <th className="p-2 text-left font-semibold">Default</th>
                  <th className="p-2 text-left font-semibold">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 font-mono">initialColor</td>
                  <td className="p-2 font-mono">string</td>
                  <td className="p-2">"#3B82F6"</td>
                  <td className="p-2">Initial color value (HEX)</td>
                </tr>
                <tr>
                  <td className="p-2 font-mono">onChange</td>
                  <td className="p-2 font-mono">
                    (color: ColorState) =&gt; void
                  </td>
                  <td className="p-2">-</td>
                  <td className="p-2">Callback when color changes</td>
                </tr>
                <tr>
                  <td className="p-2 font-mono">defaultFormat</td>
                  <td className="p-2 font-mono">"hex" | "rgb" | "hsl"</td>
                  <td className="p-2">"hex"</td>
                  <td className="p-2">Default color format</td>
                </tr>
                <tr>
                  <td className="p-2 font-mono">showFormatToggle</td>
                  <td className="p-2 font-mono">boolean</td>
                  <td className="p-2">true</td>
                  <td className="p-2">Show format switcher</td>
                </tr>
                <tr>
                  <td className="p-2 font-mono">showSwatches</td>
                  <td className="p-2 font-mono">boolean</td>
                  <td className="p-2">true</td>
                  <td className="p-2">Show color swatches</td>
                </tr>
                <tr>
                  <td className="p-2 font-mono">swatches</td>
                  <td className="p-2 font-mono">ColorSwatch[]</td>
                  <td className="p-2">defaultSwatches</td>
                  <td className="p-2">Custom swatches</td>
                </tr>
                <tr>
                  <td className="p-2 font-mono">enableSaveSwatches</td>
                  <td className="p-2 font-mono">boolean</td>
                  <td className="p-2">true</td>
                  <td className="p-2">Allow saving custom swatches</td>
                </tr>
                <tr>
                  <td className="p-2 font-mono">maxSavedSwatches</td>
                  <td className="p-2 font-mono">number</td>
                  <td className="p-2">10</td>
                  <td className="p-2">Max custom swatches</td>
                </tr>
                <tr>
                  <td className="p-2 font-mono">showCopyButton</td>
                  <td className="p-2 font-mono">boolean</td>
                  <td className="p-2">true</td>
                  <td className="p-2">Show copy button</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Separator className="my-10" />

      <div className="grid md:grid-cols-1 gap-8 items-start mb-12">
        <Card>
          <CardHeader>
            <CardTitle>Utility Hooks</CardTitle>
            <CardDescription>
              ColorForge provides several utility hooks for advanced color
              management
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">useColor</h3>
                <p className="text-muted-foreground text-sm mb-2">
                  A powerful hook for managing color state and conversions
                </p>
                <CodeBlock
                  language="tsx"
                  code={`import { useColor } from "color-forge/hooks";

const MyComponent = () => {
  const {
    color,     // Current color state
    format,    // Current format ('hex', 'rgb', 'hsl')
    setFormat, // Function to change format
    updateHex, // Function to update color by hex
    updateRgb, // Function to update color by RGB
    updateHsl, // Function to update color by HSL
    updateAlpha, // Function to update alpha/opacity
  } = useColor("#3B82F6");

  // Use color state and update functions
};`}
                />
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">useSwatches</h3>
                <p className="text-muted-foreground text-sm mb-2">
                  Manage color swatches with persistence
                </p>
                <CodeBlock
                  language="tsx"
                  code={`import { useSwatches } from "color-forge/hooks";

const ColorPalette = () => {
  const {
    swatches,      // Preset swatches
    savedSwatches, // User-saved swatches
    saveSwatch,    // Function to save a new custom swatch
    removeSwatch,  // Function to remove a saved swatch
  } = useSwatches(customSwatches, 10, true);

  return (
    <div className="grid grid-cols-8 gap-2">
      {savedSwatches.map((swatch) => (
        <div
          key={swatch.color}
          className="w-8 h-8 rounded cursor-pointer"
          style={{ backgroundColor: swatch.color }}
          onClick={() => selectColor(swatch.color)}
          title={swatch.name}
        />
      ))}
      <button 
        onClick={() => saveSwatch({ name: "Current", color: currentColor })}
        className="w-8 h-8 rounded border border-dashed flex items-center justify-center"
      >
        +
      </button>
    </div>
  );
};`}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Utility Functions</CardTitle>
            <CardDescription>
              Helper functions for color manipulation and conversion
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CodeBlock
              language="tsx"
              code={`import {
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

// Color manipulation example
const createPalette = (baseColor) => {
  const base = hexToRgb(baseColor);
  const hslBase = rgbToHsl(base);
  
  return {
    lighter: rgbToHex(hslToRgb({ ...hslBase, l: Math.min(hslBase.l + 20, 100) })),
    light: rgbToHex(hslToRgb({ ...hslBase, l: Math.min(hslBase.l + 10, 100) })),
    base: baseColor,
    dark: rgbToHex(hslToRgb({ ...hslBase, l: Math.max(hslBase.l - 10, 0) })),
    darker: rgbToHex(hslToRgb({ ...hslBase, l: Math.max(hslBase.l - 20, 0) })),
  };
};

const themePalette = createPalette("#3B82F6");`}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
