import { Noise } from "./noise";
import { watch } from "vue";
import { settings } from "./settings";
export class BackgroundNoise extends Noise {
  constructor({ key, name, url, icon, vol = 60 }, player) {
    super(key, name, url, icon, vol);
    this.player = null;
    watch(this.vol, this.volChange(this));
  }

  volChange(that) {
    // that = this;
    return (vol, prevol) => {
      if (!that.player) {
        return;
      }
      that.player.volume = vol / 100;
      settings.changePlayList(that.key, true, vol);
    };
  }

  loadAudio() {}
  playAudio() {}
  pause() {
    if (!this.onPlay) {
      return;
    }
    this.player.pause();
    this.onPlay = false;
    this.status = "stop";
  }
  play() {
    if (this.status !== "stop") {
      return;
    }
    this.player.play();
    this.onPlay = true;
    this.status = "play";
  }
  click() {
    if (!this.player) {
      this.player = new Audio(this.url);
      this.player.loop = true;
      this.player.volume = this.vol / 100;
    }
    if (this.onPlay) {
      this.pause();
      settings.changePlayList(this.key, this.onPlay, this.vol);
    } else {
      this.player.play();
      this.onPlay = true;
      this.status = "play";
      settings.changePlayList(this.key, this.onPlay, this.vol);
    }
  }
}
