<template>
  <span>{{ text }} (错误码 {{ errno }})</span>
</template>

<script lang="ts">
import Vue from "vue";
import {
  baiduContext,
  baiduGlobals,
  BAIDU_GLOBALS_KEY,
} from "../external/baidu";

export default Vue.extend({
  props: {
    errno: Number,
  },

  data() {
    return {
      text: "",
    };
  },

  async created() {
    const globals = await baiduGlobals.get();
    const ctx = await baiduContext.get();

    let message = globals[BAIDU_GLOBALS_KEY.ERROR_MESSAGES][this.errno];
    if (!message) {
      message = `未知错误`;
    } else if (typeof message === "function") {
      message = message(ctx.ctx.userInfo);
    }

    this.text = message.replace(/<\/?.*?>/g, "").replace(/\s+/, " ");
  },
});
</script>
