import React, { SyntheticEvent, useRef } from 'react'

export interface AudioPlayerProps {

}

export default function AudioPlayer({ }: AudioPlayerProps) {
    const audioElement = useRef(null);
    const audioSource = useRef(null);

    const handleTimeUpdate = (event: SyntheticEvent) => {
        console.log("Time Update", event);
    }

    const handlePlay = (event: SyntheticEvent) => {
        console.log("handle play", event);
    }

    return (
        <audio ref={audioElement} onPlay={handlePlay} onTimeUpdate={handleTimeUpdate}>
            <source ref={audioSource} />
        </audio>
    )
}
