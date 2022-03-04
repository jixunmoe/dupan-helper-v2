import JixunButton from "./components/JixunButton.vue";
import JixunCodeUploadButton from "./components/JixunCodeUploadButton.vue";
import JixunCodeUploadContainer from "./components/JixunCodeUploadContainer.vue";
import JixunCodeUploadDialog from "./components/JixunCodeUploadDialog.vue";
import JixunDuParseTable from "./components/JixunDuParseTable.vue";
import { VueShimType } from "./external/vue";
import { WebpackRequire } from "./webpack";

/**
 * Register available components.
 * @param Vue
 * @param require
 */
export function registerComponents(Vue: VueShimType, require: WebpackRequire) {
  Vue.component("JixunButton", JixunButton);
  Vue.component("JixunCodeUploadButton", JixunCodeUploadButton);
  Vue.component("JixunCodeUploadContainer", JixunCodeUploadContainer);
  Vue.component("JixunCodeUploadDialog", JixunCodeUploadDialog);
  Vue.component("JixunDuParseTable", JixunDuParseTable);
}
