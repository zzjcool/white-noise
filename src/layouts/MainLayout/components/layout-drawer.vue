<template>
  <q-drawer
    class="print-hide draw-bg overflow-hidden"
    content-class="draw-bg overflow-hidden"
    :breakpoint="0"
    v-model="leftDrawer"
    :overlay="!screenGtMd"
    side="left"
  >
    <q-scroll-area class="fit">
      <div class="column q-pa-md">
        <div class="q-gutter-y-md">
          <!--        <div class="text-h5 text-weight-bold text-center">关于本页</div>-->
          <div class="row items-center">
            <div class="text-subtitle1 text-weight-bold text-white">技术栈:</div>
            <div>
              <q-chip color="light-green-6" text-color="white">Vue</q-chip>
              <q-chip color="light-green-6" text-color="white">Quasar</q-chip>
            </div>
          </div>
          <div class="row items-center">
            <div class="text-subtitle1 text-weight-bold text-white">项目地址:</div>
            <q-chip
              clickable
              color="light-green-9"
              text-color="white"
              icon="fab fa-github-alt"
              @click="openURL('https://github.com/zzjcool/white-noise')"
            >
              zzjcool/white-noise
            </q-chip>
          </div>
          <div></div>
        </div>
      </div>
    </q-scroll-area>
  </q-drawer>
</template>

<script>
import { openURL, useQuasar } from "quasar";
import { inject } from "vue";

export default {
  name: "LayoutDrawer",
  setup() {
    let leftDrawer = inject("leftDrawer");
    return { leftDrawer, screenGtMd: useQuasar().screen.gt.md, openURL };
  },
  methods: {
    print() {
      window.print();
    },
  },
};
</script>
<style lang="scss">
.mainlayout .q-drawer {
  // background: linear-gradient(145deg, #3370ad 25%, #e4b04f 80%);
  background: none;
  backdrop-filter: blur(5px);
}
</style>
