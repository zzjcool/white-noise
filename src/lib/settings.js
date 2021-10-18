import { ref } from "vue";
import { LocalStorage } from "quasar";
const settingName = "settings";
class Settings {
  static background;
  static playList;
  static inited = false;
  constructor() {
    if (this.inited) {
      return;
    }
    if (this.has()) {
      const set = this.load();
      this.background = ref(set.background);
      this.playList = set.playList;
    } else {
      this.init();
    }

    this.inited = true;
  }

  changePlayList(key, onPlay, vol) {
    if (!this.playList) {
      this.playList = {};
    }
    this.playList[key] = {
      onPlay,
      vol,
    };
    this.save();
  }

  has() {
    return LocalStorage.has(settingName);
  }

  load() {
    return LocalStorage.getItem(settingName);
  }

  save() {
    LocalStorage.set(settingName, {
      background: this.background.value,
      playList: this.playList,
    });
  }

  init() {
    LocalStorage.remove(settingName);
    this.background = ref(false);
    this.playList = {};
    this.save();
    location.reload();
    this.inited = true;
  }
}

export const settings = new Settings();
