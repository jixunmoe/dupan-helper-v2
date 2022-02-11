<template>
  <a class="nd-upload-button upload-wrapper jx-upload-button">
    <u-button
      v-on:click="handleClick"
      class="nd-file-list-toolbar-action-item"
      v-bind:class="{ 'is-has-icon': conf.icon }"
      size="small"
      round=""
      type="primary"
      v-bind:icon="'u-icon ' + conf.icon"
    >
      {{ conf.text }}
    </u-button>
  </a>
</template>

<script>
export default {
  props: {
    conf: {
      type: Object,
      default: function () {},
    },
  },
  methods: {
    handleClick: function () {
      // $bus.emit('showDemoDialog');
      alert("click!");
    },
  },
};
</script>

<style lang="postcss">
  a.jx-upload-button {
    margin-left: 0.5em;

    > button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      
      background-color: #AC13F2;
      border: 1px solid #EEABF4;

      transition: all 0.3s;

      &:hover, &:focus {
        background-color: #890FC2;
        border-color: #EEABF4;
      }
    }
  }
</style>
