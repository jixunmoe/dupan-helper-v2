<template>
  <el-button
    v-on="$listeners"
    size="medium"
    round
    nativeType="button"
    :disabled="disabled"
    :type="primary ? 'primary' : ''"
  >
    <slot />
  </el-button>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    primary: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
});
</script>
