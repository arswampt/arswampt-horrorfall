/**
 * Web Audio API synthesized horror sound effects
 * Zero external audio files required. Clean, atmospheric, and respects user preference.
 */

let audioCtx: AudioContext | null = null;
let isMuted = false;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

export const soundEffects = {
  getIsMuted: () => isMuted,
  toggleMute: () => {
    isMuted = !isMuted;
    try {
      localStorage.setItem('horror_quiz_muted', isMuted ? 'true' : 'false');
    } catch {
      // ignore
    }
    return isMuted;
  },
  initMuteState: () => {
    try {
      const stored = localStorage.getItem('horror_quiz_muted');
      if (stored !== null) {
        isMuted = stored === 'true';
      }
    } catch {
      // ignore
    }
  },

  // Subtle metallic / wooden thud for menu button click
  playClick: () => {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(140, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(35, ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.13);
    } catch {
      // Audio context might be blocked
    }
  },

  // Atmospheric horror chime when selecting a quiz option
  playSelect: () => {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(220, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(110, ctx.currentTime + 0.18);

      gain.gain.setValueAtTime(0.14, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.19);
    } catch {
      // Audio context blocked
    }
  },

  // Eerie bass swell on quiz completion / result reveal
  playReveal: () => {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const sub = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      sub.type = 'sine';

      osc.frequency.setValueAtTime(55, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(110, ctx.currentTime + 0.5);
      osc.frequency.exponentialRampToValueAtTime(45, ctx.currentTime + 1.2);

      sub.frequency.setValueAtTime(40, ctx.currentTime);
      sub.frequency.linearRampToValueAtTime(70, ctx.currentTime + 0.6);
      sub.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 1.4);

      gain.gain.setValueAtTime(0.01, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.4);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.4);

      osc.connect(gain);
      sub.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      sub.start();
      osc.stop(ctx.currentTime + 1.45);
      sub.stop(ctx.currentTime + 1.45);
    } catch {
      // blocked
    }
  }
};
