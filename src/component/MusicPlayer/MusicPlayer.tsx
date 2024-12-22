import React, { useState, useRef, useEffect } from "react";
import "./musik.mp3";

const MusicPlayer: React.FC = () => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const [volume, setVolume] = useState(1);

    const togglePlayPause = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
            audioRef.current.play();
        }
    }, [volume]);

    return (
        <div>
            <audio ref={audioRef} src={require("./musik.mp3")} loop />

            <img
                onClick={togglePlayPause}
                className="noselect music-player"
                src={require(isPlaying ? "../Game/image/voise.png" : "../Game/image/mute.png")}
            ></img>
        </div>
    );
};

export default MusicPlayer;
