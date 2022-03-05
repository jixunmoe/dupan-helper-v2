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
      :title="`标准提取码 - ${rapidUploadFinished ? '完成' : '进行中'}`"
      class="u-dialog__wrapper nd-dialog-common-header"
      width="600px"
      v-if="showProgress"
      v-on:update:visible="updateVisible"
      :lockScroll="false"
      :visible="true"
      :show-close="rapidUploadFinished"
      :close-on-click-modal="rapidUploadFinished"
      :close-on-press-escape="rapidUploadFinished"
    >
      <div class="jx-dialog">
        <el-progress :percentage="progress" status="success"></el-progress>
        <jixun-upload-result-table :data="uploadResults" :height="180" />
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { DuParser, DuParseEntry } from "../utils/DuParser";
import { RapidUploadResp, RAPID_UPLOAD_REPLACE } from "../api/rapidupload";
import { bus } from "../EventBus";
import { EVENTS } from "../constants";
import { VueUploadResult } from "../types/VueUploadResults";
import JixunUploadResultTable from "./JixunUploadResultTable.vue";

export default Vue.extend({
  components: { JixunUploadResultTable },
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
      parsedLinks: <DuParseEntry[]>[],
      uploadResults: <VueUploadResult[]>[],
    };
  },

  computed: {
    progress(): number {
      if (this.rapidUploadFinished) {
        return 100;
      }

      return (this.uploadResults.length / this.parsedLinks.length) * 100;
    },

    rapidUploadFinished(): boolean {
      return this.uploadResults.length === this.parsedLinks.length;
    },
  },

  methods: {
    updateVisible(visible: boolean) {
      if (!visible) {
        this.$emit("hide");
      }
    },

    handleAddURL() {
      const results = this.parseLinks();
      if (results.length > 0) {
        this.showForm = false;
        this.resetProgress(results);
        this.showProgress = true;
        this.beginUpload();
      }
    },

    resetProgress(parsedLinks: DuParseEntry[]) {
      this.uploadResults = [];
      this.parsedLinks = parsedLinks;
    },

    beginUpload() {
      bus.emit(
        EVENTS.ADD_RAPID_UPLOAD_TASKS,
        this.parsedLinks,
        this.ondup,
        this.updateProgress
      );
    },

    updateProgress(entry: DuParseEntry, resp: RapidUploadResp) {
      const success = resp.errno === 0;
      this.uploadResults.unshift({
        ...entry,
        ...resp,
        result: success ? "成功" : "失败",
        resultType: success ? "success" : "danger",
      });
    },

    validateLinks() {
      this.previewResults = this.parseLinks();
    },

    parseLinks() {
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
