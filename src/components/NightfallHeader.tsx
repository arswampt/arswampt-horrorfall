import React from 'react';
import { Skull, Swords, Volume2, VolumeX } from 'lucide-react';
import { soundEffects } from '../utils/sound';

interface NightfallHeaderProps {
  title?: string;
  subtitle?: string;
  isCompact?: boolean;
  onMuteToggle?: () => void;
  isMuted?: boolean;
}

export const NightfallHeader: React.FC<NightfallHeaderProps> = ({
  title = 'HORRORFALL',
  subtitle = 'WHICH HORROR ICON ARE YOU?',
  isCompact = false,
  onMuteToggle,
  isMuted = false
}) => {
  return (
    <header className="relative flex flex-col items-center justify-center text-center select-none pt-4 pb-2">
      {/* Top right mute toggle */}
      {onMuteToggle && (
        <button
          onClick={onMuteToggle}
          title={isMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
          aria-label={isMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
          className="absolute right-2 top-2 p-2.5 rounded-full border border-[#2d2a38] bg-[#16141c]/80 text-[#8e8a99] hover:text-[#e5534b] hover:border-[#e5534b]/60 transition-colors"
        >
          {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </button>
      )}

      {/* Row of three muted dark-red icons: skull, crossed swords, skull */}
      <div className="flex items-center justify-center gap-4 text-[#e5534b]/40 mb-2 md:mb-3">
        <Skull className={`${isCompact ? 'h-6 w-6' : 'h-8 w-8 md:h-10 md:w-10'} transition-transform hover:scale-110`} />
        <Swords className={`${isCompact ? 'h-6 w-6' : 'h-8 w-8 md:h-10 md:w-10'} transition-transform hover:scale-110`} />
        <Skull className={`${isCompact ? 'h-6 w-6' : 'h-8 w-8 md:h-10 md:w-10'} transition-transform hover:scale-110`} />
      </div>

      {/* Huge bold title HORRORFALL with letter spacing ~0.3em and soft red text-shadow glow */}
      <h1
        className={`font-black uppercase tracking-[0.24em] sm:tracking-[0.28em] md:tracking-[0.32em] text-[#e5534b] horror-glow-title leading-tight pl-[0.24em] ${
          isCompact ? 'text-2xl sm:text-4xl md:text-5xl' : 'text-3xl sm:text-5xl md:text-6xl lg:text-7xl'
        }`}
      >
        {title}
      </h1>

      {/* Thin fading red gradient divider under the title */}
      <div className="my-3 md:my-4 h-[1px] w-full max-w-[500px] bg-gradient-to-r from-transparent via-[#e5534b]/70 to-transparent" />

      {/* Subtitle in light gray, uppercase, light weight, wide letter-spacing */}
      <h2 className="text-xs sm:text-sm md:text-base font-light tracking-[0.25em] sm:tracking-[0.3em] uppercase text-[#a5a1af] pl-[0.25em]">
        {subtitle}
      </h2>
    </header>
  );
};
