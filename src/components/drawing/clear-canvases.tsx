'use client';

import { NORMALIZED_CANVAS_ID, RASTERIZED_CANVAS_ID } from "@/components/drawing/helpers";
import { CELLS_CANVAS_ID } from "./grid-canvas";
import { $boundingBoxStore, $pathStore, DRAWING_CANVAS_ID } from "./drawing-canvas";
import { clearPixels } from "./digitized-panel";

export function clearCanvases() {
    const canvases = [
        document.getElementById(DRAWING_CANVAS_ID) as HTMLCanvasElement,
        document.getElementById(NORMALIZED_CANVAS_ID) as HTMLCanvasElement,
        document.getElementById(RASTERIZED_CANVAS_ID) as HTMLCanvasElement,
        document.getElementById(CELLS_CANVAS_ID) as HTMLCanvasElement
    ]
    canvases.forEach(canvas => {
        const context = canvas.getContext('2d');
        if (context) {
            context.clearRect(0, 0, canvas.width, canvas.height);
        }
    });

    clearPixels();

    $boundingBoxStore.set(null);
    $pathStore.set([]);
}

export function ClearButton() {
    return (
        <button className="bg-neutral-500 p-3 py-1 m-3 text-sm rounded absolute bottom-0 right-0" onClick={clearCanvases}>
            Clear
        </button>
    )
}