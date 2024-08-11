import { ClearButton } from "@/components/drawing/clear-canvases";
import { DigitiizedPanel } from "@/components/drawing/digitized-panel";
import { DisplayCanvas } from "@/components/drawing/display-canvas";
import { DrawingCanvas } from "@/components/drawing/drawing-canvas";
import { GridCanvas } from "@/components/drawing/grid-canvas";
import { NORMALIZED_CANVAS_ID, RASTERIZED_CANVAS_ID } from "../components/drawing/helpers";
import { NeuralNetwork } from "@/components/neural-network/neural-network";

export default function Page() {
    return (
        <div className="flex flex-col text-white">
            <div className="text-center mb-10 container mx-auto">
                <h1>Train Your Own Neural Network</h1>
                <p>
                    This tools allows you to train a simple neural network from scratch to recognize handwritten characters.
                    <span className="font-semibold text-blue-400"> Start by drawing a character in the first square. </span>
                </p>
            </div>

            <div className="flex flex-wrap flex-col md:flex-row justify-center gap-5 mx-auto">
                <div className="relative">
                    <DrawingCanvas/>
                    <ClearButton/>
                </div>
                <DisplayCanvas id={NORMALIZED_CANVAS_ID}/>

                <div className="relative">
                    <DisplayCanvas id={RASTERIZED_CANVAS_ID}/>
                    <div className="absolute top-0">
                        <GridCanvas
                            filledCells={Array(28).fill(null).map(() => Array(28).fill(0))}
                        />
                    </div>
                </div>

                <DigitiizedPanel/>
            </div>

            <div className="mt-10">
                <NeuralNetwork
                    layers={[36, 12, 2]}
                />
            </div>
        </div>
    )
}