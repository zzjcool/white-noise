<template>
  <q-header class="header text-white print-hide" height-hint="98">
    <q-toolbar class="row justify-between">
      <q-btn
        dense
        flat
        round
        :icon="leftDrawer ? 'format_indent_decrease' : 'format_indent_increase'"
        class="col-auto"
        @click="click"
      />
      <q-toolbar-title class="col-auto">
        白噪
        <q-avatar>
          <img src="~assets/head.png" alt="头像" />
        </q-avatar>
      </q-toolbar-title>
    </q-toolbar>

    <q-tabs
      class="a4-container q-tabs__content--align-justify"
      inline-label
      align="justify"
      @update:modelValue="jump"
    >
      <q-tab name="zhihu" icon="fab fa-zhihu">
        <q-tooltip>
          {{ link.zhihu }}
        </q-tooltip>
      </q-tab>
      <q-tab name="github" icon="fab fa-github">
        <q-tooltip>
          {{ link.github }}
        </q-tooltip>
      </q-tab>
    </q-tabs>
  </q-header>
</template>

<script>
import { openURL, useQuasar } from "quasar";
import { inject } from "vue";
export default {
  name: "LayoutHeader",

  setup() {
    const $q = useQuasar();
    const link = {
      homePage: "https://zzj.cool",
      zhihu: "https://www.zhihu.com/people/toi-toi-toi",
      github: "https://github.com/zzjcool",
    };
    let leftDrawer = inject("leftDrawer");
    if ($q.screen.gt.md) {
      leftDrawer.value = true;
    } else {
      leftDrawer.value = false;
    }

    const jump = (name) => {
      openURL(link[name]);
    };

    const click = () => {
      leftDrawer.value = !leftDrawer.value;
    };
    return { leftDrawer, jump, click, link, openURL };
  },
};
</script>

<style lang="scss" scoped>
.header {
  background: none;
  background-image: linear-gradient(#000, #00000000);

  backdrop-filter: blur(2px);
}

.mainlayout_android .header {
  background: rgba(61, 61, 61, 0.7) ;
}
</style>
