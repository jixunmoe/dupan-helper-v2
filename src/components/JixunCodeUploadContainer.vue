<template>
  <jixun-code-upload-dialog v-if="show" v-on:hide="show = false" />
</template>

<script>
import { bus } from "../EventBus";
import { EVENTS } from "../constants";
import JixunCodeUploadDialog from "./JixunCodeUploadDialog.vue";

export default {
  components: { JixunCodeUploadDialog },
  beforeDestroy: function () {
    bus.off(EVENTS.SHOW_CODE_UPLOAD_DIALOG, this.showCodeUploadDialog);
  },

  mounted: function () {
    bus.on(EVENTS.SHOW_CODE_UPLOAD_DIALOG, this.showCodeUploadDialog);
  },

  data: function () {
    return {
      show: false,
    };
  },

  methods: {
    showCodeUploadDialog: function () {
      this.show = true;
    },
  },
};
</script>
