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
              @input="validateLinks"
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

      <section class="jx-compact-form-items">
        <u-table
          :data="previewResults"
          height="250"
          :stripe="true"
          size="small"
        >
          <u-table-column type="expand">
            <template slot-scope="scope">
              <u-form label-position="left" size="small">
                <u-form-item label="文件名">
                  <code>{{ scope.row.name }}</code>
                </u-form-item>
                <u-form-item label="文件大小">
                  <code>{{ readableSize(scope.row.size) }}</code>
                </u-form-item>
                <u-form-item label="文件 MD5">
                  <code>{{ scope.row.md5 }}</code>
                </u-form-item>
                <u-form-item label="首片 MD5">
                  <code>{{ scope.row.md5s }}</code>
                </u-form-item>
              </u-form>
            </template>
          </u-table-column>

          <u-table-column prop="name" label="文件名">
            <template slot-scope="scope">
              <code>{{ scope.row.name }}</code>
            </template>
          </u-table-column>

          <u-table-column prop="size" label="大小" width="110">
            <template slot-scope="scope">
              <code>{{ readableSize(scope.row.size) }}</code>
            </template>
          </u-table-column>
        </u-table>
      </section>

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
import { DuParser, DuParseEntry } from "../utils/DuParser";
import debounce from "lodash/debounce";
import readableSize from "../utils/readableSize";
import { bus } from "../EventBus";

export default Vue.extend({
  data() {
    return {
      parser: new DuParser(),
      ondup: "newcopy",
      radioOverwrite: 1111,
      links: "",
      previewResults: <DuParseEntry[]>[],
    };
  },

  created: function () {
    this.validateLinks = debounce(this.validateLinks);
  },

  methods: {
    readableSize,
    updateVisible: function (visible: boolean) {
      if (!visible) {
        this.$emit("hide");
      }
    },

    handleAddURL: function () {
      const results = this.parseLinks();
      if (results.length > 0) {
        bus.emit("add_rapid_upload", results);
      }
      this.$emit("hide");
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

  label {
    > span {
      cursor: pointer;
    }
  }
}

.jx-compact-form-items {
  .u-form-item {
    margin-bottom: 0;
  }
  .u-form-item__label {
    font-family: sans-serif;
    width: 7em;
    text-align: right;
    user-select: none;

    &,
    & + div {
      line-height: 1.25em;
    }

    + div {
      overflow: hidden;
    }
  }
}
</style>
