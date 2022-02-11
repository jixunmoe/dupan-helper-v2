import Component1 from './components/Component1.vue';
import JixunCodeUploadButton from './components/JixunCodeUploadButton.vue';
import { registerVueComponent } from './external/vue';

export function registerComponents(require) {
  registerVueComponent('Component1', Component1);
  registerVueComponent('JixunCodeUploadButton', JixunCodeUploadButton);
}
