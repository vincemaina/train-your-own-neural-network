import React from "react";

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

    return (
        <svg width={svgWidth} height={svgHeight}>
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
                                        stroke={`rgba(200, 200, 255, ${Math.abs(weight)})`}
                                        strokeWidth={1}
                                    />
                                ))}
                            </g>
                        ))}
                    </g>
                );
            })}

            {/* Draw nodes and labels */}
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
                                    r={nodeRadius / 1.5}
                                    fill={activations ? getActivationColor(activations[i][k]) : "rgba(200, 200, 255, 1)"}
                                    stroke="blue"
                                    strokeWidth={2}
                                />
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

            {/* Draw output layer nodes and labels */}
            {biases.map((layerBiases, i) => {
                const currLayerOffset = calculateVerticalOffset(layerBiases.length);

                return (
                    <g key={i}>
                        {layerBiases.map((_, j) => (
                            <g key={j}>
                                <circle
                                    cx={(i + 1) * layerGap + nodeRadius}
                                    cy={j * nodeGap + currLayerOffset + nodeRadius}
                                    r={nodeRadius / 1.5}
                                    fill={activations ? getActivationColor(activations[i + 1][j]) : "rgba(200, 200, 255, 1)"}
                                    stroke="blue"
                                    strokeWidth={2}
                                />
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
