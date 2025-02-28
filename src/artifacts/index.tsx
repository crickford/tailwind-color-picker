import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Copy } from "lucide-react";

import { ColorList, STEPS, TAILWIND_COLORS } from "./constants";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const rotateArray = (arr: ColorList, k: number) => {
  const rotationIndex = k % arr.length;
  return [
    ...arr.slice(rotationIndex),
    ...arr.slice(0, rotationIndex),
  ] as ColorList;
};

const ColorPaletteGenerator = () => {
  const [lightnessValue, setLightnessValue] = useState([4]); // Default to 500 (index 4)
  const [hueOffset, setHueOffset] = useState([0]); // Default to 0 (no rotation)
  const [showNeutralColors, setShowNeutralColors] = useState(true);
  const selectedStep = STEPS[lightnessValue[0]];

  const colorEntries = showNeutralColors
    ? Object.entries(TAILWIND_COLORS)
    : Object.entries(TAILWIND_COLORS).filter(
        (value) =>
          !["slate", "gray", "zinc", "neutral", "stone"].find(
            (nuetralColor) => value[0] === nuetralColor
          )
      );
  const rotatedColorEntries = rotateArray(colorEntries, hueOffset[0]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle>Tailwind Color Palette Generator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6 mb-8">
          {/* Lightness Slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium">Lightness Step</label>
              <span className="text-sm font-medium">{selectedStep}</span>
            </div>
            <Slider
              value={lightnessValue}
              onValueChange={setLightnessValue}
              max={10}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Lighter</span>
              <span>Darker</span>
            </div>
          </div>

          {/* Hue Offset Slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium">Hue Offset</label>
              <span className="text-sm font-medium">
                {rotatedColorEntries[0][0]}
              </span>
            </div>
            <Slider
              value={hueOffset}
              onValueChange={setHueOffset}
              max={colorEntries.length - 1}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Start Color</span>
              <span>End Color</span>
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <Switch
                id="neutral"
                checked={showNeutralColors}
                onCheckedChange={() =>
                  setShowNeutralColors((current) => !current)
                }
              />
              <Label htmlFor="neutral">Show neutral colors</Label>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          {rotatedColorEntries.map(([colorName, colorSteps]) => (
            <div
              key={colorName}
              className="flex items-center p-3 rounded border"
              style={{
                backgroundColor: colorSteps[selectedStep],
                color: parseInt(selectedStep) > 400 ? "white" : "black",
              }}
            >
              <div className="flex-1">
                <span className="font-medium">
                  {colorName}-{selectedStep}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span>{colorSteps[selectedStep]}</span>
                <button
                  onClick={() => copyToClipboard(colorSteps[selectedStep])}
                  className="p-1 hover:bg-black/10 rounded"
                >
                  <Copy size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ColorPaletteGenerator;
