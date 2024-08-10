import { BoundingBox, Path } from "./canvas";

export function normalizeDrawing(boundingBox: BoundingBox, canvas: HTMLCanvasElement, paths: Path[]) {
    console.log('Normalizing drawing');

    // Calculate the width and height of the drawing
    const { left, bottom, right, top } = boundingBox;
    const drawingWidth = right - left;
    const drawingHeight = bottom - top;

    console.log('Drawing width:', drawingWidth);
    console.log('Drawing height:', drawingHeight);

    // Calculate scaling factors
    const scaleX = canvas.width / drawingWidth;
    const scaleY = canvas.height / drawingHeight;
    const scale = Math.min(scaleX, scaleY);

    const offsetX = (canvas.width - drawingWidth * scale) / 2 - left * scale;
    const offsetY = (canvas.height - drawingHeight * scale) / 2 - top * scale;

    // Get the context
    const context = canvas.getContext('2d');
    if (!context) {
        console.log('No context');
        return;
    }

    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Redraw each path scaled and translated
    context.beginPath();
    context.lineWidth = 20;
    context.lineCap = 'round';
    context.strokeStyle = 'black';
    paths.forEach((path) => {
        path.forEach((point, index) => {
            const scaledX = point.x * scale + offsetX;
            const scaledY = point.y * scale + offsetY;
            if (index === 0) {
                context.moveTo(scaledX, scaledY);
            } else {
                context.lineTo(scaledX, scaledY);
            }
        });
    });
    context.stroke();
};
