import React from 'react';
import { HelpCircle, X, Shield, Award, Users, Compass } from 'lucide-react';
import { soundEffects } from '../utils/sound';

interface HowItWorksModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HowItWorksModal: React.FC<HowItWorksModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-2xl rounded-2xl border border-[#e5534b]/40 bg-[#14121a] p-6 md:p-8 text-[#ded9e5] shadow-[0_0_50px_rgba(229,83,75,0.25)] max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#2d2a38] pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#e5534b]/50 bg-[#1c1b22] text-[#e5534b]">
              <HelpCircle className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-extrabold uppercase tracking-[0.2em] text-[#e5534b] text-base md:text-lg">
                HOW HORRORFALL WORKS
              </h3>
              <p className="text-xs text-[#8e8999] tracking-wider uppercase">
                PSYCHOLOGICAL DOSSIER & SCORING PROTOCOL
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

        {/* Content */}
        <div className="flex-1 overflow-y-auto py-5 space-y-5 text-sm pr-1">
          <div className="flex items-start gap-3.5 p-4 rounded-xl border border-[#2a2736] bg-[#1a1822]">
            <Compass className="h-6 w-6 text-[#e5534b] shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold uppercase tracking-wider text-white text-xs md:text-sm">
                20 Situational Scenarios
              </h4>
              <p className="text-[#a5a0af] text-xs leading-relaxed mt-1">
                You will be presented with 20 real-world, situational dilemmas spanning conflict resolution, social boundaries, crisis instinct, planning versus chaos, and philosophical ethics.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 rounded-xl border border-[#2a2736] bg-[#1a1822]">
            <Users className="h-6 w-6 text-[#e5534b] shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold uppercase tracking-wider text-white text-xs md:text-sm">
                13 Classic American Horror Icons
              </h4>
              <p className="text-[#a5a0af] text-xs leading-relaxed mt-1">
                Every option secretly awards weighted affinity points across Freddy Krueger, Jason Voorhees, Michael Myers, Leatherface, Ghostface, Chucky, Pennywise, Pinhead, Jigsaw, Norman Bates, Candyman, Carrie White, and Samara Morgan.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 rounded-xl border border-[#2a2736] bg-[#1a1822]">
            <Award className="h-6 w-6 text-[#e5534b] shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold uppercase tracking-wider text-white text-xs md:text-sm">
                Deterministic Compatibility & Runner-Up
              </h4>
              <p className="text-[#a5a0af] text-xs leading-relaxed mt-1">
                Your top-scoring character is assigned along with an exact match percentage, a runner-up character, 3 tailored reasons why you match their archetype, and your calculated Survival Odds score out of 10.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 rounded-xl border border-[#2a2736] bg-[#1a1822]">
            <Shield className="h-6 w-6 text-[#e5534b] shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold uppercase tracking-wider text-white text-xs md:text-sm">
                100% Client-Side Privacy & Auto-Save
              </h4>
              <p className="text-[#a5a0af] text-xs leading-relaxed mt-1">
                Your progress is auto-saved locally in your browser. You can pause and resume anytime using the Continue button on the main menu, and all previous results are stored securely in your browser cache.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-[#2d2a38] pt-4 flex justify-end">
          <button
            onClick={() => {
              soundEffects.playClick();
              onClose();
            }}
            className="px-6 py-2.5 rounded-xl border border-[#e5534b] bg-[#e5534b]/15 text-xs font-bold uppercase tracking-wider text-[#e5534b] hover:bg-[#e5534b] hover:text-white transition-all shadow-[0_0_15px_rgba(229,83,75,0.25)]"
          >
            UNDERSTOOD · PROCEED
          </button>
        </div>
      </div>
    </div>
  );
};
