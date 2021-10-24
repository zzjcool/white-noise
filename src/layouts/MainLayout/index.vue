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

    let drawTime = null;
    const draw = () => {
      let canvas = bg.value;
      let ctx = canvas.getContext("2d");

      let getPixelRatio = function (context) {
        let backingStore =
          context.backingStorePixelRatio ||
          context.webkitBackingStorePixelRatio ||
          context.mozBackingStorePixelRatio ||
          context.msBackingStorePixelRatio ||
          context.oBackingStorePixelRatio ||
          context.backingStorePixelRatio ||
          1;
        return (window.devicePixelRatio || 1) / backingStore;
      };
      let ratio = getPixelRatio(ctx);

      let W = window.screen.availWidth;
      let H = window.screen.availHeight;

      let mf = (ratio * (W * H)) / 4000;

      canvas.width = W;
      canvas.height = H;

      canvas.style.width = canvas.width + "px";
      canvas.style.height = canvas.height + "px";

      canvas.width = canvas.width * ratio;
      canvas.height = canvas.height * ratio;

      W = canvas.width;
      H = canvas.height;

      let flakes = [];

      for (let i = 0; i < mf; i++) {
        flakes.push({
          x: Math.random() * W,
          y: Math.random() * H,
          r: Math.random() * ratio,
          d: (Math.random() / 5) * ratio + 0.3,
        });
      }

      function drawFlakes() {
        ctx.clearRect(0, 0, W, H);

        let grd = ctx.createLinearGradient(0, 0, 0, H);
        grd.addColorStop(0, "#000000");
        grd.addColorStop(0.25, "#3d3d3d");
        grd.addColorStop(0.5, "#2d2d2d");
        grd.addColorStop(1, "#000000");

        // 填充渐变
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, W, H);

        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        for (let i = 0; i < mf; i++) {
          let f = flakes[i];
          ctx.moveTo(f.x, f.y);
          ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2, true);
        }
        ctx.fill();
        moveFlakes();
      }

      var angle = 0;

      function moveFlakes() {
        angle += 0.01;
        for (let i = 0; i < mf; i++) {
          let f = flakes[i];

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
      if (drawTime !== null) {
        clearInterval(drawTime);
      }
      drawTime = setInterval(drawFlakes, 25);
    };
    onMounted(draw);
    onresize = draw;
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
