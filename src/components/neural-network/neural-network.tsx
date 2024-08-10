'use client';

import { useEffect, useState } from "react";
import { NetworkVisualisation } from "./network-visualisation";
import { atom } from "nanostores";
import { useStore } from "@nanostores/react";

interface Props {
    layers: number[]
    activations?: number[][]
}

export const $inputLayer = atom<number[] | null>(null);
export const $outputLayer = atom<number[] | null>(null);

export function NeuralNetwork(props: Props) {

    const [weights, setWeights] = useState<number[][][]>();
    const [biases, setBiases] = useState<number[][]>();

    // Initialise weights and biases when the layers change
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
                    weights.push(0.5);
                }
                layerWeights.push(weights);
                layerBiases.push(0);
            }

            w.push(layerWeights);
            b.push(layerBiases);
        }

        setWeights(w);
        setBiases(b);
    }, [props.layers]);

    const inputLayer = useStore($inputLayer);
    const outputLayer = useStore($outputLayer);

    useEffect(() => {
        if (!weights || !biases || !inputLayer) {
            return;
        }

        const activations: number[][] = [];
        activations.push(inputLayer);

        for (let i = 0; i < weights.length; i++) {
            const layerWeights = weights[i];
            const layerBiases = biases[i];
            const prevActivations = activations[activations.length - 1];

            const newActivations = layerWeights.map((weights, j) => {
                const weightedSum = weights.reduce((acc, weight, k) => {
                    return acc + weight * prevActivations[k];
                }, layerBiases[j]);

                return 1 / (1 + Math.exp(-weightedSum));
            });

            activations.push(newActivations);
        }

        $outputLayer.set(activations[activations.length - 1]);
    }, [inputLayer]);

    if (!weights || !biases) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col gap-10 justify-center items-center">
            <pre>{JSON.stringify(outputLayer, undefined, 2)}</pre>

            <NetworkVisualisation
                weights={weights}
                biases={biases}
                activations={props.activations}
            />
        </div>
    )
}
