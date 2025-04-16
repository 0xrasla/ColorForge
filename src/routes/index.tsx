import ColorPickerExample from "@/examples/ColorPickerExample";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div className="container mx-auto">
      <ColorPickerExample />
    </div>
  );
}
