import { useState } from "react";
import { useSharedPixelGrid } from "@baditaflorin/mesh-common";
import type { MeshConfig, YRoom } from "@baditaflorin/mesh-common";

type Props = { room: YRoom | null; config: MeshConfig };
const SIZE = 8;

export function Feature({ room, config }: Props) {
  const grid = useSharedPixelGrid(room, "pixel-party", { width: SIZE, height: SIZE });
  const [color, setColor] = useState("#f97316");
  return (
    <main className="creative-app pixel-app">
      <p className="eyebrow">Tiny shared canvas</p>
      <h1>Pixel Party</h1>
      <p className="lede">Pick a colour and tap cells together. Small grid, instant mosaic.</p>
      <div className="toolbar">
        <label>
          Colour{" "}
          <input
            aria-label="Pixel colour"
            type="color"
            value={color}
            onChange={(event) => setColor(event.target.value)}
          />
        </label>
        <button disabled={!grid.pixels.length} type="button" onClick={grid.clear}>
          Clear canvas
        </button>
      </div>
      <section
        aria-label="Shared 8 by 8 pixel canvas"
        className="pixel-grid"
        style={{ gridTemplateColumns: `repeat(${SIZE}, 1fr)` }}
      >
        {Array.from({ length: SIZE * SIZE }, (_, index) => {
          const x = index % SIZE;
          const y = Math.floor(index / SIZE);
          const pixel = grid.get(x, y);
          return (
            <button
              aria-label={`Cell ${x + 1}, ${y + 1}${pixel ? `, ${pixel.color}` : ""}`}
              className="pixel"
              key={`${x}-${y}`}
              style={{ background: pixel?.color ?? "#1f2937" }}
              type="button"
              onClick={() => grid.set(x, y, color)}
              onContextMenu={(event) => {
                event.preventDefault();
                grid.erase(x, y);
              }}
            />
          );
        })}
      </section>
      <p className="hint">Tip: right-click or long-press a cell to erase it.</p>
      <p aria-live="polite" className="status">
        {room
          ? `${grid.pixels.length} coloured cell${grid.pixels.length === 1 ? "" : "s"}`
          : config.description}
      </p>
    </main>
  );
}
