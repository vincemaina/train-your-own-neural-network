import { DisplayCanvas } from "@/components/drawing/analysed-canvas";
import { Canvas } from "@/components/drawing/canvas";

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
                <Canvas/>
                <DisplayCanvas id={NORMALIZED_CANVAS_ID}/>
                <DisplayCanvas id={RASTERIZED_CANVAS_ID}/>
                <DisplayCanvas id={DIGITIZED_CANVAS_ID}/>
            </div>
        </>
    )
}