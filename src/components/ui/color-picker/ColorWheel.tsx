import type { HSL } from "@/utils/color/colorConversions";
import React, { useCallback, useEffect, useRef, useState } from "react";

interface ColorWheelProps {
  hue: number;
  saturation: number;
  lightness: number;
  onChange: (color: HSL) => void;
}

const ColorWheel: React.FC<ColorWheelProps> = ({
  hue,
  saturation,
  lightness,
  onChange,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [wheelRadius, setWheelRadius] = useState(0);

  // Draw color wheel
  const drawColorWheel = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 5;
    setWheelRadius(radius);

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw hue wheel
    for (let angle = 0; angle < 360; angle++) {
      const startAngle = ((angle - 1) * Math.PI) / 180;
      const endAngle = ((angle + 1) * Math.PI) / 180;

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();

      // Set color based on hue angle and full saturation
      ctx.fillStyle = `hsl(${angle}, 100%, 50%)`;
      ctx.fill();
    }

    // Draw white center circle
    const innerRadius = radius * 0.15;
    ctx.beginPath();
    ctx.arc(centerX, centerY, innerRadius, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();

    // Draw saturation gradient (white to hue color)
    const satGradient = ctx.createRadialGradient(
      centerX,
      centerY,
      innerRadius,
      centerX,
      centerY,
      radius
    );
    satGradient.addColorStop(0, "rgba(255,255,255,1)");
    satGradient.addColorStop(1, `hsla(${hue}, 100%, 50%, 0)`);

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.fillStyle = satGradient;
    ctx.fill();

    // Draw lightness overlay (transparent to black)
    const lightGradient = ctx.createRadialGradient(
      centerX,
      centerY,
      0,
      centerX,
      centerY,
      radius
    );
    lightGradient.addColorStop(0, "rgba(0,0,0,0)");
    lightGradient.addColorStop(0.85, "rgba(0,0,0,0)");
    lightGradient.addColorStop(1, "rgba(0,0,0,0.8)");

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.fillStyle = lightGradient;
    ctx.fill();

    // Draw color indicator
    drawColorIndicator();
  }, [hue]);

  // Draw the indicator for the current color position
  const drawColorIndicator = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 5;

    // Calculate position based on HSL
    const angle = (hue * Math.PI) / 180;
    // Map saturation from 0-100 to inner radius - outer radius
    const innerRadius = radius * 0.15;
    const distance = innerRadius + (saturation / 100) * (radius - innerRadius);

    const x = centerX + Math.cos(angle) * distance;
    const y = centerY - Math.sin(angle) * distance;

    // Draw indicator circle
    ctx.beginPath();
    ctx.arc(x, y, 8, 0, Math.PI * 2);
    ctx.strokeStyle =
      lightness > 50 ? "rgba(0,0,0,0.8)" : "rgba(255,255,255,0.8)";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(x, y, 6, 0, Math.PI * 2);
    ctx.strokeStyle = lightness > 50 ? "white" : "black";
    ctx.lineWidth = 1;
    ctx.stroke();
  }, [hue, saturation, lightness]);

  // Calculate HSL from canvas position
  const getColorFromPosition = useCallback(
    (x: number, y: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return { h: hue, s: saturation, l: lightness };

      const rect = canvas.getBoundingClientRect();
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Adjust coordinates relative to center
      const relX = x - (rect.left + centerX);
      const relY = rect.top + centerY - y; // Y is inverted

      // Calculate angle (hue)
      let angle = (Math.atan2(relY, relX) * 180) / Math.PI;
      if (angle < 0) angle += 360;

      // Calculate distance from center (saturation)
      const distance = Math.sqrt(relX * relX + relY * relY);
      const innerRadius = wheelRadius * 0.15;

      // Map distance to saturation (0-100)
      const maxDistance = wheelRadius;
      let newSaturation = Math.max(
        0,
        Math.min(
          100,
          ((distance - innerRadius) / (maxDistance - innerRadius)) * 100
        )
      );

      // Clamp values if outside the wheel
      if (distance > maxDistance) {
        newSaturation = 100;
      } else if (distance < innerRadius) {
        newSaturation = 0;
      }

      return {
        h: Math.round(angle),
        s: Math.round(newSaturation),
        l: lightness,
      };
    },
    [hue, saturation, lightness, wheelRadius]
  );

  // Handle pointer events for color selection
  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault();
      setIsDragging(true);

      const newColor = getColorFromPosition(e.clientX, e.clientY);
      onChange(newColor);
    },
    [getColorFromPosition, onChange]
  );

  const handlePointerMove = useCallback(
    (e: PointerEvent) => {
      if (!isDragging) return;
      e.preventDefault();

      const newColor = getColorFromPosition(e.clientX, e.clientY);
      onChange(newColor);
    },
    [isDragging, getColorFromPosition, onChange]
  );

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Set up event listeners
  useEffect(() => {
    if (isDragging) {
      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("pointerup", handlePointerUp);
    }

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [isDragging, handlePointerMove, handlePointerUp]);

  // Handle canvas resizing
  useEffect(() => {
    const resizeCanvas = () => {
      if (!canvasRef.current || !containerRef.current) return;

      const container = containerRef.current;
      const size = Math.min(container.clientWidth, 240); // Max size 240px

      const canvas = canvasRef.current;
      canvas.width = size;
      canvas.height = size;

      drawColorWheel();
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [drawColorWheel]);

  // Redraw wheel when color changes
  useEffect(() => {
    drawColorWheel();
  }, [hue, saturation, drawColorWheel]);

  return (
    <div
      className="relative w-full aspect-square max-w-[240px] mx-auto"
      ref={containerRef}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full rounded-full cursor-pointer touch-none"
        onPointerDown={handlePointerDown}
      />
    </div>
  );
};

export default ColorWheel;
