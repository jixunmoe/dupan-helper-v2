<template>
  <section class="jx-compact-form-items">
    <el-table :data="data" :height="height" :stripe="true" size="small">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-form label-position="left" size="small">
            <el-form-item label="文件名">
              <code>{{ scope.row.name }}</code>
            </el-form-item>
            <el-form-item label="文件大小">
              <code>{{ readableSize(scope.row.size) }}</code>
            </el-form-item>
            <el-form-item label="文件 MD5">
              <code>{{ scope.row.md5 }}</code>
            </el-form-item>
            <el-form-item label="首片 MD5">
              <code>{{ scope.row.md5s }}</code>
            </el-form-item>
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

export default Vue.extend({
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

<style lang="postcss">
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
