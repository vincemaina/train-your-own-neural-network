import { NeuralNetwork } from "@/components/neural-network/neural-network";

export default function Page() {
    return (
        <div>
            <h1>Network</h1>
            <p>Network content</p>

            <NeuralNetwork
                layers={[2, 3, 1]}
            />
        </div>
    )
}