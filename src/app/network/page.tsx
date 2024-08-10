import { NeuralNetwork } from "@/components/neural-network/neural-network";

export default function Page() {
    return (
        <div>
            <h1>Network</h1>
            <p>Network content</p>

            <NeuralNetwork
                layers={[8, 4, 2, 1]}
            />
        </div>
    )
}