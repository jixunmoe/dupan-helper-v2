import { Component as VueComponent } from "vue";
import DelayedValue from "../utils/DelayedValue";

export interface VueComponentShim extends Record<string, unknown> {
  computed?: Record<string, unknown>;
  mixins?: VueComponentShim[];
  methods?: Record<string, Function>;
  created?: Function;
}

export interface VueShimType {
  component(name: string, component: VueComponentShim | VueComponent): void;
  config: Record<string, any>;
}

export const Vue = new DelayedValue<VueShimType>();

export function registerVueComponent(
  name: string,
  component: VueComponentShim
) {
  Vue.get((Vue) => Vue.component(name, component));
}
