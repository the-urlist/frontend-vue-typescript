// references.d.ts
/**
 * Extends interfaces in Vue.js
 */

import Vue, { ComponentOptions } from "vue";

declare module "vue/types/options" {
  interface ComponentOptions<V extends Vue> {
    SlickList?: string;
    SlickItem?: string;
  }
}

declare global {
  const appInsights: any;
}
