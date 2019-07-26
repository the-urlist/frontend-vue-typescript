<template>
  <div>
    <div class="progress-bar">
      <progress-bar></progress-bar>
    </div>
    <nav-bar></nav-bar>
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import NavBar from "@/components/NavBar.vue";
import ProgressBar from "@/components/ProgressBar.vue";

@Component({
  components: {
    NavBar,
    ProgressBar
  }
})
export default class List extends Vue {
  authUrl: string = process.env.VUE_APP_AUTH_URL;
}
</script>

<style scoped lang="scss">
.progress-bar {
  height: 6px;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 9999;
}
</style>
