import React, { useState } from 'react';
import { Skull, Sparkles, Film } from 'lucide-react';
import { HorrorCharacter } from '../data';

interface CharacterImageProps {
  character: HorrorCharacter;
  size?: 'large' | 'small' | 'medium';
  className?: string;
}

export const CharacterImage: React.FC<CharacterImageProps> = ({
  character,
  size = 'large',
  className = ''
}) => {
  const [imgSrc, setImgSrc] = useState(character.image);
  const [hasError, setHasError] = useState(false);
  const [triedAlt, setTriedAlt] = useState(false);

  const isSmall = size === 'small';
  const isMedium = size === 'medium';

  const handleError = () => {
    if (!triedAlt) {
      setTriedAlt(true);
      // Try alternate extension (.jpg <-> .jpeg)
      if (imgSrc.endsWith('.jpeg')) {
        setImgSrc(imgSrc.replace('.jpeg', '.jpg'));
        return;
      } else if (imgSrc.endsWith('.jpg')) {
        setImgSrc(imgSrc.replace('.jpg', '.jpeg'));
        return;
      }
    }
    setHasError(true);
  };

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border transition-all duration-300 ${
        isSmall
          ? 'h-24 w-24 border-[#e5534b]/40 bg-[#16141c]'
          : isMedium
          ? 'h-48 w-full border-[#e5534b]/50 bg-[#16141c]'
          : 'h-72 sm:h-84 md:h-96 w-full border-[#e5534b] horror-glow-card-strong bg-[#16141c]'
      } ${className}`}
    >
      {!hasError ? (
        <img
          src={imgSrc}
          alt={character.name}
          onError={handleError}
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover object-top transition-transform duration-700 hover:scale-105"
        />
      ) : (
        /* Styled fallback placeholder matching NIGHTFALL aesthetic */
        <div className="relative flex h-full w-full flex-col items-center justify-center p-4 text-center select-none bg-gradient-to-b from-[#201c29] via-[#15121c] to-[#0e0c13]">
          {/* Subtle grid and radial glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(229,83,75,0.22)_0%,transparent_75%)] pointer-events-none" />

          {/* Glowing skull emblem */}
          <div className="relative mb-2 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-[#e5534b]/20 blur-md" />
            <div className={`relative flex items-center justify-center rounded-full border border-[#e5534b]/50 bg-[#191522] ${
              isSmall ? 'p-2' : 'p-3 md:p-4'
            }`}>
              <Skull className={`text-[#e5534b] ${isSmall ? 'h-6 w-6' : 'h-10 w-10 md:h-12 md:w-12'}`} />
            </div>
          </div>

          {/* Character Identity */}
          <div className="relative z-10 space-y-1">
            <h4 className={`font-extrabold uppercase tracking-[0.2em] text-[#e5534b] ${
              isSmall ? 'text-xs truncate max-w-[80px]' : 'text-base md:text-xl'
            }`}>
              {character.name}
            </h4>

            {!isSmall && (
              <>
                <p className="flex items-center justify-center gap-1.5 text-xs text-[#a39fae] tracking-[0.15em] uppercase">
                  <Film className="h-3 w-3 text-[#e5534b]" />
                  <span>{character.movie} ({character.year})</span>
                </p>
                <div className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-[#3b3447] bg-[#121017]/80 px-3 py-1 text-[11px] text-[#c7c2d1] tracking-wider uppercase">
                  <Sparkles className="h-3 w-3 text-[#e5534b]" />
                  <span>{character.archetype}</span>
                </div>
              </>
            )}
          </div>

          {/* Corner accent rivets */}
          <div className="absolute top-2 left-2 h-1.5 w-1.5 rounded-full bg-[#e5534b]/40" />
          <div className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-[#e5534b]/40" />
          <div className="absolute bottom-2 left-2 h-1.5 w-1.5 rounded-full bg-[#e5534b]/40" />
          <div className="absolute bottom-2 right-2 h-1.5 w-1.5 rounded-full bg-[#e5534b]/40" />
        </div>
      )}

      {/* Atmospheric vignette layer */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0d0b10] via-transparent to-transparent opacity-60" />
    </div>
  );
};
