/**
 * Nature Soundscape Synthesizer
 * Built with standard Web Audio API (100% offline, procedural sound)
 * Generates gentle forest breeze and melodic songbird chirps.
 */

(function () {
  let audioCtx = null;
  let isPlaying = false;
  let breezeGain = null;
  let birdInterval = null;

  function initAudioContext() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContextClass();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  // Generates smooth filtered pink noise simulating wind through trees
  function startBreeze() {
    const bufferSize = audioCtx.sampleRate * 2;
    const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
      b6 = white * 0.115926;
    }

    const whiteNoiseSource = audioCtx.createBufferSource();
    whiteNoiseSource.buffer = noiseBuffer;
    whiteNoiseSource.loop = true;

    // Filter simulating leaves rustling & soft wind
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(380, audioCtx.currentTime);

    // LFO to modulate breeze intensity smoothly
    const lfo = audioCtx.createOscillator();
    lfo.frequency.setValueAtTime(0.15, audioCtx.currentTime);
    const lfoGain = audioCtx.createGain();
    lfoGain.gain.setValueAtTime(140, audioCtx.currentTime);
    lfo.connect(filter.frequency);
    lfo.start();

    breezeGain = audioCtx.createGain();
    breezeGain.gain.setValueAtTime(0.001, audioCtx.currentTime);
    breezeGain.gain.exponentialRampToValueAtTime(0.18, audioCtx.currentTime + 2);

    whiteNoiseSource.connect(filter);
    filter.connect(breezeGain);
    breezeGain.connect(audioCtx.destination);
    whiteNoiseSource.start();

    return { source: whiteNoiseSource, lfo };
  }

  // Generates realistic bird chirps using frequency-modulated sine waves
  function playBirdChirp() {
    if (!isPlaying || !audioCtx) return;

    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    const baseFreq = 2200 + Math.random() * 1200;
    osc.type = 'sine';

    // Pitch envelope (chirp melody)
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.6, now + 0.06);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.9, now + 0.12);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.4, now + 0.18);

    // Amplitude envelope
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.08, now + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start(now);
    osc.stop(now + 0.25);
  }

  let audioNodes = null;

  window.toggleNatureAudio = function () {
    initAudioContext();

    if (!isPlaying) {
      isPlaying = true;
      audioNodes = startBreeze();
      // Chirps happen randomly every 3 to 7 seconds
      birdInterval = setInterval(() => {
        if (Math.random() > 0.3) {
          playBirdChirp();
          if (Math.random() > 0.4) {
            setTimeout(playBirdChirp, 180 + Math.random() * 120);
          }
        }
      }, 3500);
    } else {
      isPlaying = false;
      if (birdInterval) clearInterval(birdInterval);
      if (breezeGain && audioCtx) {
        breezeGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1);
        setTimeout(() => {
          if (audioNodes && audioNodes.source) {
            try { audioNodes.source.stop(); } catch (e) {}
          }
        }, 1100);
      }
    }
    return isPlaying;
  };

  window.getNatureAudioStatus = function () {
    return isPlaying;
  };
})();
