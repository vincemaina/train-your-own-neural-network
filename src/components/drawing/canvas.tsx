'use client';

import { useEffect, useRef, useState } from "react";
import { normalizeDrawing } from "./normalise-drawing";
import { drawPaths } from "./draw-paths";
import { NORMALIZED_CANVAS_ID } from "@/app/drawing/page";

export const GRID_SIZE = 28;
export const CANVAS_SIZE = 500;

/**
 * A path is an array of points that represent a line drawn on the canvas.
 */
export type Path = {x: number, y: number}[];

/**
 * A bounding box is a rectangle that encloses a drawing.
 */
export type BoundingBox = {
    top: number,
    left: number,
    bottom: number,
    right: number,
};

export function Canvas() {

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState<boolean>(false);
    const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
    const [currentPath, setCurrentPath] = useState<Path>([]);
    const [paths, setPaths] = useState<Path[]>([]);  // Stores the paths
    const [boundingBox, setBoundingBox] = useState<BoundingBox>();
    const [pixelGrid, setPixelGrid] = useState<number[][]>(
        Array.from({ length: GRID_SIZE }, () => Array.from({ length: GRID_SIZE }, () => 0))
    );

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx === null) {
                console.log('Failed to get 2d context');                
                return;
            }
            ctx.lineWidth = 10;
            ctx.lineCap = 'round';
            ctx.strokeStyle = 'black';
            setContext(ctx);
        }
    }, [canvasRef]);

    function startDrawing(e: any) {
        console.log('Start drawing');
        
        setIsDrawing(true);
        
        // Initialise the current path with the starting point
        const x = e.nativeEvent.offsetX;
        const y = e.nativeEvent.offsetY;
        setCurrentPath([{x, y}]);
        
        // Initalise or update the bounding box
        if (!boundingBox) {
            setBoundingBox({top: y, left: x, bottom: y, right: x});
        } else {
            setBoundingBox({
                top: Math.min(boundingBox.top, y),
                left: Math.min(boundingBox.left, x),
                bottom: Math.max(boundingBox.bottom, y),
                right: Math.max(boundingBox.right, x),
            });
        }
        
        // Begin new path (separate from any previous paths)
        if (!context) {
            console.log('No context');
            return;
        }
        context.beginPath();
    };

    function draw(e: any) {
        if (!isDrawing) return;

        console.log('Drawing...');
    
        const x = e.nativeEvent.offsetX;
        const y = e.nativeEvent.offsetY;

        // Update the current path with the new point
        setCurrentPath((prev) => [...prev, {x, y}]);

        // Update the bounding box
        if (!boundingBox) {
            console.log('No bounding box');
            return;
        }

        setBoundingBox({
            top: Math.min(boundingBox.top, y),
            left: Math.min(boundingBox.left, x),
            bottom: Math.max(boundingBox.bottom, y),
            right: Math.max(boundingBox.right, x),
        });

        // Draw the line segment on the canvas
        if (!context) {
            console.log('No context');
            return;
        }
        context.lineTo(x, y);
        context.lineWidth = 10;
        context.stroke();
    };

    function stopDrawing() {
        if (!isDrawing) return;

        console.log('Path completed');

        setIsDrawing(false);

        // Save the completed path
        setPaths((prev) => [...prev, currentPath]);

        // Normalize the drawing    
        const normalizedPaths = normalizeDrawing(boundingBox!, canvasRef.current!, [...paths, currentPath]);
        
        // Draw the normalized paths on the analysed canvas
        const canvas = document.getElementById(NORMALIZED_CANVAS_ID) as HTMLCanvasElement;
        drawPaths(canvas, normalizedPaths);

        // Rasterize the drawing



        // Reset the current path
        setCurrentPath([]);
    }

    return (
        <canvas
            id="canvas"
            ref={canvasRef}
            height={CANVAS_SIZE}
            width={CANVAS_SIZE}
            className="bg-white"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
        />
    );
}