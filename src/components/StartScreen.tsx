import React, { useState } from 'react';
import { Gamepad2, Save, Trophy, HelpCircle, Sparkles } from 'lucide-react';
import { NightfallHeader } from './NightfallHeader';
import { NightfallButton } from './NightfallButton';
import { PastResultsModal } from './PastResultsModal';
import { HowItWorksModal } from './HowItWorksModal';
import { PastQuizResult, QuizProgress } from '../data';

interface StartScreenProps {
  onStartNewQuiz: () => void;
  onResumeQuiz: () => void;
  hasSavedProgress: boolean;
  savedProgress: QuizProgress | null;
  pastResults: PastQuizResult[];
  onSelectPastResult: (result: PastQuizResult) => void;
  onClearHistory: () => void;
  onMuteToggle: () => void;
  isMuted: boolean;
}

export const StartScreen: React.FC<StartScreenProps> = ({
  onStartNewQuiz,
  onResumeQuiz,
  hasSavedProgress,
  savedProgress,
  pastResults,
  onSelectPastResult,
  onClearHistory,
  onMuteToggle,
  isMuted
}) => {
  const [showPastResults, setShowPastResults] = useState(false);
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  const answeredCount = savedProgress ? Object.keys(savedProgress.answers).length : 0;

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-between px-4 py-8 md:py-12 z-10">
      {/* Top Header Section */}
      <div className="w-full max-w-4xl flex flex-col items-center">
        <NightfallHeader
          subtitle="WHICH HORROR ICON ARE YOU?"
          onMuteToggle={onMuteToggle}
          isMuted={isMuted}
        />
      </div>

      {/* Center Action Menu */}
      <div className="w-full max-w-[770px] flex flex-col items-center gap-4 my-8 md:my-12 animate-fadeIn">
        {/* START QUIZ (Primary button) */}
        <NightfallButton
          variant="primary"
          icon={<Gamepad2 className="h-6 w-6 md:h-7 md:w-7" />}
          onClick={onStartNewQuiz}
          aria-label="Start Quiz"
        >
          START QUIZ
        </NightfallButton>

        {/* CONTINUE (Resumes unfinished quiz) */}
        <NightfallButton
          variant="secondary"
          icon={<Save className="h-6 w-6 md:h-7 md:w-7" />}
          onClick={onResumeQuiz}
          disabled={!hasSavedProgress}
          badge={hasSavedProgress ? `Q ${answeredCount + 1} / 20` : undefined}
          aria-label={hasSavedProgress ? `Continue Quiz at Question ${answeredCount + 1}` : 'No Saved Progress'}
        >
          CONTINUE
        </NightfallButton>

        {/* PAST RESULTS */}
        <NightfallButton
          variant="secondary"
          icon={<Trophy className="h-6 w-6 md:h-7 md:w-7" />}
          onClick={() => setShowPastResults(true)}
          badge={pastResults.length > 0 ? `${pastResults.length} RECORDED` : undefined}
          aria-label="View Past Results"
        >
          PAST RESULTS
        </NightfallButton>

        {/* HOW IT WORKS */}
        <NightfallButton
          variant="secondary"
          icon={<HelpCircle className="h-6 w-6 md:h-7 md:w-7" />}
          onClick={() => setShowHowItWorks(true)}
          aria-label="How It Works"
        >
          HOW IT WORKS
        </NightfallButton>
      </div>

      {/* Footer Branding & Disclaimer */}
      <div className="w-full max-w-2xl text-center space-y-2 pt-4">
        <div className="flex items-center justify-center gap-2 text-xs text-[#706b7a] tracking-[0.2em] uppercase">
          <span>20 SCENARIOS</span>
          <span aria-hidden="true" className="text-[#e5534b]/60">·</span>
          <span>13 CLASSIC ICONS</span>
          <span aria-hidden="true" className="text-[#e5534b]/60">·</span>
          <span>1 SURVIVOR</span>
        </div>
        <p className="text-[11px] text-[#555060] tracking-wider uppercase">
          CLIENT-SIDE PSYCHOLOGICAL EVALUATION · NO EXTERNAL COOKIES OR TRACKING
        </p>
      </div>

      {/* Modals */}
      <PastResultsModal
        isOpen={showPastResults}
        onClose={() => setShowPastResults(false)}
        results={pastResults}
        onSelectResult={(res) => {
          setShowPastResults(false);
          onSelectPastResult(res);
        }}
        onClearHistory={onClearHistory}
      />

      <HowItWorksModal
        isOpen={showHowItWorks}
        onClose={() => setShowHowItWorks(false)}
      />
    </div>
  );
};
