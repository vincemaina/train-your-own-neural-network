import { Path } from "./drawing-canvas";

export function drawPaths(canvas: HTMLCanvasElement, paths: Path[]): void {
    console.log('Drawing paths');
    
    // Get the context
    const context = canvas.getContext('2d');
    if (!context) {
        console.log('No context');
        return;
    }
    
    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    // Redraw each path
    context.beginPath();
    context.lineWidth = 20;
    context.lineCap = 'round';
    context.strokeStyle = 'black';
    context.imageSmoothingEnabled = true;
    paths.forEach((path) => {
        path.forEach((point, index) => {
            if (index === 0) {
                context.moveTo(point.x, point.y);
            } else {
                context.lineTo(point.x, point.y);
            }
        });
    });
    context.stroke();
}