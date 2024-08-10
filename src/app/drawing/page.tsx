import { DisplayCanvas } from "@/components/drawing/display-canvas";
import { DrawingCanvas } from "@/components/drawing/drawing-canvas";
import { GridCanvas } from "@/components/drawing/grid-canvas";

export const NORMALIZED_CANVAS_ID = "normalized-canvas";
export const RASTERIZED_CANVAS_ID = "rasterized-canvas";
export const DIGITIZED_CANVAS_ID = "digitized-canvas";

export default function Page() {
    return (
        <>
            <div className="text-center mb-5">
                <h1>User Input Processing</h1>
                <p>This page demonstrates how the application takes user inputs (i.e. hand-drawn numbers), and processes them into numerical data that we can pass into the input layer of our neural network.</p>
            </div>
            <div className="grid grid-cols-2 gap-5 max-w-[1020px] mx-auto">
                <DrawingCanvas/>
                <DisplayCanvas id={NORMALIZED_CANVAS_ID}/>

                <div className="relative">
                    <DisplayCanvas id={RASTERIZED_CANVAS_ID}/>
                    <div className="absolute top-0">
                        <GridCanvas
                            filledCells={Array(28).fill(null).map(() => Array(28).fill(0))}
                        />
                    </div>
                </div>

                <DisplayCanvas id={DIGITIZED_CANVAS_ID}/>
            </div>
        </>
    )
}