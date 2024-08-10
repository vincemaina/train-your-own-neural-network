import { AnalysedCanvas } from "@/components/drawing/analysed-canvas";
import { Canvas } from "@/components/drawing/canvas";

export default function Page() {
    return (
        <>
            <h1>Drawing</h1>
            <div className="flex gap-2">
                <Canvas/>
                <AnalysedCanvas/>
            </div>
        </>
    )
}