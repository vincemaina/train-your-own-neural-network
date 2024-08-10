'use client';

import { CANVAS_SIZE, GRID_SIZE } from "./drawing-canvas";
import { atom } from "nanostores";
import { useStore } from "@nanostores/react";
import { useEffect } from "react";

export const $pixelStore = atom<boolean[][]>([]);

export function clearPixels() {

    const newGrid = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(false));
    $pixelStore.set(newGrid);
    return newGrid;
}

export function DigitiizedPanel() {

    const pixels = useStore($pixelStore)

    useEffect(() => {
        clearPixels();
    }, [])

    return (
        <div className="bg-neutral-700 font-mono p-5 text-wrap break-words text-xs leading-none" style={{height: CANVAS_SIZE, width: CANVAS_SIZE}}>
            {pixels.map((row) => (
                row.map((cell) => (
                    <span className={cell ? "font-bold" : "opacity-30"}>{cell ? 1: 0}</span>
                ))
            ))}
        </div>
    )
}