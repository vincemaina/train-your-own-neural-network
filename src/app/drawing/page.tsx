import { AnalysedCanvas } from "@/components/drawing/analysed-canvas";
import { Canvas } from "@/components/drawing/canvas";

export default function Page() {
    return (
        <>
            <div className="text-center mb-5">
                <h1>User Input Processing</h1>
                <p>This page demonstrates how the application takes user inputs (i.e. hand-drawn numbers), and processes them into numerical data that we can pass into the input layer of our neural network.</p>
            </div>
            <div className="grid grid-cols-2 grid-rows-2 gap-5">
                <Canvas/>
                <AnalysedCanvas/>
                <AnalysedCanvas/>
                <AnalysedCanvas/>
            </div>
        </>
    )
}