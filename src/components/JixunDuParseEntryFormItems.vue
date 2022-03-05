<template>
  <div>
    <el-form-item label="文件名">
      <code>{{ data.name }}</code>
    </el-form-item>
    <el-form-item label="文件大小">
      <code>{{ readableSize(data.size) }}</code>
    </el-form-item>
    <el-form-item label="文件 MD5">
      <code>{{ data.md5 }}</code>
    </el-form-item>
    <el-form-item label="首片 MD5">
      <code>{{ data.md5s }}</code>
    </el-form-item>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { DuParseEntry } from "../utils/DuParser";
import readableSize from "../utils/readableSize";

export default Vue.extend({
  props: {
    data: {
      type: Object as PropType<DuParseEntry>,
    },
  },
  methods: {
    readableSize,
  },
});
</script>
