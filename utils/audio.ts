
export class AudioController {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private musicGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  
  public isMuted: boolean = false;
  private isPlaying: boolean = false;
  private schedulerInterval: number | null = null;
  private nextNoteTime: number = 0;
  private beatCount: number = 0;
  
  private whiteNoiseBuffer: AudioBuffer | null = null;
  private pinkNoiseBuffer: AudioBuffer | null = null;

  init() {
    if (this.ctx) return;
    const AudioCtor = window.AudioContext || (window as any).webkitAudioContext;
    this.ctx = new AudioCtor();
    
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.value = 0.5;
    this.masterGain.connect(this.ctx.destination);

    this.musicGain = this.ctx.createGain();
    this.musicGain.gain.value = 0.3; 
    this.musicGain.connect(this.masterGain);

    this.sfxGain = this.ctx.createGain();
    this.sfxGain.gain.value = 0.8;
    this.sfxGain.connect(this.masterGain);

    // Create White Noise Buffer
    const bufferSize = this.ctx.sampleRate * 2; 
    this.whiteNoiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const wData = this.whiteNoiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      wData[i] = Math.random() * 2 - 1;
    }

    // Create Pink Noise Buffer
    this.pinkNoiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const pData = this.pinkNoiseBuffer.getChannelData(0);
    let b0, b1, b2, b3, b4, b5, b6;
    b0 = b1 = b2 = b3 = b4 = b5 = b6 = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      pData[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
      pData[i] *= 0.11; 
      b6 = white * 0.115926;
    }
  }

  ensureContext() {
    if (!this.ctx) this.init();
    if (this.ctx?.state === 'suspended') this.ctx.resume();
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.masterGain) {
      this.masterGain.gain.setTargetAtTime(this.isMuted ? 0 : 0.5, this.ctx!.currentTime, 0.1);
    }
    return this.isMuted;
  }

  playClick() {
    if (this.isMuted || !this.ctx || !this.sfxGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.connect(gain);
    gain.connect(this.sfxGain);
    
    osc.frequency.setValueAtTime(800, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1200, this.ctx.currentTime + 0.05);
    
    gain.gain.setValueAtTime(0.5, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.05);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.05);
  }

  playPaperRustle() {
    if (this.isMuted || !this.ctx || !this.sfxGain || !this.pinkNoiseBuffer) return;
    
    // Play two layers for a more realistic "shuffle" sound
    const layers = [
      { freq: 600, dur: 0.25, gain: 0.3, delay: 0 },
      { freq: 1200, dur: 0.15, gain: 0.15, delay: 0.05 }
    ];

    layers.forEach(layer => {
      const src = this.ctx!.createBufferSource();
      src.buffer = this.pinkNoiseBuffer;
      const gain = this.ctx!.createGain();
      const filter = this.ctx!.createBiquadFilter();
      
      filter.type = "lowpass";
      filter.frequency.value = layer.freq + Math.random() * 200;

      // Randomize pitch slightly
      src.playbackRate.value = 0.9 + Math.random() * 0.2;

      src.connect(filter);
      filter.connect(gain);
      gain.connect(this.sfxGain!);

      const now = this.ctx!.currentTime + layer.delay;
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(layer.gain, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.01, now + layer.dur);
      
      src.start(now);
      src.stop(now + layer.dur + 0.1);
    });
  }

  playMarkerScratch() {
    if (this.isMuted || !this.ctx || !this.sfxGain || !this.whiteNoiseBuffer) return;
    const src = this.ctx.createBufferSource();
    src.buffer = this.whiteNoiseBuffer;
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    // Bandpass to simulate the specific frequency of a felt tip
    filter.type = "bandpass";
    filter.frequency.value = 600 + Math.random() * 400; // Lower frequency for a thicker "Sharpie" sound
    filter.Q.value = 0.8;
    
    src.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);

    const duration = 0.1 + Math.random() * 0.15;
    const now = this.ctx.currentTime;
    
    // More pronounced attack
    gain.gain.setValueAtTime(0.4, now);
    gain.gain.linearRampToValueAtTime(0.2, now + duration * 0.5);
    gain.gain.linearRampToValueAtTime(0, now + duration);

    src.playbackRate.value = 0.8 + Math.random() * 0.4;

    src.start(now);
    src.stop(now + duration);
  }

  playStamp() {
    if (this.isMuted || !this.ctx || !this.sfxGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = "square";
    osc.frequency.setValueAtTime(100, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, this.ctx.currentTime + 0.1);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    gain.gain.setValueAtTime(0.8, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.15);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.15);
  }

  playBurn() {
    if (this.isMuted || !this.ctx || !this.sfxGain || !this.pinkNoiseBuffer) return;
    const src = this.ctx.createBufferSource();
    src.buffer = this.pinkNoiseBuffer;
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();
    
    filter.type = "highpass";
    filter.frequency.setValueAtTime(400, this.ctx.currentTime);
    
    src.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);

    const duration = 1.5;
    gain.gain.setValueAtTime(0.6, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + duration);

    src.start();
    src.stop(this.ctx.currentTime + duration);
  }
  
  playSuccess() {
    if (this.isMuted || !this.ctx || !this.sfxGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = "sine";
    osc.connect(gain);
    gain.connect(this.sfxGain);
    
    const now = this.ctx.currentTime;
    osc.frequency.setValueAtTime(500, now);
    osc.frequency.setValueAtTime(1000, now + 0.1);
    
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.linearRampToValueAtTime(0, now + 0.3);
    
    osc.start();
    osc.stop(now + 0.3);
  }
  
  playScribble() {
    // Re-using marker logic but higher pitch for pencil/scribble effect
    if (this.isMuted || !this.ctx || !this.sfxGain || !this.whiteNoiseBuffer) return;
    const src = this.ctx.createBufferSource();
    src.buffer = this.whiteNoiseBuffer;
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    filter.type = "highpass";
    filter.frequency.value = 1500;
    
    src.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);

    const now = this.ctx.currentTime;
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

    src.start();
    src.stop(now + 0.3);
  }

  // --- Music Sequencer ---

  startMusic() {
    if (this.isPlaying || !this.ctx) return;
    this.isPlaying = true;
    this.nextNoteTime = this.ctx.currentTime + 0.1;
    this.schedulerInterval = window.setInterval(() => this.scheduler(), 25);
  }
  
  stopMusic() {
    this.isPlaying = false;
    if (this.schedulerInterval) {
      clearInterval(this.schedulerInterval);
      this.schedulerInterval = null;
    }
  }

  private scheduler() {
    while (this.nextNoteTime < this.ctx!.currentTime + 0.1) {
      this.scheduleNote(this.beatCount, this.nextNoteTime);
      this.nextNoteTime += 0.25; // 16th notes
      this.beatCount++;
    }
  }

  private scheduleNote(beatNumber: number, time: number) {
    // Ambient Drone Logic
    // Every 32 beats (8 seconds), trigger a long drone
    if (beatNumber % 32 === 0) { 
      this.playDrone(time, 55, 10); // A1 (Low)
    }
    // Staggered harmony drone
    if (beatNumber % 32 === 16) {
       this.playDrone(time, 82.4, 10); // E2 (Fifth)
    }
    
    // Rare, subtle blips
    if (Math.random() < 0.02) { 
       this.playBlip(time);
    }
  }

  private playDrone(time: number, freq: number, duration: number) {
    if (this.isMuted || !this.ctx || !this.musicGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    // Sawtooth filtered down gives a nice dark synth texture
    osc.type = "sawtooth";
    osc.frequency.value = freq;
    
    const filter = this.ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 100; // Start dark
    
    // Add LFO breathing to filter
    const lfo = this.ctx.createOscillator();
    lfo.frequency.value = 0.1; // Slow cycle
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.value = 50; 
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    lfo.start(time);
    lfo.stop(time + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.musicGain);

    // Slow Attack/Release envelope
    gain.gain.setValueAtTime(0, time);
    gain.gain.linearRampToValueAtTime(0.2, time + 2); // 2s Fade In
    gain.gain.setValueAtTime(0.2, time + duration - 2);
    gain.gain.linearRampToValueAtTime(0, time + duration); // 2s Fade Out

    osc.start(time);
    osc.stop(time + duration);
  }

  private playBlip(time: number) {
    if (this.isMuted || !this.ctx || !this.musicGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = 800 + Math.random() * 400;
    
    osc.connect(gain);
    gain.connect(this.musicGain);
    
    // Very short, echo-like
    gain.gain.setValueAtTime(0.05, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.15);
    
    osc.start(time);
    osc.stop(time + 0.15);
  }
}

export const audio = new AudioController();
