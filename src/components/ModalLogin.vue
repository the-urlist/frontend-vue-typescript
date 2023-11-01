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
    <a id="twitterButton" :href="loginUrl" class="button is-large is-fullwidth has-text-white social-button">
      <span>
        <i id="twitterIcon" class="fab fa-twitter twitter-icon icon"></i>
        <span class="is-size-5 has-text-weight-medium">with Twitter</span>
      </span>
    </a>
    <a id="facebookButton" :href="facebookUrl" class="button is-large is-fullwidth has-text-white social-button">
      <span>
        <i id="facebookIcon" class="fab fa-facebook-f facebook-icon icon"></i>
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.social-button {
  margin-bottom: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

#twitterButton {
  background-color: #1cabe9;
}

#facebookButton {
  background-color: #3b5998;
}

.icon {
  margin-right: 8px;
}
</style>
