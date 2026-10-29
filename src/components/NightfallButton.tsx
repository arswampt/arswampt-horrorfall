import React from 'react';
import { soundEffects } from '../utils/sound';

interface NightfallButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'option';
  icon?: React.ReactNode;
  optionLabel?: string;
  badge?: string;
}

export const NightfallButton: React.FC<NightfallButtonProps> = ({
  children,
  variant = 'secondary',
  icon,
  optionLabel,
  badge,
  className = '',
  disabled,
  onClick,
  ...props
}) => {
  const isPrimary = variant === 'primary';
  const isOption = variant === 'option';

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    soundEffects.playClick();
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button
      disabled={disabled}
      onClick={handleClick}
      className={`group relative flex w-full max-w-[770px] min-h-[75px] md:min-h-[85px] items-center justify-between px-6 md:px-8 py-4 rounded-2xl transition-all duration-200 select-none text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e5534b] ${
        disabled
          ? 'cursor-not-allowed border border-[#22202a] bg-[#141318]/60 text-[#545060] opacity-50'
          : isPrimary
          ? 'cursor-pointer border border-[#e5534b]/80 bg-[#1c1b22] text-[#e5534b] shadow-[0_0_22px_rgba(229,83,75,0.25)] hover:border-[#e5534b] hover:shadow-[0_0_30px_rgba(229,83,75,0.4)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99]'
          : isOption
          ? 'cursor-pointer border border-[#2a2736] bg-[#191722] text-[#d6d2de] hover:border-[#e5534b] hover:text-white hover:bg-[#201d2a] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] shadow-sm'
          : 'cursor-pointer border border-[#2d2a38] bg-[#1c1b22] text-[#b0abbb] hover:border-[#e5534b] hover:text-[#ded9e5] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99]'
      } ${className}`}
      {...props}
    >
      <div className="flex items-center gap-4 md:gap-5 w-full">
        {/* Left option badge (A/B/C/D) or icon */}
        {optionLabel ? (
          <span
            className={`flex h-10 w-10 md:h-11 md:w-11 shrink-0 items-center justify-center rounded-xl border text-sm md:text-base font-bold transition-colors ${
              disabled
                ? 'border-[#282632] bg-[#121117] text-[#545060]'
                : isPrimary
                ? 'border-[#e5534b] bg-[#e5534b]/15 text-[#e5534b]'
                : 'border-[#3a3547] bg-[#121017] text-[#a5a0af] group-hover:border-[#e5534b] group-hover:text-[#e5534b] group-hover:bg-[#e5534b]/10'
            }`}
          >
            {optionLabel}
          </span>
        ) : icon ? (
          <span
            className={`shrink-0 transition-colors ${
              disabled
                ? 'text-[#484452]'
                : isPrimary
                ? 'text-[#e5534b]'
                : 'text-[#8b8596] group-hover:text-[#e5534b]'
            }`}
          >
            {icon}
          </span>
        ) : null}

        {/* Content with wide letter-spacing */}
        <span
          className={`font-semibold tracking-[0.16em] md:tracking-[0.22em] uppercase text-xs sm:text-sm md:text-base leading-relaxed ${
            isPrimary
              ? 'text-[#e5534b]'
              : isOption
              ? 'text-[#ded9e5] group-hover:text-white'
              : 'text-[#b5b0bf] group-hover:text-[#eee9f5]'
          }`}
        >
          {children}
        </span>
      </div>

      {badge && (
        <span className="shrink-0 text-[11px] font-medium tracking-wider uppercase text-[#8b8596] group-hover:text-[#e5534b] transition-colors ml-2">
          {badge}
        </span>
      )}
    </button>
  );
};
