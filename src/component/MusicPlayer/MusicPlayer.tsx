import React, { useState, useRef, useEffect } from "react";
import "./ChipiChipi.mp3";

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
            //audioRef.current.play();
        }
    }, [volume]);

    return (
        <div>
            <audio ref={audioRef} src={require("./ChipiChipi.mp3")} loop />

            <button
                onClick={togglePlayPause}
                className="noselect"
                style={{
                    backgroundColor: isPlaying ? "red" : "green",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    zIndex: 9999,
                    position: "absolute",
                    right: "6vw",
                    top: "15vh",
                    fontSize: `min(3vh,3vw)`,
                }}
            >
                {"Music "}
                {isPlaying ? "Pause" : "Play"}
            </button>
        </div>
    );
};

export default MusicPlayer;
