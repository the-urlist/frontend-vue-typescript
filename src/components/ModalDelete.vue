<template>
  <div
    name="delete-list"
    width="60%"
    :adaptive="true"
    :max-width="500"
    :min-width="300"
  >
    <div class="modal">
      <div class="log flex flex-column">
        <a class="is-aligned-right" href="#" @click.prevent="$emit('close')">
          <img src="../assets/close.png" />
        </a>
        <div
          class="confirmation-details flex is-horizontally-centered is-vertically-centered flex-column"
        >
          <h1>Delete this list?</h1>
          <p>
            The url
            <span class="has-text-danger">{{ vanityUrl }}</span> will be
            released for others to use.
          </p>
        </div>
        <div class="confirmation-buttons flex is-horizontally-centered">
          <button
            :disabled="!canDelete"
            class="button is-color-danger has-text-white"
            @click="deleteList(vanityUrl)"
          >
            Yes, Delete It
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  props: {
    vanityUrl: {
      type: String
    }
  }
})
export default class Login extends Vue {
  canDelete() {
    this.$store.getters.appIsBusy;
  }

  async deleteList(vanityUrl: string) {
    try {
      await this.$store.dispatch("deleteList", vanityUrl);
      this.$emit("close");
      this.$router.push("/s/user");
    } catch (err) {
      // do something here
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.confirmation-buttons {
  margin-top: 30px;
}
</style>
