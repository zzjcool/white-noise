import { ref } from "vue";
export class Noise {
  constructor(key, name, url, icon, vol = 60) {
    this.key = key;
    this.name = name;
    this.url = url;
    this.icon = icon;
    this.onPlay = false;
    this.onLoading = false;
    this.status = "wait"; // wait stop play
    this.vol = ref(vol);
  }
}
export class AudioInfo {
  constructor(name, url, icon) {
    this.name = name;
    this.url = url;
    this.icon = icon;
  }
}
