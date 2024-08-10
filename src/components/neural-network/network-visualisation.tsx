'use client';

import React, { useState, useRef, useEffect } from "react";

interface NetworkVisualisationProps {
    weights: number[][][];
    biases: number[][];
    activations?: number[][]; // Optional: Pass activations to visualize them
}

export function NetworkVisualisation({ weights, biases, activations }: NetworkVisualisationProps) {
    const svgWidth = 800;
    const svgHeight = 600;
    const layerGap = 600; // Distance between layers
    const nodeGap = 30;   // Distance between nodes in a layer
    const nodeRadius = 5; // Radius of each node

    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {

        const svg = svgRef.current;

        if (!svg) return;

        svg.addEventListener("wheel", (e) => e.preventDefault(), { passive: false });

    }, [weights, biases, activations]);

    const [zoomLevel, setZoomLevel] = useState(1);
    const [offsetX, setOffsetX] = useState(0);
    const [offsetY, setOffsetY] = useState(0);
    const [isPanning, setIsPanning] = useState(false);
    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);

    // Function to map activation values to color
    const getActivationColor = (activation: number) => {
        const r = Math.floor(255 * (1 - activation));
        const g = Math.floor(255 * activation);
        return `rgb(${r}, ${g}, 0)`; // Ranges from red (low) to green (high)
    };

    // Function to calculate the vertical offset to center the nodes in a layer
    const calculateVerticalOffset = (numNodes: number) => {
        const totalNodeHeight = (numNodes - 1) * nodeGap + 2 * nodeRadius;
        return (svgHeight - totalNodeHeight) / 2;
    };

    // Zoom handler
    const handleWheel = (event: React.WheelEvent<SVGSVGElement>) => {
        event.preventDefault();
        const zoomFactor = event.deltaY > 0 ? 0.9 : 1.1;
        setZoomLevel(prevZoom => Math.min(Math.max(prevZoom * zoomFactor, 0.1), 10)); // Limit zoom between 0.1x and 10x
    };

    // Mouse down handler for starting panning
    const handleMouseDown = (event: React.MouseEvent<SVGSVGElement>) => {
        setIsPanning(true);
        setStartX(event.clientX);
        setStartY(event.clientY);
    };

    // Mouse move handler for panning
    const handleMouseMove = (event: React.MouseEvent<SVGSVGElement>) => {
        if (!isPanning) return;
        const dx = (startX - event.clientX) / zoomLevel;
        const dy = (startY - event.clientY) / zoomLevel;
        setOffsetX(prevOffsetX => prevOffsetX + dx);
        setOffsetY(prevOffsetY => prevOffsetY + dy);
        setStartX(event.clientX);
        setStartY(event.clientY);
    };

    // Mouse up handler for ending panning
    const handleMouseUp = () => {
        setIsPanning(false);
    };

    return (
        <svg
            ref={svgRef}
            viewBox={`${offsetX} ${offsetY} ${svgWidth / zoomLevel} ${svgHeight / zoomLevel}`}
            width={svgWidth}
            height={svgHeight}
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp} // Stop panning if mouse leaves the SVG
            style={{ cursor: isPanning ? "grabbing" : "grab" }}
            className="border border-white select-none"
        >
            {weights.map((layer, i) => {
                const prevLayerNodes = layer[0].length;
                const currLayerNodes = layer.length;

                const prevLayerOffset = calculateVerticalOffset(prevLayerNodes);
                const currLayerOffset = calculateVerticalOffset(currLayerNodes);

                return (
                    <g key={i}>
                        {layer.map((neuronWeights, j) => (
                            <g key={j}>
                                {neuronWeights.map((weight, k) => (
                                    <line
                                        key={k}
                                        x1={i * layerGap + nodeRadius}
                                        y1={k * nodeGap + prevLayerOffset + nodeRadius}
                                        x2={(i + 1) * layerGap + nodeRadius}
                                        y2={j * nodeGap + currLayerOffset + nodeRadius}
                                        stroke={`rgba(${255 * (weight**10)}, ${255 * (weight**2)}, ${255 * (weight**1)}, ${Math.abs(weight)})`}
                                        strokeWidth={2}
                                    />
                                ))}
                            </g>
                        ))}
                    </g>
                );
            })}

            {/* Draw nodes, labels, and biases */}
            {weights.map((layer, i) => {
                const prevLayerNodes = layer[0].length;
                const prevLayerOffset = calculateVerticalOffset(prevLayerNodes);

                return (
                    <g key={i}>
                        {layer[0].map((_, k) => (
                            <g key={k}>
                                <circle
                                    cx={i * layerGap + nodeRadius}
                                    cy={k * nodeGap + prevLayerOffset + nodeRadius}
                                    r={nodeRadius}
                                    fill={activations ? getActivationColor(activations[i][k]) : "white"}
                                    stroke="black"
                                />
                            </g>
                        ))}
                    </g>
                );
            })}

            {/* Draw output layer nodes, labels, and biases */}
            {biases.map((layerBiases, i) => {
                const currLayerOffset = calculateVerticalOffset(layerBiases.length);

                return (
                    <g key={i}>
                        {layerBiases.map((bias, j) => (
                            <g key={j}>
                                <circle
                                    cx={(i + 1) * layerGap + nodeRadius}
                                    cy={j * nodeGap + currLayerOffset + nodeRadius}
                                    r={nodeRadius}
                                    fill={activations ? getActivationColor(activations[i + 1][j]) : "white"}
                                    stroke="black"
                                />
                            </g>
                        ))}
                    </g>
                );
            })}
        </svg>
    );
}
