'use client';

import { useEffect, useState } from "react";
import { NetworkVisualisation } from "./network-visualisation";

interface Props {
    layers: number[]
    activations?: number[][]
}

export function NeuralNetwork(props: Props) {

    const [weights, setWeights] = useState<number[][][]>();
    const [biases, setBiases] = useState<number[][]>();

    useEffect(() => {
        if (props.layers.length < 2) {
            return;
        }

        const w: number[][][] = [];
        const b: number[][] = [];

        for (let i = 0; i < props.layers.length - 1; i++) {
            const layerWeights: number[][] = [];
            const layerBiases: number[] = [];

            for (let j = 0; j < props.layers[i + 1]; j++) {
                const weights: number[] = [];
                for (let k = 0; k < props.layers[i]; k++) {
                    weights.push(Math.random());
                }
                layerWeights.push(weights);
                layerBiases.push(Math.random());
            }

            w.push(layerWeights);
            b.push(layerBiases);
        }

        setWeights(w);
        setBiases(b);
    }, [props.layers]);

    if (!weights || !biases) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex justify-center">
            <NetworkVisualisation
                weights={weights}
                biases={biases}
                activations={props.activations}
            />
        </div>
    )
}