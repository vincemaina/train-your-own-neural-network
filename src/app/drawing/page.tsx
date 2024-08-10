import { ClearButton } from "@/components/drawing/clear-canvases";
import { DigitiizedPanel } from "@/components/drawing/digitized-panel";
import { DisplayCanvas } from "@/components/drawing/display-canvas";
import { DrawingCanvas } from "@/components/drawing/drawing-canvas";
import { GridCanvas } from "@/components/drawing/grid-canvas";
import { NORMALIZED_CANVAS_ID, RASTERIZED_CANVAS_ID } from "../../components/drawing/helpers";

export default function Page() {
    return (
        <div className="flex flex-col text-white">
            <div className="text-center mb-10">
                <h1>User Input Processing</h1>
                <p>
                    This page demonstrates how the application takes user inputs (i.e. hand-drawn numbers),
                    and processes them into numerical data that we can pass into the input layer of our neural network.
                    <span className="font-semibold text-blue-400"> Start by drawing a number in the first square. </span>
                    The second square normalises the drawing (i.e. scales it to fit the square), and the third square rasterizes the drawing (i.e. converts it to a 28x28 grid of 0s and 1s).
                    The fourth square displays this list of 0s and 1s in a grid format.
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