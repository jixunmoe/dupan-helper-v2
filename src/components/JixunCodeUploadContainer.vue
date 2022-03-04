<template>
  <jixun-code-upload-dialog
    v-if="showCodeUploadDialog"
    @hide="showCodeUploadDialog = false"
  />
</template>

<script lang="ts">
import Vue from "vue";
import { bus } from "../EventBus";
import { EVENTS } from "../constants";
import JixunCodeUploadDialog from "./JixunCodeUploadDialog.vue";

export default Vue.extend({
  components: { JixunCodeUploadDialog },
  beforeDestroy: function () {
    bus.off(EVENTS.SHOW_CODE_UPLOAD_DIALOG, this.renderCodeUploadDialog);
  },

  mounted: function () {
    bus.on(EVENTS.SHOW_CODE_UPLOAD_DIALOG, this.renderCodeUploadDialog);
  },

  data: function () {
    return {
      showCodeUploadDialog: false,
    };
  },

  methods: {
    renderCodeUploadDialog: function () {
      this.showCodeUploadDialog = true;
    },
  },
});
</script>
