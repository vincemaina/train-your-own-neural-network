import React, { useState, useRef } from "react";

interface NetworkVisualisationProps {
    weights: number[][][];
    biases: number[][];
    activations?: number[][]; // Optional: Pass activations to visualize them
}

export function NetworkVisualisation({ weights, biases, activations }: NetworkVisualisationProps) {
    const svgWidth = 800;
    const svgHeight = 600;
    const layerGap = 150; // Distance between layers
    const nodeGap = 60;   // Distance between nodes in a layer
    const nodeRadius = 20; // Radius of each node

    const [zoomLevel, setZoomLevel] = useState(1);
    const [offsetX, setOffsetX] = useState(0);
    const [offsetY, setOffsetY] = useState(0);
    const [isPanning, setIsPanning] = useState(false);
    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);

    const svgRef = useRef<SVGSVGElement>(null);

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
        setZoomLevel(prevZoom => Math.min(Math.max(prevZoom * zoomFactor, 0.5), 5)); // Limit zoom between 0.5x and 5x
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
            width={svgWidth}
            height={svgHeight}
            viewBox={`${offsetX} ${offsetY} ${svgWidth / zoomLevel} ${svgHeight / zoomLevel}`}
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp} // Stop panning if mouse leaves the SVG
            style={{ border: "1px solid black", cursor: isPanning ? "grabbing" : "grab" }}
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
                                        stroke={`rgba(0, 0, 255, ${Math.abs(weight)})`}
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
                                <text
                                    x={i * layerGap + nodeRadius}
                                    y={k * nodeGap + prevLayerOffset + nodeRadius / 2}
                                    fontSize="10"
                                    textAnchor="middle"
                                    fill="black"
                                >
                                    {biases[i][k]?.toFixed(2)} {/* Bias value */}
                                </text>
                                <text
                                    x={i * layerGap + nodeRadius}
                                    y={k * nodeGap + prevLayerOffset}
                                    fontSize="10"
                                    textAnchor="middle"
                                    fill="white"
                                >
                                    {`L${i}N${k}`} {/* Layer and Node label */}
                                </text>
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
                                <text
                                    x={(i + 1) * layerGap + nodeRadius}
                                    y={j * nodeGap + currLayerOffset + nodeRadius / 2}
                                    fontSize="10"
                                    textAnchor="middle"
                                    fill="black"
                                >
                                    {bias.toFixed(2)} {/* Bias value */}
                                </text>
                                <text
                                    x={(i + 1) * layerGap + nodeRadius}
                                    y={j * nodeGap + currLayerOffset}
                                    fontSize="10"
                                    textAnchor="middle"
                                    fill="white"
                                >
                                    {`L${i + 1}N${j}`} {/* Layer and Node label */}
                                </text>
                            </g>
                        ))}
                    </g>
                );
            })}
        </svg>
    );
}
