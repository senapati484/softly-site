/**
 * Soft Serene Audio & Ambient Synthesizer using Web Audio API
 * Generates continuous realistic nature soundscapes without external audio files.
 */
let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
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

/* ============================================================ */
/* PROCEDURAL CONTINUOUS AMBIENT SOUND GENERATOR                */
/* ============================================================ */

interface AmbientInstance {
  masterGain: GainNode;
  nodes: (AudioNode | number)[]; // AudioNode or interval timers
  trackName: string;
}

let activeAmbientInstance: AmbientInstance | null = null;

/**
 * Generate a 5-second looped pink/brown noise buffer for natural organic texture
 */
function createNoiseBuffer(ctx: AudioContext, type: 'pink' | 'brown' | 'white' = 'brown'): AudioBuffer {
  const bufferSize = ctx.sampleRate * 5;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);

  let lastOut = 0.0;
  let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1;

    if (type === 'brown') {
      // Brown noise (integrated white noise) for deep rain/wind
      lastOut = (lastOut + 0.02 * white) / 1.02;
      data[i] = lastOut * 3.5;
    } else if (type === 'pink') {
      // Pink noise (1/f filter approximation)
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
      b6 = white * 0.115926;
    } else {
      data[i] = white * 0.2;
    }
  }

  return buffer;
}

/**
 * Start a continuous procedural ambient soundscape
 */
