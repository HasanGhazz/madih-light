// Song playback on the Web Audio clock, so hit timing stays sample-accurate.
export class SongPlayer {
  constructor() {
    this.ctx = null;
    this.buffer = null;
    this.src = null;
    this.t0 = 0;
    this.offset = 0;
    this.playing = false;
    this.volume = 1;
    this.userOffset = 0; // seconds; positive = the player hears the music later (e.g. Bluetooth)
  }

  setVolume(v) {
    this.volume = v;
    if (this.gain) this.gain.gain.value = v;
  }

  ensureContext() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
      this.gain = this.ctx.createGain();
      this.gain.gain.value = this.volume;
      this.gain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') this.ctx.resume();
    return this.ctx;
  }

  async load(url) {
    const ctx = this.ensureContext();
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Could not load ${url} (${res.status})`);
    this.buffer = await ctx.decodeAudioData(await res.arrayBuffer());
    return this.buffer.duration;
  }

  play(offset, onEnded) {
    this.stop();
    const ctx = this.ensureContext();
    const src = ctx.createBufferSource();
    src.buffer = this.buffer;
    src.connect(this.gain);
    this.src = src;
    this.offset = offset;
    this.t0 = ctx.currentTime + 0.15;
    // only the source that is still current may end the run (a stopped one fires 'ended' late)
    src.onended = () => { if (this.src === src && this.playing) { this.playing = false; onEnded?.(); } };
    src.start(this.t0, offset);
    this.playing = true;
  }

  // Song position in seconds, corrected for the device's output delay.
  time() {
    if (!this.ctx) return 0;
    const latency = this.ctx.outputLatency || this.ctx.baseLatency || 0;
    return this.ctx.currentTime - this.t0 + this.offset - latency - this.userOffset;
  }

  // Suspending the audio clock also freezes time(), so the game pauses with the music.
  pause() { if (this.ctx && this.ctx.state === 'running') return this.ctx.suspend(); }
  resume() { if (this.ctx && this.ctx.state === 'suspended') return this.ctx.resume(); }

  stop() {
    this.playing = false;
    if (this.src) { try { this.src.stop(); } catch { /* already stopped */ } this.src.disconnect(); this.src = null; }
  }
}
