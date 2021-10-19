<template>
  <q-layout
    view="HHh LpR Lff"
    class="mainlayout overflow-hidden"
    :class="isAndroid ? 'mainlayout_android' : ''"
  >
    <canvas id="sky" ref="bg"></canvas>
    <layout-header v-model:left="left" />
    <layout-drawer :left="left" />
    <q-page-container>
      <router-view />
    </q-page-container>
    <layout-footer />
  </q-layout>
</template>

<script>
import { ref, provide, onMounted } from "vue";
import LayoutHeader from "layouts/MainLayout/components/layout-header";
import LayoutDrawer from "layouts/MainLayout/components/layout-drawer";
import LayoutFooter from "layouts/MainLayout/components/layout-footer";
import { useQuasar } from "quasar";
export default {
  name: "MainLayout",
  components: {
    LayoutFooter,
    LayoutDrawer,
    LayoutHeader,
  },
  setup() {
    const $q = useQuasar();
    let left = ref(true);
    let bg = ref(null);
    provide("leftDrawer", ref(true));
    const isAndroid =
      navigator.userAgent.indexOf("Android") > -1 ||
      navigator.userAgent.indexOf("Adr") > -1;
    onMounted(() => {
      //get the canvas and conext and store in vars
      var canvas = bg.value;
      var ctx = canvas.getContext("2d");

      var getPixelRatio = function (context) {
        var backingStore =
          context.backingStorePixelRatio ||
          context.webkitBackingStorePixelRatio ||
          context.mozBackingStorePixelRatio ||
          context.msBackingStorePixelRatio ||
          context.oBackingStorePixelRatio ||
          context.backingStorePixelRatio ||
          1;
        return (window.devicePixelRatio || 1) / backingStore;
      };
      var ratio = getPixelRatio(ctx);
      var W = $q.screen.width;
      var H = $q.screen.height;

      var mf = (ratio * (W * H)) / 4000;

      canvas.width = W;
      canvas.height = H;

      canvas.style.width = canvas.width + "px";
      canvas.style.height = canvas.height + "px";

      canvas.width = canvas.width * ratio;
      canvas.height = canvas.height * ratio;

      W = canvas.width;
      H = canvas.height;

      var flakes = [];

      for (var i = 0; i < mf; i++) {
        flakes.push({
          x: Math.random() * W,
          y: Math.random() * H,
          r: Math.random() * ratio,
          d: (Math.random() / 5) * ratio + 0.3,
        });
      }

      function drawFlakes() {
        ctx.clearRect(0, 0, W, H);
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        for (var i = 0; i < mf; i++) {
          var f = flakes[i];
          ctx.moveTo(f.x, f.y);
          ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2, true);
        }
        ctx.fill();
        moveFlakes();
      }

      var angle = 0;

      function moveFlakes() {
        angle += 0.01;
        for (var i = 0; i < mf; i++) {
          var f = flakes[i];

          f.y -= Math.pow(f.d, 2) * 1;
          // f.x += Math.sin(angle) * 2;

          if (f.y <= 0) {
            flakes[i] = {
              x: Math.random() * W,
              y: H,
              r: f.r,
              d: f.d,
            };
          }
        }
      }

      setInterval(drawFlakes, 25);
    });

    return { left, bg, isAndroid };
  },
};
</script>

<style lang="scss">
#sky {
  position: absolute;
}
.white-bg {
  background: linear-gradient(145deg, #4071a1 20%, #e4b04f 70%);
}
</style>
