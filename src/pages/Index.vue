<template>
  <q-page class="column items-center fit" @click="clickScreen">
    <div class="fit row justify-center items-center q-pa-lg">
      <q-toggle
        v-model="settings.background.value"
        color="green-4"
        label="后台播放"
        class="text-white"
        left-label
        keep-color
      />
      <q-btn flat icon="fas fa-redo" class="text-white" @click="reset"></q-btn>
    </div>
    <div
      class="controll col fit row justify-center content-center items-center q-col-gutter-y-xl"
    >
      <div
        class="col-3 row justify-center items-center"
        v-for="(noise, key) in noises.source"
        :key="key"
      >
        <div class="relative-position q-py-xl" style="width: 70px; height: 70px">
          <q-knob
            v-model="noise.vol"
            size="70px"
            :thickness="0.25"
            :color="volcolorMap[noise.status]"
            class="absolute-center"
            :readonly="!noise.onPlay"
          />
          <q-btn
            class="absolute-center"
            :color="volcolorMap[noise.status]"
            size="14px"
            round
            unelevated
            :ripple="false"
            flat
            @click="clickPlay(noise)"
            :loading="noise.onLoading"
          >
            <div class="fit row justify-center items-center">
              <div v-if="!noise.icon">
                {{ noise.icon ? "" : noise.name }}
              </div>
              <q-icon v-else :name="noise.icon"></q-icon>
            </div>
          </q-btn>
        </div>
      </div>
    </div>
    <div v-if="!initFlag" class="fixed-full tip z-max flex flex-center column">
      <div><q-icon size="120px" name="fas fa-headphones"></q-icon></div>
      <div class="text-white">使用耳机获得最佳效果</div>
      <div class="text-white">点击屏幕任意位置开始使用</div>
      <q-btn flat icon="fas fa-redo" class="text-white" @click="reset"></q-btn>
    </div>
  </q-page>
</template>

<script>
import { onMounted, ref, reactive, watch } from "vue";
import { SeamlessNoise } from "src/lib/seamless";
import { BackgroundNoise } from "src/lib/background";
import { Noise } from "src/lib/noise";
import { settings } from "src/lib/settings";
import { useQuasar } from "quasar";
export default {
  name: "PageIndex",
  setup() {
    const $q = useQuasar();
    let audios = {
      brook: new Noise("brook", "小溪", "audio/brook.mp3", ""),
      birds: new Noise("birds", "小鸟", "audio/birds.mp3", ""),
      autumn: new Noise("autumn", "秋风", "audio/autumn.mp3", ""),
      tide: new Noise("tide", "潮汐", "audio/tide.mp3", ""),
      summer: new Noise("summer", "夏夜", "audio/summer.mp3", ""),
      windChime: new Noise("windChime", "风铃", "audio/wind-chime.mp3", ""),
      bonfire: new Noise("bonfire", "篝火", "audio/bonfire.mp3", ""),
      rain: new Noise("rain", "大雨", "audio/rain.mp3", ""),
    };
    let initFlag = ref(false); //是否初始化的标志

    let seamlessNoises = {};
    let backgroundNoises = {};
    Object.keys(audios).forEach((key) => {
      seamlessNoises[key] = new SeamlessNoise(audios[key]);
    });
    Object.keys(audios).forEach((key) => {
      backgroundNoises[key] = new BackgroundNoise(audios[key], ref(null));
    });

    onMounted(() => {});
    let noises = reactive({
      source: {
        status: null,
      },
    });
    if (settings.background.value) {
      noises.source = backgroundNoises;
    } else {
      noises.source = seamlessNoises;
    }

    const bgcolorMap = {
      wait: "",
      stop: "amber-6",
      play: "light-green-6",
    };
    const volcolorMap = {
      wait: "blue-grey-2",
      stop: "amber-6",
      play: "light-green-6",
    };

    const loaded = () => {};

    const initAudio = () => {
      Object.keys(settings.playList).forEach((key) => {
        const status = settings.playList[key];
        noises.source[key].vol = status.vol;
        if (status.onPlay) {
          noises.source[key].click();
        }
      });
    };
    const pauseAll = () => {
      Object.keys(settings.playList).forEach((key) => {
        noises.source[key].pause();
      });
    };
    const clickScreen = () => {
      if (initFlag.value) {
        return;
      }
      initFlag.value = true;
      initAudio();
    };

    const clickPlay = (noise) => {
      noise.click();
    };

    const reset = () => {
      $q.dialog({
        title: "重置",
        message: "是否重置所有设置？",
        cancel: true,
        persistent: true,
        seamless: true,
      })
        .onOk(() => {
          settings.init();
        })
        .onCancel(() => {})
        .onDismiss(() => {});
    };

    watch(settings.background, (flag) => {
      pauseAll();
      if (flag) {
        noises.source = backgroundNoises;
      } else {
        noises.source = seamlessNoises;
      }
      initAudio();
      settings.save();
    });

    return {
      noises,
      bgcolorMap,
      volcolorMap,
      loaded,
      clickScreen,
      settings,
      initFlag,
      clickPlay,
      reset,
    };
  },
};
</script>

<style lang="scss" scoped>
.tip {
  background: none;
  backdrop-filter: blur(5px);
}

.mainlayout_android .tip {
  background: rgba(107, 107, 107, 0.7);
}

.controll {
  max-width: 800px;
}
</style>
