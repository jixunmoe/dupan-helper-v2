<template>
  <section class="jx-compact-form-items">
    <el-table
      :data="data"
      :height="height"
      row-key="request_id"
      :stripe="true"
      size="small"
    >
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-form label-position="left" size="small">
            <jixun-du-parse-entry-form-items :data="scope.row" />
            <el-form-item label="上传结果">
              <jixun-baidu-error :errno="scope.row.errno" />
            </el-form-item>
            <el-form-item label="提取码">
              <pre>{{ toCode(scope.row) }}</pre>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>

      <el-table-column prop="name" label="文件名">
        <template slot-scope="scope">
          <code>{{ scope.row.name }}</code>
        </template>
      </el-table-column>

      <el-table-column prop="result" label="结果" width="80">
        <template slot-scope="scope">
          <el-tag :type="scope.row.resultType" effect="dark">
            {{ scope.row.result }}
          </el-tag>
        </template>
      </el-table-column>
    </el-table>
  </section>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { DuParseEntry } from "../utils/DuParser";
import { VueUploadResult } from "../types/VueUploadResults";
import readableSize from "../utils/readableSize";
import JixunBaiduError from "./JixunBaiduError.vue";
import JixunDuParseEntryFormItems from "./JixunDuParseEntryFormItems.vue";

export default Vue.extend({
  components: { JixunBaiduError, JixunDuParseEntryFormItems },
  props: {
    data: {
      type: [] as PropType<VueUploadResult[]>,
      required: true,
    },
  },
  methods: {
    readableSize,
    toCode(entry: DuParseEntry) {
      const { name, size, md5, md5s } = entry;
      return `${md5}#${md5s}#${size}#${name}`;
    },
  },
});
</script>

<style></style>
