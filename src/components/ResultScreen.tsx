import React, { useState } from 'react';
import {
  RotateCcw,
  Copy,
  Check,
  Home,
  ShieldAlert,
  Flame,
  ChevronDown,
  ChevronUp,
  Skull,
  Crosshair,
  Award,
  Zap,
  Activity
} from 'lucide-react';
import { HorrorCharacter, CHARACTERS } from '../data';
import { CharacterImage } from './CharacterImage';
import { NightfallButton } from './NightfallButton';
import { soundEffects } from '../utils/sound';

interface ResultScreenProps {
  winner: HorrorCharacter;
  matchPercentage: number;
  runnerUp: HorrorCharacter;
  runnerUpPercentage: number;
  scores: Record<string, number>;
  onRetake: () => void;
  onExitToMenu: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  winner,
  matchPercentage,
  runnerUp,
  runnerUpPercentage,
  scores,
  onRetake,
  onExitToMenu
}) => {
  const [copied, setCopied] = useState(false);
  const [showAllScores, setShowAllScores] = useState(false);

  const handleCopy = async () => {
    soundEffects.playClick();
    const shareText = `🔪 HORRORFALL: WHICH HORROR ICON ARE YOU?
━━━━━━━━━━━━━━━━━━━━
🩸 MY RESULT: ${winner.name.toUpperCase()} (${matchPercentage}% Match)
🎬 Franchise: ${winner.movie}
💀 Archetype: ${winner.archetype}
⚔️ Weapon: ${winner.weapon}
🛡️ Survival Odds: ${winner.survivalOdds}/10
"${winner.survivalQuote}"

🥈 Runner-Up: ${runnerUp.name} (${runnerUpPercentage}%)

Take the 20-question psychological horror quiz to discover your icon!`;

    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
      const textArea = document.createElement('textarea');
      textArea.value = shareText;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // Sort all scores descending for detailed matrix
  const sortedScores = Object.entries(scores)
    .map(([id, score]) => ({
      character: CHARACTERS[id],
      score
    }))
    .filter((item) => item.character)
    .sort((a, b) => b.score - a.score);

  const topScore = sortedScores[0]?.score || 1;

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-start px-4 py-8 md:py-12 z-10">
      {/* Toast Notification */}
      {copied && (
        <div className="fixed top-6 z-50 flex items-center gap-2.5 rounded-full border border-[#e5534b] bg-[#1c1216] px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-[#e5534b] shadow-[0_0_25px_rgba(229,83,75,0.6)] animate-fadeIn">
          <Check className="h-4 w-4 text-[#e5534b]" />
          <span>DOSSIER COPIED TO CLIPBOARD!</span>
        </div>
      )}

      {/* Top Header / Result Banner */}
      <div className="w-full max-w-[770px] text-center mb-6">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-[#e5534b]/40 bg-[#16121b] text-xs font-bold tracking-[0.25em] text-[#e5534b] uppercase mb-2">
          <Flame className="h-3.5 w-3.5" />
          <span>PSYCHOMETRIC MATCH IDENTIFIED</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-[0.2em] text-white pl-[0.2em]">
          {winner.name}
        </h1>
        <p className="text-xs sm:text-sm font-light tracking-[0.25em] uppercase text-[#a5a0af] mt-1 pl-[0.25em]">
          {winner.movie} ({winner.year})
        </p>
      </div>

      {/* Main Result Card Container */}
      <div className="w-full max-w-[770px] space-y-6">
        {/* Winner Hero Card */}
        <div className="rounded-2xl border border-[#e5534b] bg-[#16141c]/95 p-6 md:p-8 shadow-[0_0_40px_rgba(229,83,75,0.25)] relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#e5534b] to-transparent" />

          {/* Grid Layout: Image + Core Attributes */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Image Column */}
            <div className="md:col-span-5 flex flex-col items-center">
              <CharacterImage character={winner} size="large" />
            </div>

            {/* Information Column */}
            <div className="md:col-span-7 space-y-4">
              {/* Synchronization percentage */}
              <div className="flex items-baseline justify-between border-b border-[#2d2838] pb-3">
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#8e8999]">
                  SYNCHRONIZATION
                </span>
                <span className="text-3xl font-black tracking-tight text-[#e5534b] horror-glow-title">
                  {matchPercentage}%
                </span>
              </div>

              {/* Dramatic one-line intro */}
              <blockquote className="italic text-sm sm:text-base text-[#e8e4f0] border-l-2 border-[#e5534b] pl-3 py-1 font-normal leading-relaxed">
                "{winner.dramaticIntro}"
              </blockquote>

              {/* Archetype & Weapon summary */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl border border-[#2b2736] bg-[#121017]">
                  <span className="block text-[10px] text-[#787382] uppercase tracking-wider">ARCHETYPE</span>
                  <span className="font-semibold text-white tracking-wide truncate block">{winner.archetype}</span>
                </div>
                <div className="p-2.5 rounded-xl border border-[#2b2736] bg-[#121017]">
                  <span className="block text-[10px] text-[#787382] uppercase tracking-wider">SIGNATURE WEAPON</span>
                  <span className="font-semibold text-white tracking-wide truncate block">{winner.weapon}</span>
                </div>
              </div>

              {/* Survival Odds Box */}
              <div className="p-3.5 rounded-xl border border-[#e5534b]/40 bg-[#1c141a]/90 space-y-1">
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#e5534b]">
                  <span className="flex items-center gap-1.5">
                    <ShieldAlert className="h-4 w-4" />
                    SURVIVAL ODDS
                  </span>
                  <span className="text-sm font-black">{winner.survivalOdds} / 10</span>
                </div>
                <p className="text-xs text-[#d6c7cb] leading-relaxed italic">
                  {winner.survivalQuote}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Reasons Why You Fit Them */}
        <div className="rounded-2xl border border-[#2d2a38] bg-[#16141c]/95 p-6 md:p-8 space-y-4">
          <h3 className="flex items-center gap-2 text-xs sm:text-sm font-bold tracking-[0.25em] text-[#e5534b] uppercase">
            <Crosshair className="h-4 w-4" />
            3 REASONS WHY THIS IS YOUR ICON
          </h3>

          <div className="space-y-3">
            {winner.reasons.map((reason, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3.5 rounded-xl border border-[#262230] bg-[#1a1724]"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-[#e5534b]/50 bg-[#121017] text-xs font-bold text-[#e5534b]">
                  {idx + 1}
                </span>
                <p className="text-xs sm:text-sm text-[#d4cfe0] leading-relaxed pt-0.5">
                  {reason}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Personality Attributes Breakdown */}
        <div className="rounded-2xl border border-[#2d2a38] bg-[#16141c]/95 p-6 md:p-8 space-y-4">
          <h3 className="flex items-center gap-2 text-xs sm:text-sm font-bold tracking-[0.25em] text-[#e5534b] uppercase">
            <Activity className="h-4 w-4" />
            PSYCHOMETRIC ATTRIBUTE PROFILE
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {Object.entries(winner.traits).map(([trait, value]) => (
              <div
                key={trait}
                className="p-3 rounded-xl border border-[#262230] bg-[#191624] text-center space-y-1.5"
              >
                <span className="block text-[11px] font-medium uppercase tracking-wider text-[#8e8999]">
                  {trait}
                </span>
                <span className="block text-xl font-black text-white">{value}%</span>
                <div className="w-full h-1 rounded-full bg-[#121017] overflow-hidden">
                  <div
                    className="h-full bg-[#e5534b]"
                    style={{ width: `${value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Runner-Up Character Card */}
        <div className="rounded-2xl border border-[#2d2a38] bg-[#16141c]/95 p-6 md:p-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold tracking-[0.25em] text-[#8e8999] uppercase">
              <Award className="h-4 w-4 text-[#e5534b]" />
              RUNNER-UP AFFINITY
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded bg-[#e5534b]/15 text-[#e5534b] border border-[#e5534b]/30">
              {runnerUpPercentage}% MATCH
            </span>
          </div>

          <div className="flex items-center gap-4">
            <CharacterImage character={runnerUp} size="small" />
            <div className="space-y-1">
              <h4 className="font-extrabold uppercase tracking-wider text-white text-base md:text-lg">
                {runnerUp.name}
              </h4>
              <p className="text-xs text-[#8e8999] tracking-wide">
                {runnerUp.movie} · {runnerUp.archetype}
              </p>
              <p className="text-xs text-[#b8b3c4] line-clamp-2 pt-0.5">
                {runnerUp.summary}
              </p>
            </div>
          </div>
        </div>

        {/* Collapsible: Full 13-Character Affinity Breakdown */}
        <div className="rounded-2xl border border-[#2d2a38] bg-[#16141c]/95 p-5">
          <button
            onClick={() => {
              soundEffects.playClick();
              setShowAllScores(!showAllScores);
            }}
            className="flex items-center justify-between w-full text-xs font-bold uppercase tracking-[0.2em] text-[#9a94a6] hover:text-[#e5534b] transition-colors"
          >
            <span>VIEW COMPLETE 13-CHARACTER AFFINITY MATRIX</span>
            {showAllScores ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>

          {showAllScores && (
            <div className="mt-4 pt-4 border-t border-[#262230] space-y-2.5 animate-fadeIn">
              {sortedScores.map(({ character, score }, rank) => {
                const percent = Math.round((score / (topScore || 1)) * 100);
                const isTop = rank === 0;
                return (
                  <div
                    key={character.id}
                    className={`flex items-center justify-between p-2.5 rounded-xl border text-xs ${
                      isTop
                        ? 'border-[#e5534b]/50 bg-[#22161b] text-white'
                        : 'border-[#262230] bg-[#171420] text-[#b3afbd]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-5 text-[11px] font-bold text-[#716c7d] text-center">
                        #{rank + 1}
                      </span>
                      <span className="font-semibold uppercase tracking-wider">
                        {character.name}
                      </span>
                      <span className="text-[10px] text-[#716c7d] hidden sm:inline">
                        ({character.movie})
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-24 sm:w-36 h-1.5 rounded-full bg-[#121017] overflow-hidden hidden sm:block">
                        <div
                          className={`h-full ${isTop ? 'bg-[#e5534b]' : 'bg-[#7c768a]'}`}
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                      <span className="font-mono font-bold text-xs">{score} PTS</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-col items-center gap-4 pt-2">
          {/* COPY RESULT BUTTON */}
          <NightfallButton
            variant="primary"
            icon={copied ? <Check className="h-6 w-6" /> : <Copy className="h-6 w-6" />}
            onClick={handleCopy}
            aria-label="Copy Result text card"
          >
            {copied ? 'COPIED TO CLIPBOARD!' : 'COPY RESULT CARD'}
          </NightfallButton>

          {/* RETAKE QUIZ BUTTON */}
          <NightfallButton
            variant="secondary"
            icon={<RotateCcw className="h-6 w-6" />}
            onClick={() => {
              soundEffects.playClick();
              onRetake();
            }}
            aria-label="Retake Quiz"
          >
            RETAKE QUIZ
          </NightfallButton>

          {/* RETURN TO MENU */}
          <NightfallButton
            variant="secondary"
            icon={<Home className="h-6 w-6" />}
            onClick={() => {
              soundEffects.playClick();
              onExitToMenu();
            }}
            aria-label="Return to Main Menu"
          >
            RETURN TO MAIN MENU
          </NightfallButton>
        </div>
      </div>
    </div>
  );
};
