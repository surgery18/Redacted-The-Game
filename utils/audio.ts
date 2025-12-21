
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
    this.musicGain.gain.value = 0.25; 
    this.musicGain.connect(this.masterGain);

    this.sfxGain = this.ctx.createGain();
    this.sfxGain.gain.value = 0.8;
    this.sfxGain.connect(this.masterGain);

    // Create White Noise Buffer
    const bufferSize = this.ctx.sampleRate * 4; // 4 seconds
    this.whiteNoiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const wData = this.whiteNoiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      wData[i] = Math.random() * 2 - 1;
    }

    // Create Pink Noise Buffer (Better for natural textures)
    this.pinkNoiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const pData = this.pinkNoiseBuffer.getChannelData(0);
    let b0=0, b1=0, b2=0, b3=0, b4=0, b5=0, b6=0;
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

  toggleMute() {
    if (!this.ctx) this.init();
    this.isMuted = !this.isMuted;
    
    if (this.masterGain && this.ctx) {
        const t = this.ctx.currentTime;
        this.masterGain.gain.setTargetAtTime(this.isMuted ? 0 : 0.5, t, 0.1);
    }
    
    if (!this.isMuted && !this.isPlaying) {
        if (this.ctx?.state === 'suspended') this.ctx.resume();
        this.startMusic();
    }
    
    return this.isMuted;
  }

  ensureContext() {
     if (!this.ctx) this.init();
     if (this.ctx?.state === 'suspended') this.ctx.resume();
  }

  startMusic() {
    this.ensureContext();
    if (this.isPlaying || this.isMuted || !this.ctx) return;
    this.isPlaying = true;
    this.nextNoteTime = this.ctx.currentTime + 0.1;
    this.beatCount = 0;
    if (this.schedulerInterval) clearInterval(this.schedulerInterval);
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
    if (!this.ctx) return;
    while (this.nextNoteTime < this.ctx.currentTime + 0.1) {
      this.playBeat(this.nextNoteTime, this.beatCount);
      this.nextNoteTime += 0.6; // ~100 BPM
      this.beatCount++;
    }
  }

  private playBeat(time: number, beat: number) {
    if (!this.ctx || !this.musicGain) return;
    
    const step = beat % 8;

    // Bass Line
    if (step % 2 === 0) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();
      
      osc.type = 'sawtooth';
      
      const bar = Math.floor(beat / 8) % 4;
      const freq = [55.00, 43.65, 36.71, 41.20][bar];
      
      osc.frequency.setValueAtTime(freq, time);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(step === 0 ? 300 : 200, time);
      filter.frequency.exponentialRampToValueAtTime(80, time + 0.4);

      gain.gain.setValueAtTime(0.5, time);
      gain.gain.exponentialRampToValueAtTime(0.01, time + 0.5);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.musicGain);
      osc.start(time);
      osc.stop(time + 0.6);
    }

    // Industrial Hat
    const hatOsc = this.ctx.createOscillator();
    const hatGain = this.ctx.createGain();
    const hatFilter = this.ctx.createBiquadFilter();

    hatOsc.type = 'square';
    hatOsc.frequency.setValueAtTime(800, time); 
    if (Math.random() > 0.5) hatOsc.frequency.setValueAtTime(1200, time);

    hatFilter.type = 'highpass';
    hatFilter.frequency.value = 4000;

    hatGain.gain.setValueAtTime(step % 2 === 0 ? 0.04 : 0.02, time);
    hatGain.gain.exponentialRampToValueAtTime(0.001, time + 0.05);
    
    hatOsc.connect(hatFilter);
    hatFilter.connect(hatGain);
    hatGain.connect(this.musicGain);
    hatOsc.start(time);
    hatOsc.stop(time + 0.05);

    // Pad
    if (beat % 16 === 0) {
        const padOsc = this.ctx.createOscillator();
        const padGain = this.ctx.createGain();
        padOsc.type = 'triangle';
        padOsc.frequency.setValueAtTime(110, time);
        
        padGain.gain.setValueAtTime(0, time);
        padGain.gain.linearRampToValueAtTime(0.05, time + 2);
        padGain.gain.linearRampToValueAtTime(0, time + 8);

        padOsc.connect(padGain);
        padGain.connect(this.musicGain);
        padOsc.start(time);
        padOsc.stop(time + 8);
    }
  }
  
  // Generic Noise Synthesis Helper
  private playNoise(
    buffer: AudioBuffer | null, 
    startTime: number, 
    duration: number, 
    filterType: BiquadFilterType, 
    freq: number, 
    vol: number, 
    q: number = 1
  ) {
     if (!this.ctx || !buffer || !this.sfxGain) return;
     const src = this.ctx.createBufferSource();
     src.buffer = buffer;
     const filter = this.ctx.createBiquadFilter();
     const gain = this.ctx.createGain();
     
     filter.type = filterType;
     filter.frequency.value = freq;
     filter.Q.value = q;
     
     gain.gain.setValueAtTime(0, startTime);
     gain.gain.linearRampToValueAtTime(vol, startTime + 0.01);
     gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
     
     src.connect(filter);
     filter.connect(gain);
     gain.connect(this.sfxGain);
     
     // Random start position for variation
     src.start(startTime, Math.random() * buffer.duration);
     src.stop(startTime + duration + 0.1);
  }

  // --- SFX METHODS ---

  playPaperRustle() {
    this.ensureContext();
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    
    // Double burst of pink noise for texture (Crinkle)
    this.playNoise(this.pinkNoiseBuffer, t, 0.12, 'lowpass', 1500, 0.25);
    this.playNoise(this.pinkNoiseBuffer, t + 0.04, 0.12, 'bandpass', 800, 0.2, 0.5);
  }

  playMarkerScratch() {
    this.ensureContext();
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    
    // Pink noise bandpassed @ 500Hz for felt tip sound
    this.playNoise(this.pinkNoiseBuffer, t, 0.08, 'bandpass', 500, 0.5, 0.8);
    // Very faint high freq brush
    this.playNoise(this.whiteNoiseBuffer, t, 0.08, 'highpass', 2000, 0.05);
  }

  playStamp() {
     this.ensureContext();
     if (!this.ctx) return;
     const t = this.ctx.currentTime;
     
     // Heavy Thud
     const osc = this.ctx.createOscillator();
     const gain = this.ctx.createGain();
     osc.frequency.setValueAtTime(150, t);
     osc.frequency.exponentialRampToValueAtTime(10, t + 0.15);
     gain.gain.setValueAtTime(0.6, t);
     gain.gain.exponentialRampToValueAtTime(0.01, t + 0.15);
     osc.connect(gain);
     gain.connect(this.sfxGain!);
     osc.start(t);
     osc.stop(t + 0.15);
     
     // Impact Noise Body
     this.playNoise(this.pinkNoiseBuffer, t, 0.1, 'lowpass', 600, 0.5);
  }

  playBurn() {
    this.ensureContext();
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const dur = 1.8;

    // 1. Fire Rumble (Pink Noise Lowpass) - The "Body" of the fire
    const rumbleSrc = this.ctx.createBufferSource();
    rumbleSrc.buffer = this.pinkNoiseBuffer;
    const rumbleFilter = this.ctx.createBiquadFilter();
    rumbleFilter.type = 'lowpass';
    rumbleFilter.frequency.value = 180;
    const rumbleGain = this.ctx.createGain();
    rumbleGain.gain.setValueAtTime(0, t);
    rumbleGain.gain.linearRampToValueAtTime(0.5, t + 0.2); // Fade in
    rumbleGain.gain.linearRampToValueAtTime(0, t + dur);   // Fade out
    rumbleSrc.connect(rumbleFilter);
    rumbleFilter.connect(rumbleGain);
    rumbleGain.connect(this.sfxGain!);
    rumbleSrc.start(t, Math.random() * 10);
    rumbleSrc.stop(t + dur);

    // 2. Fire Hiss (White Noise Bandpass) - The "Gas" sound
    const hissSrc = this.ctx.createBufferSource();
    hissSrc.buffer = this.whiteNoiseBuffer;
    const hissFilter = this.ctx.createBiquadFilter();
    hissFilter.type = 'bandpass';
    hissFilter.frequency.value = 1000;
    const hissGain = this.ctx.createGain();
    hissGain.gain.setValueAtTime(0, t);
    hissGain.gain.linearRampToValueAtTime(0.1, t + 0.2);
    hissGain.gain.linearRampToValueAtTime(0, t + dur);
    hissSrc.connect(hissFilter);
    hissFilter.connect(hissGain);
    hissGain.connect(this.sfxGain!);
    hissSrc.start(t, Math.random() * 10);
    hissSrc.stop(t + dur);

    // 3. Crackles (High Freq Pops)
    const count = 15;
    for(let i=0; i<count; i++) {
        const time = t + Math.random() * dur;
        const vol = 0.1 + Math.random() * 0.2;
        // Short, sharp high-pass click
        this.playNoise(this.whiteNoiseBuffer, time, 0.02, 'highpass', 4000, vol);
    }
  }

  playSuccess() {
    this.ensureContext();
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    
    // Low Whoosh
    this.playNoise(this.pinkNoiseBuffer, t, 0.5, 'lowpass', 200, 0.3);
    
    // Subtle Ding
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(880, t);
    gain.gain.setValueAtTime(0.05, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 1.0);
    osc.connect(gain);
    gain.connect(this.sfxGain!);
    osc.start(t);
    osc.stop(t + 1.0);
  }
  
  playClick() {
     this.ensureContext();
     if(this.ctx) this.playNoise(this.whiteNoiseBuffer, this.ctx.currentTime, 0.03, 'highpass', 3000, 0.15);
  }

  playHover() {
    this.ensureContext();
    if(this.ctx) this.playNoise(this.whiteNoiseBuffer, this.ctx.currentTime, 0.01, 'highpass', 4000, 0.02);
  }
}

export const audio = new AudioController();
