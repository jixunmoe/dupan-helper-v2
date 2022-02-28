<template>
  <div class="nd-dialog-common">
    <u-dialog
      class="u-dialog__wrapper nd-dialog-common-header"
      title="标准提取码"
      width="600px"
      v-bind:lockScroll="false"
      v-bind:visible="true"
      v-bind:show="true"
      v-on:update:visible="updateVisible"
    >
      <div class="jx-dialog">
        <p>
          <label>
            <span>秒传链接，一行一个</span>
            <textarea v-model="links"></textarea>
          </label>
        </p>
      </div>

      <template v-slot:footer>
        <div class="jx-align-right">
          <u-button
            v-on:click="handleAddURL"
            size="medium"
            round
            nativeType="button"
            type="primary"
          >
            确定
          </u-button>
        </div>
      </template>
    </u-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      links: "",
    };
  },

  methods: {
    updateVisible: function (visible) {
      if (!visible) {
        this.$emit("hide");
      }
    },
  },
};
</script>

<style lang="postcss">
.jx-dialog {
  margin-top: 24px;
  color: #424e67;

  textarea {
    width: 100%;
    min-height: 10em;
    border: 1px solid #ccc;
  }
}
</style>
