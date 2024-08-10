'use client';

import React, { useRef, useEffect } from 'react';
import { CANVAS_SIZE, GRID_SIZE } from './drawing-canvas';

export const GRID_CANVAS_ID = 'grid-canvas';
export const CELLS_CANVAS_ID = 'cells-canvas';

export function drawFilledCells(filledCells: boolean[][]) {
    const canvas = document.getElementById(CELLS_CANVAS_ID) as HTMLCanvasElement;
    const context = canvas.getContext('2d')!;

    context.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

    const cellSize = CANVAS_SIZE / GRID_SIZE;

    // Fill the cells that have been clicked
    context.fillStyle = 'rgba(0, 0, 255, 0.5)';
    filledCells.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            if (cell) {
                context.fillRect(
                    colIndex * cellSize,
                    rowIndex * cellSize,
                    cellSize,
                    cellSize
                );
            }
        });
    });
}

interface Props {
    filledCells: any[][];
}

export function GridCanvas(props: Props) {

    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current!;
        const context = canvas.getContext('2d')!;

        context.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

        const cellSize = CANVAS_SIZE / GRID_SIZE;

        // Draw the grid
        context.strokeStyle = '#ddd';
        for (let i = 0; i <= GRID_SIZE; i++) {
            context.beginPath();
            context.moveTo(i * cellSize, 0);
            context.lineTo(i * cellSize, CANVAS_SIZE);
            context.stroke();

            context.beginPath();
            context.moveTo(0, i * cellSize);
            context.lineTo(CANVAS_SIZE, i * cellSize);
            context.stroke();
        }     
    }, []);


    return (
        <div className='relative'>
            <canvas
                id={GRID_CANVAS_ID}
                ref={canvasRef}
                width={CANVAS_SIZE}
                height={CANVAS_SIZE}
            />

            <canvas
                id={CELLS_CANVAS_ID}
                width={CANVAS_SIZE}
                height={CANVAS_SIZE}
                className='absolute top-0'
            />
        </div>
    );
}
