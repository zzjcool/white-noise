import { Noise } from "./noise";
import { watch } from "vue";
import { settings } from "./settings";
export class SeamlessNoise extends Noise {
  static AudioContext = window.AudioContext || window.webkitAudioContext;
  static ctx = null;
  constructor({ key, name, url, icon, vol = 60 }) {
    super(key, name, url, icon, vol);
    this.buffer = null;
    this.source = null;
    this.cache = false;
    this.gain = null;

    watch(this.vol, this.volChange(this));
  }

  volChange(that) {
    return (vol, prevol) => {
      if (!this.gain) {
        return;
      }
      that.gain.gain.value = vol / 100;
      settings.changePlayList(that.key, true, vol);
    };
  }

  loadAudio() {
    let request = new XMLHttpRequest();
    request.open("GET", this.url, true);
    request.responseType = "arraybuffer";
    // 加载完成后解码
    let that = this;
    request.onload = function () {
      that.ctx.decodeAudioData(request.response, function (buffer) {
        that.onLoading = false;
        that.buffer = buffer;
        that.cache = true;
        that.status = "stop";
        that.playAudio();
      });
    };
    request.send();
  }
  playAudio() {
    if (this.onPlay) {
      this.pause();
      settings.changePlayList(this.key, this.onPlay, this.vol);
    } else {
      this.source = this.ctx.createBufferSource();
      this.source.buffer = this.buffer;
      this.source.loop = true;
      this.gain.connect(this.ctx.destination);
      this.source.connect(this.gain);
      this.source.start();
      this.onPlay = true;
      this.status = "play";
      settings.changePlayList(this.key, this.onPlay, this.vol);
    }
  }
  pause() {
    if (!this.onPlay) {
      return;
    }
    this.source.stop();
    this.onPlay = false;
    this.status = "stop";
  }
  click() {
    if (this.ctx == null) {
      this.ctx = new AudioContext();
    }
    this.gain = this.ctx.createGain();
    this.gain.gain.value = this.vol / 100;
    if (this.buffer == null) {
      this.onLoading = true;
      this.loadAudio();
    } else {
      this.playAudio();
    }
  }
}
