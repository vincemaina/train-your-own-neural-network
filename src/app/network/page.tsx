import { NeuralNetwork } from "@/components/neural-network/neural-network";

export default function Page() {

    const activations = [
        [0.1, 0.2, 0.3, 0.9, 0.5],
        [0.6, 0.7, 0.8, 0.9, 1.0],
        [0.1, 0.2, 0.3, 0.4, 0.5],
        [0.6, 0.7, 0.8, 0.9, 1.0],
        [0.1, 0.2, 0.3, 0.4, 0.5],
    ]

    return (
        <div>
            <h1>Network</h1>

            <NeuralNetwork
                layers={[36, 12, 2]}
                // activations={activations}
            />
        </div>
    )
}