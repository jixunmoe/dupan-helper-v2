<template>
  <section class="jx-compact-form-items">
    <el-table :data="data" :height="height" :stripe="true" size="small">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-form label-position="left" size="small">
            <jixun-du-parse-entry-form-items :data="scope.row" />
          </el-form>
        </template>
      </el-table-column>

      <el-table-column prop="name" label="文件名">
        <template slot-scope="scope">
          <code>{{ scope.row.name }}</code>
        </template>
      </el-table-column>

      <el-table-column prop="size" label="大小" width="110">
        <template slot-scope="scope">
          <code>{{ readableSize(scope.row.size) }}</code>
        </template>
      </el-table-column>
    </el-table>
  </section>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { DuParseEntry } from "../utils/DuParser";
import readableSize from "../utils/readableSize";
import JixunDuParseEntryFormItems from "./JixunDuParseEntryFormItems.vue";

export default Vue.extend({
  components: { JixunDuParseEntryFormItems },
  props: {
    data: {
      type: Array as PropType<DuParseEntry[]>,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
  },
  methods: {
    readableSize,
  },
});
</script>
