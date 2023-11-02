<template>
  <modal :isActive="isActive" @close="$emit('close')">
    <div class="columns is-gapless is-vcentered is-relative is-mobile">
      <div class="column">
        <h1 class="is-size-4 has-text-weight-medium is-pulled-right">
          Sign in to&nbsp;
        </h1>
      </div>
      <div class="column">
        <img width="100" class="is-pulled-left" src="../assets/logo.svg" />
      </div>
    </div>
    <a id="twitterButton" :href="twitterUrl" class="button is-large is-fullwidth has-text-white login-button">
      <span>
        <i id="twitterIcon" class="fab fa-twitter twitter-icon icon"></i>
        <span class="is-size-5 has-text-weight-medium">with Twitter</span>
      </span>
    </a>
    <a id="facebookButton" :href="facebookUrl" class="button is-large is-fullwidth has-text-white login-button">
      <span>
        <i id="facebookIcon" class="fab fa-facebook facebook-icon icon"></i>
        <span class="is-size-5 has-text-weight-medium">with Facebook</span>
      </span>
    </a>
    <br />
  </modal>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Modal from "@/components/Modal.vue";
import config from "../config";

@Component({
  components: { Modal },
  props: {
    isActive: Boolean,
  },
})
export default class ModalLogin extends Vue {
  isActive: boolean = false;

  get twitterUrl() {
    return config.AUTH_URL("twitter");
  }

  get facebookUrl() {
    return config.AUTH_URL("facebook");
  }
}
</script>

<style scoped lang="scss">
#twitterButton {
  background-color: #1cabe9;
}

#facebookButton {
  background-color: #3b5998;
}

.login-button {
  margin: 10px 0;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
