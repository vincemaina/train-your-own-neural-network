import { CANVAS_SIZE } from "./canvas";

export const ANALYSED_CANVAS_ID = "analysed-canvas";

export function AnalysedCanvas() {
    return (
        <canvas
            id={ANALYSED_CANVAS_ID}
            height={CANVAS_SIZE}
            width={CANVAS_SIZE}
            className="bg-neutral-400"
        />
    )
}