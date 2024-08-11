'use client';

import Image from "next/image"
import { useEffect, useState } from "react";

const states = {
    still: "/pixel-robot/robot-preview.png",
    idle: "/pixel-robot/robot-idle.gif",
    thinking: "/pixel-robot/robot-run.gif",
}

export function Avatar() {

    const [src, setSrc] = useState(states.idle);

    return (
        <div>
            <Image
                src={src}
                alt="Avatar"
                width={200}
                height={200}
                className="rounded-full"
            />
        </div>
    )
}