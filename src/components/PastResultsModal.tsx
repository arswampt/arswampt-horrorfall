import React from 'react';
import { Trophy, X, Trash2, Calendar, Skull, ArrowRight } from 'lucide-react';
import { PastQuizResult, CHARACTERS } from '../data';
import { soundEffects } from '../utils/sound';

interface PastResultsModalProps {
  isOpen: boolean;
  onClose: () => void;
  results: PastQuizResult[];
  onSelectResult: (result: PastQuizResult) => void;
  onClearHistory: () => void;
}

export const PastResultsModal: React.FC<PastResultsModalProps> = ({
  isOpen,
  onClose,
  results,
  onSelectResult,
  onClearHistory
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-2xl rounded-2xl border border-[#e5534b]/40 bg-[#14121a] p-6 md:p-8 text-[#ded9e5] shadow-[0_0_50px_rgba(229,83,75,0.25)] max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#2d2a38] pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#e5534b]/50 bg-[#1c1b22] text-[#e5534b]">
              <Trophy className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-extrabold uppercase tracking-[0.2em] text-[#e5534b] text-base md:text-lg">
                PAST ARCHIVAL RECORDS
              </h3>
              <p className="text-xs text-[#8e8999] tracking-wider uppercase">
                {results.length} COMPLETED {results.length === 1 ? 'PROFILE' : 'PROFILES'} FOUND
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              soundEffects.playClick();
              onClose();
            }}
            className="rounded-lg p-2 text-[#8e8999] hover:text-[#e5534b] hover:bg-[#1c1b22] transition-colors"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Results list */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3 pr-1">
          {results.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center text-[#8e8999]">
              <Skull className="h-12 w-12 text-[#e5534b]/30 mb-3" />
              <p className="font-medium tracking-wider uppercase text-sm">NO PREVIOUS ASSIGNMENTS RECORDED</p>
              <p className="text-xs text-[#6e6978] mt-1 max-w-xs">
                Take the 20-question quiz to identify your classic American horror alter ego.
              </p>
            </div>
          ) : (
            results.map((res) => {
              const char = CHARACTERS[res.winnerId];
              return (
                <div
                  key={res.id}
                  onClick={() => {
                    soundEffects.playClick();
                    onSelectResult(res);
                  }}
                  className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-[#2a2736] bg-[#1a1822] hover:border-[#e5534b]/70 hover:bg-[#201d2a] cursor-pointer transition-all duration-200"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#e5534b]/40 bg-[#121017] text-[#e5534b]">
                      <Skull className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold uppercase tracking-wider text-white group-hover:text-[#e5534b] transition-colors">
                          {res.winnerName}
                        </span>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#e5534b]/15 text-[#e5534b] border border-[#e5534b]/30">
                          {res.matchPercentage}%
                        </span>
                      </div>
                      <p className="text-xs text-[#9590a0] tracking-wide mt-0.5">
                        {res.movie} · Runner-up: {res.runnerUpName}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 text-xs text-[#7b7587]">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      {res.date}
                    </span>
                    <span className="flex items-center gap-1 text-[#e5534b] font-medium group-hover:translate-x-1 transition-transform">
                      VIEW <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {results.length > 0 && (
          <div className="flex items-center justify-between border-t border-[#2d2a38] pt-4">
            <button
              onClick={() => {
                soundEffects.playClick();
                if (window.confirm('Clear all saved horror quiz results? This cannot be undone.')) {
                  onClearHistory();
                }
              }}
              className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-[#9b514d] hover:text-[#e5534b] transition-colors"
            >
              <Trash2 className="h-3.5 w-3.5" />
              CLEAR ARCHIVES
            </button>
            <button
              onClick={() => {
                soundEffects.playClick();
                onClose();
              }}
              className="px-5 py-2 rounded-xl border border-[#3b3547] bg-[#1c1b22] text-xs font-semibold uppercase tracking-wider text-[#ded9e5] hover:border-[#e5534b] transition-colors"
            >
              CLOSE
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
