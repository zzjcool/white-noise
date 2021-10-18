<template>
  <q-footer class="foot-bg text-white print-hide">
    <q-toolbar class="column items-center justify-center">
      <div>
        本页面由<a href="https://github.com/zzjcool" target="_blank"><i>zzjcool</i></a
        >完成
      </div>
      <div>音频来源于互联网，如有疑问请联系email@zzj.cool</div>
    </q-toolbar>
  </q-footer>
</template>

<script>
export default {
  name: "LayoutFooter",
};
</script>

<style lang="scss">
.foot-bg {
  // background: linear-gradient(145deg, #3370ad 25%, #e4b04f 80%);
  // background: #94949428;
  background: none;
  // background-image: linear-gradient(#94949450, #000);
  // backdrop-filter: blur(5px);
}
</style>
