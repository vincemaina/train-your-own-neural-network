import { BoundingBox, Path } from "./drawing-canvas";

/**
 * Normalize the drawing to fit within the canvas
 * 
 * @param boundingBox The bounding box of the drawing
 * @param canvas The canvas element
 * @param paths The paths of the drawing
 * @returns The normalized paths
*/
export function normalizeDrawing(boundingBox: BoundingBox, canvas: HTMLCanvasElement, paths: Path[]): Path[] {
    // Calculate the width and height of the drawing
    const { left, bottom, right, top } = boundingBox;
    const drawingWidth = right - left;
    const drawingHeight = bottom - top;

    // Calculate scaling factors
    const scaleX = canvas.width / drawingWidth;
    const scaleY = canvas.height / drawingHeight;
    const scale = Math.min(scaleX, scaleY) * 0.9;

    const offsetX = (canvas.width - drawingWidth * scale) / 2 - left * scale;
    const offsetY = (canvas.height - drawingHeight * scale) / 2 - top * scale;

    // Normalize the path points
    const normalizedPaths = paths.map((path) =>
        path.map((point) => ({
        x: point.x * scale + offsetX,
        y: point.y * scale + offsetY,
        }))
    );

    return normalizedPaths;
};
