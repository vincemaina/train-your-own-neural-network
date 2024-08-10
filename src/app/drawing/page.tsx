import { ClearButton } from "@/components/drawing/clear-canvases";
import { DigitiizedPanel } from "@/components/drawing/digitized-panel";
import { DisplayCanvas } from "@/components/drawing/display-canvas";
import { DrawingCanvas } from "@/components/drawing/drawing-canvas";
import { GridCanvas } from "@/components/drawing/grid-canvas";
import { NORMALIZED_CANVAS_ID, RASTERIZED_CANVAS_ID } from "../../components/drawing/helpers";

export default function Page() {
    return (
        <div className="flex flex-col text-white">
            <div className="text-center mb-10 container mx-auto">
                <h1>User Input Processing</h1>
                <p>
                    This page demonstrates how the application takes user inputs (i.e. hand-drawn numbers),
                    and processes them into numerical data that we can pass into the input layer of our neural network.
                    <span className="font-semibold text-blue-400"> Start by drawing a number in the first square. </span>
                    The second square normalises your drawing (i.e. scales it to fit the square), and the third square rasterizes the drawing (i.e. converts it to a 28x28 grid of binary pixels).
                    The fourth square displays these binary pixels as a flattened array of 0s and 1s i.e. the input data for our neural network.
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
        </div>
    )
}