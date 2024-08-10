import { useStore } from "@nanostores/react";
import { $outputLayer } from "./neural-network";

interface Props {
    labels: string[];
}

export function ConfidenceMeterList(props: Props) {
    
    const outputLayer = useStore($outputLayer);
    
    const confidence = outputLayer ? outputLayer.map((value, index) => {
        return value * 100;
    }) : [];
 
    return (
        <div className="flex flex-col gap-5 font-mono">
            {confidence.map((value, index) => (
                <div key={index} className="flex gap-2">
                    <span>{props.labels[index]}</span>

                    <div className="h-100% w-96 relative bg-neutral-100">
                        <div className="absolute inset-0 bg-green-400" style={{ width: `${value}%` }} />
                    </div>

                    <span>{value.toFixed(0)}%</span>
                </div>
            ))}
        </div>
    );
}