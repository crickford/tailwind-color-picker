import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { ColorList, STEPS, TAILWIND_COLORS } from "./constants";

const gradientSteps = Object.entries(TAILWIND_COLORS).map(
  (color, step) => `${color}.${step}`
);

import { cn } from "src/lib/utils";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full linear-gradient(
        theme('colors.green.200'),
        theme('colors.green.200')
    ),
    linear-gradient(theme('colors.blue.200'), theme('colors.blue.200'))">
      <SliderPrimitive.Range className="absolute h-full bg-primary" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
