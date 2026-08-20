/**
 * Soft Serene Audio chime generator using Web Audio API
 */
let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playSoftChime(frequency = 528, duration = 1.6) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    // Gentle warm sine tone reminiscent of a singing bowl
    osc.type = 'sine';
    osc.frequency.setValueAtTime(frequency, now);
    osc.frequency.exponentialRampToValueAtTime(frequency * 0.995, now + duration);

    // Smooth envelope attack and decay
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.08, now + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + duration);
  } catch {
    // Gracefully ignore audio autoplay policies if blocked
  }
}

export function playBreathChime(phase: 'inhale' | 'hold' | 'exhale') {
  if (phase === 'inhale') {
    playSoftChime(432, 2.0);
  } else if (phase === 'hold') {
    playSoftChime(528, 1.2);
  } else {
    playSoftChime(396, 2.5);
  }
}
