import Component1 from "./components/Component1.vue";
import JixunCodeUploadButton from "./components/JixunCodeUploadButton.vue";
import JixunCodeUploadContainer from "./components/JixunCodeUploadContainer.vue";
import JixunCodeUploadDialog from "./components/JixunCodeUploadDialog.vue";
import { registerVueComponent } from "./external/vue";

export function registerComponents(require) {
  registerVueComponent("Component1", Component1);
  registerVueComponent("JixunCodeUploadButton", JixunCodeUploadButton);
  registerVueComponent("JixunCodeUploadContainer", JixunCodeUploadContainer);
  registerVueComponent("JixunCodeUploadDialog", JixunCodeUploadDialog);
}
