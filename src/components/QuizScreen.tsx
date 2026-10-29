import React, { useState, useEffect } from 'react';
import { ArrowLeft, Home, Skull, CheckCircle2 } from 'lucide-react';
import { QuizQuestion, QUIZ_QUESTIONS } from '../data';
import { NightfallButton } from './NightfallButton';
import { soundEffects } from '../utils/sound';

interface QuizScreenProps {
  currentQuestionIndex: number;
  answers: Record<number, 'A' | 'B' | 'C' | 'D'>;
  onAnswer: (questionId: number, optionId: 'A' | 'B' | 'C' | 'D') => void;
  onPrevious: () => void;
  onExitToMenu: () => void;
}

export const QuizScreen: React.FC<QuizScreenProps> = ({
  currentQuestionIndex,
  answers,
  onAnswer,
  onPrevious,
  onExitToMenu
}) => {
  const currentQuestion: QuizQuestion = QUIZ_QUESTIONS[currentQuestionIndex];
  const totalQuestions = QUIZ_QUESTIONS.length;
  const currentAnswer = answers[currentQuestion.id];

  const [selectedOption, setSelectedOption] = useState<'A' | 'B' | 'C' | 'D' | null>(
    currentAnswer || null
  );
  const [isFading, setIsFading] = useState(false);

  // Sync selectedOption when question changes
  useEffect(() => {
    setSelectedOption(answers[currentQuestion.id] || null);
    setIsFading(false);
  }, [currentQuestionIndex, answers, currentQuestion.id]);

  // Keyboard navigation support (A, B, C, D or 1, 2, 3, 4)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isFading) return;
      const key = e.key.toUpperCase();
      if (key === 'A' || key === '1') handleSelectOption('A');
      else if (key === 'B' || key === '2') handleSelectOption('B');
      else if (key === 'C' || key === '3') handleSelectOption('C');
      else if (key === 'D' || key === '4') handleSelectOption('D');
      else if (e.key === 'ArrowLeft' && currentQuestionIndex > 0) {
        onPrevious();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFading, currentQuestionIndex, onPrevious]);

  const handleSelectOption = (optionId: 'A' | 'B' | 'C' | 'D') => {
    if (isFading) return;
    soundEffects.playSelect();
    setSelectedOption(optionId);
    setIsFading(true);

    // Quick auto-advance fade
    const timer = setTimeout(() => {
      onAnswer(currentQuestion.id, optionId);
    }, 280);

    return () => clearTimeout(timer);
  };

  const progressPercent = Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100);

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-between px-4 py-6 md:py-10 z-10">
      {/* Top Navigation & Status Bar */}
      <div className="w-full max-w-[770px] space-y-4">
        {/* Navigation controls */}
        <div className="flex items-center justify-between text-xs font-semibold tracking-[0.2em] uppercase text-[#8e8999]">
          <button
            onClick={() => {
              soundEffects.playClick();
              if (currentQuestionIndex > 0) {
                onPrevious();
              } else {
                onExitToMenu();
              }
            }}
            className="flex items-center gap-2 hover:text-[#e5534b] transition-colors p-1.5 -ml-1.5 rounded-lg focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#e5534b]"
            aria-label={currentQuestionIndex > 0 ? "Previous question" : "Back to menu"}
          >
            <ArrowLeft className="h-4 w-4" />
            <span>{currentQuestionIndex > 0 ? 'PREVIOUS' : 'MAIN MENU'}</span>
          </button>

          <div className="flex items-center gap-2 text-[#e5534b] font-bold">
            <Skull className="h-4 w-4" />
            <span>
              QUESTION {currentQuestionIndex + 1} / {totalQuestions}
            </span>
          </div>

          <button
            onClick={() => {
              soundEffects.playClick();
              onExitToMenu();
            }}
            className="flex items-center gap-1.5 hover:text-[#e5534b] transition-colors p-1.5 -mr-1.5 rounded-lg"
            title="Exit to menu (progress saved)"
            aria-label="Exit to menu"
          >
            <Home className="h-4 w-4" />
            <span className="hidden sm:inline">MENU</span>
          </button>
        </div>

        {/* Red Progress Bar */}
        <div className="w-full h-1.5 rounded-full bg-[#1c1a24] overflow-hidden border border-[#2d2838]">
          <div
            className="h-full bg-gradient-to-r from-[#992d27] via-[#e5534b] to-[#ff736b] transition-all duration-300 ease-out shadow-[0_0_12px_rgba(229,83,75,0.7)]"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Main Question Card & Answers Container */}
      <div
        className={`w-full max-w-[770px] my-auto py-6 space-y-6 transition-opacity duration-200 ${
          isFading ? 'opacity-40 scale-[0.99]' : 'opacity-100 scale-100'
        }`}
      >
        {/* Question Header Card */}
        <div className="rounded-2xl border border-[#2d2a38] bg-[#16141c]/95 p-6 md:p-8 shadow-[0_0_30px_rgba(13,11,16,0.8)] relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#e5534b]/60 to-transparent" />

          {/* Category Tag */}
          <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.25em] text-[#e5534b] uppercase mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-[#e5534b]" />
            <span>SCENARIO {String(currentQuestion.id).padStart(2, '0')} · {currentQuestion.category}</span>
          </div>

          {/* Question Text */}
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#f0ecf5] leading-relaxed tracking-wide">
            {currentQuestion.question}
          </h2>
        </div>

        {/* 4 Answer Options */}
        <div className="space-y-3.5">
          {currentQuestion.options.map((option) => {
            const isSelected = selectedOption === option.id;
            return (
              <NightfallButton
                key={option.id}
                variant={isSelected ? 'primary' : 'option'}
                optionLabel={option.id}
                onClick={() => handleSelectOption(option.id)}
                aria-label={`Option ${option.id}: ${option.text}`}
                className={isSelected ? 'ring-2 ring-[#e5534b]' : ''}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="normal-case tracking-normal font-medium text-xs sm:text-sm md:text-base text-[#e0dde6] group-hover:text-white">
                    {option.text}
                  </span>
                  {isSelected && (
                    <CheckCircle2 className="h-5 w-5 text-[#e5534b] shrink-0 ml-3" />
                  )}
                </div>
              </NightfallButton>
            );
          })}
        </div>
      </div>

      {/* Subtle Hint & Keyboard instruction */}
      <div className="w-full max-w-[770px] flex items-center justify-between text-[11px] text-[#696473] tracking-wider uppercase pt-2">
        <span className="hidden sm:inline">TIP: PRESS KEYS A-D OR 1-4 TO ANSWER QUICKLY</span>
        <span>PROGRESS SAVED AUTOMATICALLY</span>
      </div>
    </div>
  );
};
