"use client";
import React, { createContext, useContext, useRef, ReactNode } from "react";

interface SoundsContextType {
  menuAudio: React.RefObject<HTMLAudioElement>;
  backAudio: React.RefObject<HTMLAudioElement>;
  unlockPowerAudio: React.RefObject<HTMLAudioElement>;
  playMenuAudio: () => void;
  playBackAudio: () => void;
  playUnlockPowerAudio: () => void;
}

const SoundsContext = createContext<SoundsContextType | undefined>(undefined);

// Провайдер контекста
export const SoundsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const menuAudio = useRef<HTMLAudioElement>(null);
  const backAudio = useRef<HTMLAudioElement>(null);
  const unlockPowerAudio = useRef<HTMLAudioElement>(null);

  const playMenuAudio = () => {
    if (menuAudio.current) {
      menuAudio.current.play();
    }
  };

  const playBackAudio = () => {
    if (backAudio.current) {
      backAudio.current.play();
    }
  };

  const playUnlockPowerAudio = () => {
    if (unlockPowerAudio.current) {
      unlockPowerAudio.current.play();
    }
  };

  return (
    <SoundsContext.Provider
      value={{
        menuAudio,
        backAudio,
        unlockPowerAudio,
        playMenuAudio,
        playBackAudio,
        playUnlockPowerAudio,
      }}
    >
      <>
        <audio ref={menuAudio} src="/audio/menu_click.m4a" />
        <audio ref={backAudio} src="/audio/menu_go_back.m4a" />
        <audio ref={unlockPowerAudio} src="/audio/unlock_new_power.m4a" />
        {children}
      </>
    </SoundsContext.Provider>
  );
};

export const useSounds = () => {
  const context = useContext(SoundsContext);
  if (context === undefined) {
    throw new Error("useSounds must be used within a SoundsProvider");
  }
  return context;
};
