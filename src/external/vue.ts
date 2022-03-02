import DelayedValue from "../utils/DelayedValue";

export type VueComponent = any;

export interface VueShimType {
  component(name: string, component: VueComponent);
  config: Record<string, any>;
}

export const Vue = new DelayedValue<VueShimType>();

export function registerVueComponent(name, component) {
  Vue.get((Vue) => Vue.component(name, component));
}
