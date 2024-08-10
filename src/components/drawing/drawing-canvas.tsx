'use client';

import { useEffect, useRef, useState } from "react";
import { normalizeDrawing } from "./normalise-drawing";
import { drawPaths } from "./draw-paths";
import { NORMALIZED_CANVAS_ID, RASTERIZED_CANVAS_ID } from "@/components/drawing/helpers";
import { rasterizePath } from "./rasterize-drawing";
import { drawFilledCells } from "./grid-canvas";
import { $pixelStore } from "./digitized-panel";
import { atom } from "nanostores";
import { useStore } from "@nanostores/react";

export const GRID_SIZE = 28;
export const CANVAS_SIZE = 320;
export const DRAWING_CANVAS_ID = 'drawing-canvas';

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

export const $pathStore = atom<Path[]>([]);
export const $boundingBoxStore = atom<BoundingBox | null>(null);

export function DrawingCanvas() {

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState<boolean>(false);
    const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
    const [currentPath, setCurrentPath] = useState<Path>([]);
    const paths = useStore($pathStore);
    const boundingBox = useStore($boundingBoxStore);

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

            // Prevent default touch behavior (scrolling, zooming) on the canvas
            canvas.addEventListener('touchstart', (e) => e.preventDefault(), { passive: false });
            canvas.addEventListener('touchmove', (e) => e.preventDefault(), { passive: false });
            canvas.addEventListener('touchend', (e) => e.preventDefault(), { passive: false });
        }
    }, [canvasRef]);

    function getTouchPos(touch: any) {
        const rect = canvasRef.current!.getBoundingClientRect();
        return {
            x: touch.clientX - rect.left,
            y: touch.clientY - rect.top,
        };
    }

    function startDrawing(e: any) {
        console.log('Start drawing');

        e.preventDefault();
        
        setIsDrawing(true);
        
        const {x, y} = e.type === 'mousedown' ? {x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY} : getTouchPos(e.touches[0]);
        
        // Initialise the current path with the starting point
        setCurrentPath([{x, y}]);
        
        // Initalise or update the bounding box
        if (!boundingBox) {
            $boundingBoxStore.set({top: y, left: x, bottom: y, right: x});
        } else {
            $boundingBoxStore.set({
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

        e.preventDefault();

        const { x, y } = e.type === 'touchmove' ? getTouchPos(e.touches[0]) : {x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY};

        // Update the current path with the new point
        setCurrentPath((prev) => [...prev, {x, y}]);

        // Update the bounding box
        if (!boundingBox) {
            console.log('No bounding box');
            return;
        }

        $boundingBoxStore.set({
            top: Math.min(boundingBox.top, y),
            left: Math.min(boundingBox.left, x),
            bottom: Math.max(boundingBox.bottom, y),
            right: Math.max(boundingBox.right, x),
        });

        $pathStore.set([...paths.slice(0, -1), [...currentPath, {x, y}]]);

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
        $pathStore.set([...paths, currentPath]);

        // Reset the current path
        setCurrentPath([]);
    };

    useEffect(() => {
        if (paths.length < 1) return;

        // Normalize the drawing    
        const normalizedPaths = normalizeDrawing(boundingBox!, canvasRef.current!, paths);
        
        // Draw the normalized paths on the analysed canvas
        const normalizedCanvas = document.getElementById(NORMALIZED_CANVAS_ID) as HTMLCanvasElement;
        const rasterizedCanvas = document.getElementById(RASTERIZED_CANVAS_ID) as HTMLCanvasElement;
        drawPaths(normalizedCanvas, normalizedPaths);
        // drawPaths(rasterizedCanvas, normalizedPaths);

        // Rasterize the drawing
        const newGrid = rasterizePath(normalizedPaths);
        drawFilledCells(newGrid);

        $pixelStore.set(newGrid);

    }, [paths]);

    return (
        <canvas
            id={DRAWING_CANVAS_ID}
            ref={canvasRef}
            height={CANVAS_SIZE}
            width={CANVAS_SIZE}
            className="bg-white"
            onMouseDown={startDrawing}
            onTouchStart={startDrawing}
            onMouseMove={draw}
            onTouchMove={draw}
            onMouseUp={stopDrawing}
            onTouchEnd={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchCancel={stopDrawing}
        />
    );
}