export function startAmbientSound(trackName: string, targetVolume = 0.35) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    // If same track is already playing, return
    if (activeAmbientInstance && activeAmbientInstance.trackName === trackName) {
      return;
    }

    // Stop current instance smoothly
    stopAmbientSound(0.5);

    const now = ctx.currentTime;
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.001, now);
    masterGain.gain.linearRampToValueAtTime(targetVolume, now + 1.2);
    masterGain.connect(ctx.destination);

    const nodes: (AudioNode | number)[] = [masterGain];

    if (trackName === 'Rain on Cedar') {
      // --- Rain on Cedar ---
      // Deep soothing rain bed with high-frequency patter
      const rainBuffer = createNoiseBuffer(ctx, 'brown');
      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = rainBuffer;
      noiseSource.loop = true;

      const lowpass = ctx.createBiquadFilter();
      lowpass.type = 'lowpass';
      lowpass.frequency.setValueAtTime(1100, now);

      const highpass = ctx.createBiquadFilter();
      highpass.type = 'highpass';
      highpass.frequency.setValueAtTime(180, now);

      noiseSource.connect(lowpass);
      lowpass.connect(highpass);
      highpass.connect(masterGain);
      noiseSource.start(now);
      nodes.push(noiseSource, lowpass, highpass);

      // Add gentle high-patter droplets
      const patterBuffer = createNoiseBuffer(ctx, 'pink');
      const patterSource = ctx.createBufferSource();
      patterSource.buffer = patterBuffer;
      patterSource.loop = true;

      const patterFilter = ctx.createBiquadFilter();
      patterFilter.type = 'bandpass';
      patterFilter.frequency.setValueAtTime(2400, now);
      patterFilter.Q.setValueAtTime(1.5, now);

      const patterGain = ctx.createGain();
      patterGain.gain.setValueAtTime(0.18, now);

      patterSource.connect(patterFilter);
      patterFilter.connect(patterGain);
      patterGain.connect(masterGain);
      patterSource.start(now);
      nodes.push(patterSource, patterFilter, patterGain);
    } else if (trackName === 'Forest Wind') {
      // --- Forest Wind ---
      // Slow oscillating atmospheric wind sweep
      const windBuffer = createNoiseBuffer(ctx, 'pink');
      const windSource = ctx.createBufferSource();
      windSource.buffer = windBuffer;
      windSource.loop = true;

      const bandpass = ctx.createBiquadFilter();
      bandpass.type = 'bandpass';
      bandpass.frequency.setValueAtTime(320, now);
      bandpass.Q.setValueAtTime(3.0, now);

      // LFO for slow wind gusts
      const lfo = ctx.createOscillator();
      lfo.frequency.setValueAtTime(0.18, now); // slow breath cycle
      const lfoGain = ctx.createGain();
      lfoGain.gain.setValueAtTime(220, now);

      lfo.connect(lfoGain);
      lfoGain.connect(bandpass.frequency);

      windSource.connect(bandpass);
      bandpass.connect(masterGain);

      lfo.start(now);
      windSource.start(now);
      nodes.push(windSource, bandpass, lfo, lfoGain);
    } else if (trackName === 'Old Library') {
      // --- Old Library ---
      // Warm room tone with 432Hz ambient drone and gentle periodic clock ticks
      const roomBuffer = createNoiseBuffer(ctx, 'brown');
      const roomSource = ctx.createBufferSource();
      roomSource.buffer = roomBuffer;
      roomSource.loop = true;

      const roomFilter = ctx.createBiquadFilter();
      roomFilter.type = 'lowpass';
      roomFilter.frequency.setValueAtTime(380, now);

      const roomGain = ctx.createGain();
      roomGain.gain.setValueAtTime(0.25, now);

      roomSource.connect(roomFilter);
      roomFilter.connect(roomGain);
      roomGain.connect(masterGain);
      roomSource.start(now);
      nodes.push(roomSource, roomFilter, roomGain);

      // Warm 432Hz harmonic drone
      const drone = ctx.createOscillator();
      drone.type = 'sine';
      drone.frequency.setValueAtTime(108, now); // A2 fundamental
      const droneGain = ctx.createGain();
      droneGain.gain.setValueAtTime(0.04, now);

      drone.connect(droneGain);
      droneGain.connect(masterGain);
      drone.start(now);
      nodes.push(drone, droneGain);

      // Periodic antique clock tick every 1.5s
      const tickInterval = window.setInterval(() => {
        try {
          if (!activeAmbientInstance) return;
          const tNow = ctx.currentTime;
          const tickOsc = ctx.createOscillator();
          const tickGain = ctx.createGain();

          tickOsc.type = 'sine';
          tickOsc.frequency.setValueAtTime(900, tNow);
          tickOsc.frequency.exponentialRampToValueAtTime(120, tNow + 0.04);

          tickGain.gain.setValueAtTime(0.06, tNow);
          tickGain.gain.exponentialRampToValueAtTime(0.0001, tNow + 0.04);

          tickOsc.connect(tickGain);
          tickGain.connect(masterGain);
          tickOsc.start(tNow);
          tickOsc.stop(tNow + 0.05);
        } catch {
          // ignore
        }
      }, 1400);

      nodes.push(tickInterval);
    }

    activeAmbientInstance = {
      masterGain,
      nodes,
      trackName,
    };
  } catch (err) {
    console.error('Ambient sound error:', err);
  }
}

/**
 * Stop currently playing ambient soundscape with smooth fade-out
 */
export function stopAmbientSound(fadeDuration = 0.8) {
  if (!activeAmbientInstance) return;

  try {
    const ctx = getAudioContext();
    const instance = activeAmbientInstance;
    activeAmbientInstance = null;

    if (ctx && instance.masterGain) {
      const now = ctx.currentTime;
      instance.masterGain.gain.setValueAtTime(instance.masterGain.gain.value, now);
      instance.masterGain.gain.linearRampToValueAtTime(0.0001, now + fadeDuration);

      setTimeout(() => {
        instance.nodes.forEach((node) => {
          if (typeof node === 'number') {
            clearInterval(node);
          } else {
            try {
              if ('stop' in node && typeof (node as AudioScheduledSourceNode).stop === 'function') {
                (node as AudioScheduledSourceNode).stop();
              }
              node.disconnect();
            } catch {
              // ignore
            }
          }
        });
      }, fadeDuration * 1000 + 100);
    }
  } catch {
    // ignore
  }
}

export function isAmbientPlaying(): boolean {
  return activeAmbientInstance !== null;
}

export function getActiveAmbientTrack(): string | null {
  return activeAmbientInstance ? activeAmbientInstance.trackName : null;
}
