import React, { useState, useEffect } from 'react';
import {
  CHARACTERS,
  QUIZ_QUESTIONS,
  QuizProgress,
  PastQuizResult,
  HorrorCharacter
} from './data';
import { StartScreen } from './components/StartScreen';
import { QuizScreen } from './components/QuizScreen';
import { ResultScreen } from './components/ResultScreen';
import { soundEffects } from './utils/sound';

type Screen = 'start' | 'quiz' | 'result';

const STORAGE_KEY_PROGRESS = 'horror_quiz_progress_v1';
const STORAGE_KEY_RESULTS = 'horror_quiz_past_results_v1';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('start');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, 'A' | 'B' | 'C' | 'D'>>({});
  const [pastResults, setPastResults] = useState<PastQuizResult[]>([]);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Result state
  const [resultWinner, setResultWinner] = useState<HorrorCharacter | null>(null);
  const [resultMatchPercentage, setResultMatchPercentage] = useState<number>(90);
  const [resultRunnerUp, setResultRunnerUp] = useState<HorrorCharacter | null>(null);
  const [resultRunnerUpPercentage, setResultRunnerUpPercentage] = useState<number>(75);
  const [resultScores, setResultScores] = useState<Record<string, number>>({});

  // Initialize from localStorage on load
  useEffect(() => {
    soundEffects.initMuteState();
    setIsMuted(soundEffects.getIsMuted());

    // Load past results
    try {
      const savedResults = localStorage.getItem(STORAGE_KEY_RESULTS);
      if (savedResults) {
        const parsed = JSON.parse(savedResults);
        if (Array.isArray(parsed)) {
          setPastResults(parsed);
        }
      }
    } catch {
      // LocalStorage error fallback
    }

    // Load in-progress quiz
    try {
      const savedProgress = localStorage.getItem(STORAGE_KEY_PROGRESS);
      if (savedProgress) {
        const parsed: QuizProgress = JSON.parse(savedProgress);
        if (parsed && parsed.answers) {
          setAnswers(parsed.answers);
          setCurrentQuestionIndex(parsed.currentQuestionIndex || 0);
        }
      }
    } catch {
      // LocalStorage error fallback
    }
  }, []);

  const handleMuteToggle = () => {
    const nextState = soundEffects.toggleMute();
    setIsMuted(nextState);
  };

  const hasSavedProgress =
    Object.keys(answers).length > 0 && Object.keys(answers).length < QUIZ_QUESTIONS.length;

  const savedProgress: QuizProgress | null = hasSavedProgress
    ? {
        currentQuestionIndex,
        answers,
        timestamp: Date.now()
      }
    : null;

  // Start new quiz
  const handleStartNewQuiz = () => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    try {
      localStorage.removeItem(STORAGE_KEY_PROGRESS);
    } catch {
      // ignore
    }
    setCurrentScreen('quiz');
  };

  // Continue existing quiz
  const handleResumeQuiz = () => {
    const answeredCount = Object.keys(answers).length;
    if (answeredCount >= QUIZ_QUESTIONS.length) {
      setCurrentQuestionIndex(0);
    } else {
      // Jump to first unanswered question or saved index
      let targetIndex = currentQuestionIndex;
      for (let i = 0; i < QUIZ_QUESTIONS.length; i++) {
        if (!answers[QUIZ_QUESTIONS[i].id]) {
          targetIndex = i;
          break;
        }
      }
      setCurrentQuestionIndex(targetIndex);
    }
    setCurrentScreen('quiz');
  };

  // Handle answering a question
  const handleAnswer = (questionId: number, optionId: 'A' | 'B' | 'C' | 'D') => {
    const newAnswers = { ...answers, [questionId]: optionId };
    setAnswers(newAnswers);

    const isLastQuestion = currentQuestionIndex >= QUIZ_QUESTIONS.length - 1;

    if (!isLastQuestion) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);

      // Save progress to localStorage
      try {
        const progress: QuizProgress = {
          currentQuestionIndex: nextIndex,
          answers: newAnswers,
          timestamp: Date.now()
        };
        localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(progress));
      } catch {
        // ignore
      }
    } else {
      // Completed all 20 questions! Calculate result
      finishQuiz(newAnswers);
    }
  };

  // Calculate winner, runner-up, and save result
  const finishQuiz = (finalAnswers: Record<number, 'A' | 'B' | 'C' | 'D'>) => {
    const scores: Record<string, number> = {};
    Object.keys(CHARACTERS).forEach((charId) => {
      scores[charId] = 0;
    });

    // Sum points
    for (const [qIdStr, optId] of Object.entries(finalAnswers)) {
      const qId = Number(qIdStr);
      const question = QUIZ_QUESTIONS.find((q) => q.id === qId);
      const option = question?.options.find((o) => o.id === optId);
      if (option && option.points) {
        for (const [charId, pts] of Object.entries(option.points)) {
          scores[charId] = (scores[charId] || 0) + (pts || 0);
        }
      }
    }

    // Sort scores descending
    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    const topEntry = sorted[0];
    const runnerUpEntry = sorted[1] || sorted[0];

    const winnerChar = CHARACTERS[topEntry[0]] || CHARACTERS.freddy;
    const runnerUpChar = CHARACTERS[runnerUpEntry[0]] || CHARACTERS.michael;

    // Calculate match percentage: base 70% + relative point scale up to 98%
    const highestScore = topEntry[1];
    const matchPct = Math.min(98, Math.max(78, Math.round(75 + (highestScore / 25) * 23)));
    const runnerUpPct = Math.min(
      matchPct - 3,
      Math.max(65, Math.round(70 + (runnerUpEntry[1] / 25) * 20))
    );

    setResultWinner(winnerChar);
    setResultMatchPercentage(matchPct);
    setResultRunnerUp(runnerUpChar);
    setResultRunnerUpPercentage(runnerUpPct);
    setResultScores(scores);

    // Save to past results
    const newResultRecord: PastQuizResult = {
      id: `result_${Date.now()}`,
      winnerId: winnerChar.id,
      winnerName: winnerChar.name,
      movie: winnerChar.movie,
      matchPercentage: matchPct,
      runnerUpId: runnerUpChar.id,
      runnerUpName: runnerUpChar.name,
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }),
      timestamp: Date.now()
    };

    const updatedPast = [newResultRecord, ...pastResults].slice(0, 20);
    setPastResults(updatedPast);

    try {
      localStorage.setItem(STORAGE_KEY_RESULTS, JSON.stringify(updatedPast));
      // Clear in-progress quiz since it's finished
      localStorage.removeItem(STORAGE_KEY_PROGRESS);
    } catch {
      // ignore
    }

    soundEffects.playReveal();
    setCurrentScreen('result');
  };

  // View past result from modal
  const handleSelectPastResult = (record: PastQuizResult) => {
    const winnerChar = CHARACTERS[record.winnerId] || CHARACTERS.freddy;
    const runnerUpChar = CHARACTERS[record.runnerUpId] || CHARACTERS.michael;

    setResultWinner(winnerChar);
    setResultMatchPercentage(record.matchPercentage);
    setResultRunnerUp(runnerUpChar);
    setResultRunnerUpPercentage(Math.max(60, record.matchPercentage - 12));

    // Synthetic mock score distribution for past record view
    const syntheticScores: Record<string, number> = {};
    Object.keys(CHARACTERS).forEach((id) => {
      syntheticScores[id] = id === winnerChar.id ? 24 : id === runnerUpChar.id ? 18 : 8;
    });
    setResultScores(syntheticScores);

    setCurrentScreen('result');
  };

  const handleClearHistory = () => {
    setPastResults([]);
    try {
      localStorage.removeItem(STORAGE_KEY_RESULTS);
    } catch {
      // ignore
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#0d0b10] text-[#e0dde6] overflow-x-hidden font-sans">
      {/* Background Soft Red Radial Glow behind the title/center */}
      <div className="pointer-events-none fixed inset-0 flex items-start justify-center z-0 overflow-hidden">
        <div className="h-[550px] w-[550px] md:h-[750px] md:w-[750px] -translate-y-36 rounded-full bg-[#e5534b]/12 blur-[120px] animate-ambient-glow" />
      </div>

      {/* Retro CRT Scanlines & noise texture overlay */}
      <div className="pointer-events-none fixed inset-0 z-20 scanlines-overlay opacity-30" />

      {/* Screen Views */}
      <main className="relative z-10 w-full min-h-screen">
        {currentScreen === 'start' && (
          <StartScreen
            onStartNewQuiz={handleStartNewQuiz}
            onResumeQuiz={handleResumeQuiz}
            hasSavedProgress={hasSavedProgress}
            savedProgress={savedProgress}
            pastResults={pastResults}
            onSelectPastResult={handleSelectPastResult}
            onClearHistory={handleClearHistory}
            onMuteToggle={handleMuteToggle}
            isMuted={isMuted}
          />
        )}

        {currentScreen === 'quiz' && (
          <QuizScreen
            currentQuestionIndex={currentQuestionIndex}
            answers={answers}
            onAnswer={handleAnswer}
            onPrevious={() => {
              if (currentQuestionIndex > 0) {
                setCurrentQuestionIndex(currentQuestionIndex - 1);
              }
            }}
            onExitToMenu={() => setCurrentScreen('start')}
          />
        )}

        {currentScreen === 'result' && resultWinner && resultRunnerUp && (
          <ResultScreen
            winner={resultWinner}
            matchPercentage={resultMatchPercentage}
            runnerUp={resultRunnerUp}
            runnerUpPercentage={resultRunnerUpPercentage}
            scores={resultScores}
            onRetake={handleStartNewQuiz}
            onExitToMenu={() => setCurrentScreen('start')}
          />
        )}
      </main>
    </div>
  );
}
