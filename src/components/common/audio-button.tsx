"use client";
import { useRef } from "react";

const AudioButton = () => {
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleClick = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  return (
    <div>
      <button onClick={handleClick}>Play Sound</button>
      <audio ref={audioRef} src="/audio/menu_click.m4a" />
    </div>
  );
};

export default AudioButton;
