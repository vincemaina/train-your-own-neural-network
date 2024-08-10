interface Props {
    weights: number[][][];
    biases: number[][];
}

export function NetworkVisualisation(props: Props) {

    const layerGap = 150; // Distance between layers
    const nodeGap = 60;   // Distance between nodes in a layer
    const nodeRadius = 20; // Radius of each node

    const { weights, biases } = props;

    return (
        <div className="flex justify-center w-full mt-10">
            <svg width="800" height="600">
                {weights.map((layer, i) => (
                    <g key={i}>
                        {layer.map((neuronWeights, j) => (
                            <g key={j}>
                                {neuronWeights.map((weight, k) => (
                                    <line
                                        key={k}
                                        x1={i * layerGap + nodeRadius}
                                        y1={k * nodeGap + nodeRadius}
                                        x2={(i + 1) * layerGap + nodeRadius}
                                        y2={j * nodeGap + nodeRadius}
                                        stroke={`rgba(0, 0, 255, ${Math.abs(weight)})`}
                                        strokeWidth={2}
                                    />
                                ))}
                            </g>
                        ))}
                    </g>
                ))}

                {weights.map((layer, i) => (
                    <g key={i}>
                        {layer[0].map((_, k) => (
                            <circle
                                key={k}
                                cx={i * layerGap + nodeRadius}
                                cy={k * nodeGap + nodeRadius}
                                r={nodeRadius}
                                fill="white"
                                stroke="black"
                            />
                        ))}
                    </g>
                ))}

                {biases.map((layerBiases, i) => (
                    <g key={i}>
                        {layerBiases.map((_, j) => (
                            <circle
                                key={j}
                                cx={(i + 1) * layerGap + nodeRadius}
                                cy={j * nodeGap + nodeRadius}
                                r={nodeRadius}
                                fill="white"
                                stroke="black"
                            />
                        ))}
                    </g>
                ))}
            </svg>
        </div>
    )
}