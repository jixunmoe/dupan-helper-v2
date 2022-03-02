import JixunCodeUploadButton from "./components/JixunCodeUploadButton.vue";
import JixunCodeUploadContainer from "./components/JixunCodeUploadContainer.vue";
import JixunCodeUploadDialog from "./components/JixunCodeUploadDialog.vue";

/**
 * Register available components.
 * @param {import('./external/vue').VueShimType} Vue
 * @param {import('./webpack').WebpackRequire} require
 */
export function registerComponents(Vue, require) {
  Vue.component("JixunCodeUploadButton", JixunCodeUploadButton);
  Vue.component("JixunCodeUploadContainer", JixunCodeUploadContainer);
  Vue.component("JixunCodeUploadDialog", JixunCodeUploadDialog);
}
