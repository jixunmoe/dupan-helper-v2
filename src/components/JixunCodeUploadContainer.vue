<template>
  <JixunCodeUploadDialog v-if="show" v-on:hide="show = false" />
</template>

<script>
import { bus } from "../EventBus";
import { EVENTS } from "../constants";

export default {
  beforeDestroy: function () {
    bus.off(EVENTS.SHOW_CODE_UPLOAD_DIALOG, this.showCodeUploadDialog);
  },

  mounted: function () {
    console.info("register event");
    bus.on(EVENTS.SHOW_CODE_UPLOAD_DIALOG, this.showCodeUploadDialog);
  },

  data: function () {
    return {
      show: false,
    };
  },

  methods: {
    showCodeUploadDialog: function () {
      console.info("set show = true");
      this.show = true;
    },
  },
};
</script>
