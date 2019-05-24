<template>
  <div
    class="container notification"
    :class="{ 'notification-show': show, 'notification-hide': !show }"
  >
    <div id="notifcation" class="notification is-warning notification-bottom">
      Make sure you enter a valid URL
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {
  message: string = "";
  show: boolean = false;

  showNotification(message: string) {
    this.message = message;
    this.show = true;

    setTimeout(() => {
      this.show = false;
    }, 3000);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.full-width {
  width: 100%;
  height: 100vh;
}

.notification {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  transition: margin 0.3s linear;
}

.notification-show {
  margin-top: 0px;
}

.notification-hide {
  margin-top: -60px;
}
</style>
