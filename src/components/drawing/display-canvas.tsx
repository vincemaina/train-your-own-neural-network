import { CANVAS_SIZE } from "./drawing-canvas";

interface Props {
    id: string;
}

export function DisplayCanvas(props: Props) {
    return (
        <canvas
            id={props.id}
            height={CANVAS_SIZE}
            width={CANVAS_SIZE}
            className="bg-neutral-400"
        />
    )
}