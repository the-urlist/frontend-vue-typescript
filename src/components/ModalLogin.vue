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
    <a
      id="twitterButton"
      :href="loginUrl"
      class="button is-large is-fullwidth has-text-white"
    >
      <span>
        <i id="twitterIcon" class="fab fa-twitter twitter-icon"></i>
        <span class="is-size-5 has-text-weight-medium">with Twitter</span>
      </span>
    </a>
    <br />
    <p class="has-text-centered">
      Signing in is cool because you can view, edit and manage any lists that
      you create. It's nifty.
    </p>
  </modal>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Modal from "@/components/Modal.vue";
import config from "../config";

@Component({
  components: { Modal },
  props: {
    isActive: Boolean
  }
})
export default class ModalLogin extends Vue {
  isActive: boolean = false;

  get loginUrl() {
    return config.AUTH_URL("twitter");
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#twitterButton {
  background-color: #1cabe9;
}

#twitterIcon {
  margin-right: 20px;
}
</style>
