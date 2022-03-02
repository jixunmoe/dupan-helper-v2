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
        <section>
          <label>
            <span>秒传链接，一行一个：</span>
            <u-input
              type="textarea"
              :rows="5"
              placeholder="请输入内容"
              v-model="links"
            >
            </u-input>
          </label>
        </section>

        <br />

        <!-- 好像已经没了 -->
        <p v-if="false">
          <span>文件重复时：</span>
          <u-radio-group v-model="ondup" size="small">
            <u-radio-button label="newcopy">建立副本</u-radio-button>
            <u-radio-button label="overwrite">覆盖文件</u-radio-button>
          </u-radio-group>
        </p>
      </div>

      <div slot="footer" class="jx-align-right">
        <u-button
          @click="updateVisible(false)"
          size="medium"
          round
          nativeType="button"
        >
          取消
        </u-button>
        <u-button
          @click="handleAddURL"
          size="medium"
          round
          nativeType="button"
          type="primary"
        >
          确定
        </u-button>
      </div>
    </u-dialog>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      ondup: "newcopy",
      radioOverwrite: 1111,
      links: "",
    };
  },

  methods: {
    updateVisible: function (visible: boolean) {
      if (!visible) {
        this.$emit("hide");
      }
    },

    handleAddURL: function () {},
  },
});
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

  label {
    > span {
      cursor: pointer;
    }
  }
}
</style>
