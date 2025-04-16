import { type ColorSwatch, defaultSwatches } from "@/utils/color/presets";
import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "color-forge-swatches";

/**
 * Hook for managing color swatches, including predefined and custom saved swatches
 */
export const useSwatches = (
  initialSwatches?: ColorSwatch[],
  maxSaved: number = 10,
  enableSaving: boolean = true
): {
  swatches: ColorSwatch[];
  savedSwatches: ColorSwatch[];
  saveSwatch: (color: string) => void;
  removeSwatch: (index: number) => void;
} => {
  // Base swatches (predefined)
  const [swatches, setSwatches] = useState<ColorSwatch[]>(
    initialSwatches || defaultSwatches
  );

  // Custom saved swatches (persisted in localStorage)
  const [savedSwatches, setSavedSwatches] = useState<ColorSwatch[]>([]);

  // Load saved swatches from localStorage on initial mount
  useEffect(() => {
    if (typeof window !== "undefined" && enableSaving) {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          setSavedSwatches(JSON.parse(saved));
        }
      } catch (error) {
        console.error("Failed to load saved swatches:", error);
      }
    }
  }, [enableSaving]);

  // Update localStorage when savedSwatches changes
  useEffect(() => {
    if (typeof window !== "undefined" && enableSaving) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(savedSwatches));
      } catch (error) {
        console.error("Failed to save swatches to localStorage:", error);
      }
    }
  }, [savedSwatches, enableSaving]);

  // Update swatches when initialSwatches prop changes
  useEffect(() => {
    if (initialSwatches) {
      setSwatches(initialSwatches);
    }
  }, [initialSwatches]);

  // Save a new custom swatch
  const saveSwatch = useCallback(
    (color: string) => {
      if (!enableSaving) return;

      setSavedSwatches((prev) => {
        // Check if color already exists
        if (
          prev.some(
            (swatch) => swatch.color.toLowerCase() === color.toLowerCase()
          )
        ) {
          return prev;
        }

        // Create new swatch and limit to maxSaved
        const newSwatches = [{ name: color, color }, ...prev].slice(
          0,
          maxSaved
        );

        return newSwatches;
      });
    },
    [enableSaving, maxSaved]
  );

  const removeSwatch = useCallback(
    (index: number) => {
      if (!enableSaving || index < 0 || index >= savedSwatches.length) return;

      setSavedSwatches((prev) => prev.filter((_, i) => i !== index));
    },
    [enableSaving, savedSwatches.length]
  );

  return {
    swatches,
    savedSwatches,
    saveSwatch,
    removeSwatch,
  };
};
