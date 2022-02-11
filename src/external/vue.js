let Vue;

/**
 * @type Map<string, never>
 */
const componentRegistry = new Map();

export function registerVueComponent(name, component) {
  componentRegistry.set(name, component);
  if (Vue) {
    Vue.component(name, component);
  }
}

export function registerVue(VueExports) {
  Vue = VueExports;
  for(const [name, component] of componentRegistry) {
    Vue.component(name, component);
  }
}
