import { CANVAS_SIZE, GRID_SIZE, Path } from "./drawing-canvas";

export function rasterizePath(paths: Path[]): boolean[][] {
    const CELL_SIZE = CANVAS_SIZE / GRID_SIZE;

    const newGrid: boolean[][] = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(false));

    for (const path of paths) {
        for (let i = 0; i < path.length - 1; i++) {
            const startX = path[i].x;
            const startY = path[i].y;
            const endX = path[i + 1].x;
            const endY = path[i + 1].y;

            // Calculate the line's bounding box
            const minX = Math.min(startX, endX);
            const minY = Math.min(startY, endY);
            const maxX = Math.max(startX, endX);
            const maxY = Math.max(startY, endY);

            // Determine which grid cells the line passes through
            const startCellX = Math.floor(minX / CELL_SIZE);
            const endCellX = Math.floor(maxX / CELL_SIZE);
            const startCellY = Math.floor(minY / CELL_SIZE);
            const endCellY = Math.floor(maxY / CELL_SIZE);

            for (let x = startCellX; x <= endCellX; x++) {
                for (let y = startCellY; y <= endCellY; y++) {
                    newGrid[y][x] = lineIntersectsCell(startX, startY, endX, endY, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
                }
            }
        }
    };

    return newGrid;
};

function lineIntersectsCell(x1: number, y1: number, x2: number, y2: number, cellX: number, cellY: number, cellWidth: number, cellHeight: number): boolean {
    // Check if the line intersects the boundaries of the cell
    const intersectsLeft = lineIntersectsLine(x1, y1, x2, y2, cellX, cellY, cellX, cellY + cellHeight);
    const intersectsRight = lineIntersectsLine(x1, y1, x2, y2, cellX + cellWidth, cellY, cellX + cellWidth, cellY + cellHeight);
    const intersectsTop = lineIntersectsLine(x1, y1, x2, y2, cellX, cellY, cellX + cellWidth, cellY);
    const intersectsBottom = lineIntersectsLine(x1, y1, x2, y2, cellX, cellY + cellHeight, cellX + cellWidth, cellY + cellHeight);

    return intersectsLeft || intersectsRight || intersectsTop || intersectsBottom;
};

function lineIntersectsLine(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number): boolean {
    // Use vector cross product to determine if the line segments intersect
    const denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    if (denominator === 0) return false;

    const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denominator;
    const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / denominator;

    return t >= 0 && t <= 1 && u >= 0 && u <= 1;
};
