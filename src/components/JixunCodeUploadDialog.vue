<template>
  <div class="nd-dialog-common">
    <el-dialog
      title="标准提取码"
      class="u-dialog__wrapper nd-dialog-common-header"
      width="600px"
      :lockScroll="false"
      :visible="true"
      v-if="showForm"
      v-on:update:visible="updateVisible"
    >
      <div class="jx-dialog">
        <section>
          <label>
            <span>秒传链接，一行一个：</span>
            <el-input
              type="textarea"
              :rows="5"
              placeholder="请输入内容"
              v-model="links"
              @input="validateLinks"
            >
            </el-input>
          </label>
        </section>

        <p>
          <span>文件重复时：</span>
          <el-radio-group v-model="ondup" size="small">
            <el-radio-button :label="RAPID_UPLOAD_REPLACE.DUPLICATE">
              建立副本
            </el-radio-button>
            <el-radio-button :label="RAPID_UPLOAD_REPLACE.REPLACE">
              覆盖文件
            </el-radio-button>
          </el-radio-group>
        </p>

        <jixun-du-parse-table :data="previewResults" :height="180" />
      </div>

      <div slot="footer" class="jx-align-right">
        <jixun-button @click="updateVisible(false)">取消</jixun-button>
        <jixun-button
          primary
          @click="handleAddURL"
          :disabled="previewResults.length === 0"
        >
          确定
        </jixun-button>
      </div>
    </el-dialog>

    <el-dialog
      title="标准提取码 - 进行中"
      class="u-dialog__wrapper nd-dialog-common-header"
      width="600px"
      v-if="showProgress"
      :lockScroll="false"
      :visible="true"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <div class="jx-dialog">
        <el-progress :percentage="10" status="success"></el-progress>
        敬请期待…
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { DuParser, DuParseEntry } from "../utils/DuParser";
import debounce from "lodash/debounce";
import { RAPID_UPLOAD_REPLACE } from "../api/rapidupload";

export default Vue.extend({
  data() {
    return {
      RAPID_UPLOAD_REPLACE,
      showForm: true,
      showProgress: false,
      parser: new DuParser(),
      ondup: RAPID_UPLOAD_REPLACE.DUPLICATE,
      radioOverwrite: 1111,
      links: "",
      previewResults: <DuParseEntry[]>[],
    };
  },

  created: function () {
    this.validateLinks = debounce(this.validateLinks);
  },

  methods: {
    updateVisible: function (visible: boolean) {
      if (!visible) {
        this.$emit("hide");
      }
    },

    handleAddURL: function () {
      const results = this.parseLinks();
      if (results.length > 0) {
        // this.$emit("upload", results, this.ondup);
        this.showForm = false;
        this.showProgress = true;
      }
    },

    validateLinks: function () {
      this.previewResults = this.parseLinks();
    },

    parseLinks: function () {
      this.parser.parse(this.links);
      return this.parser.results;
    },
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

  p {
    padding-top: 0.55em;
  }

  label {
    > span {
      cursor: pointer;
    }
  }
}
</style>
