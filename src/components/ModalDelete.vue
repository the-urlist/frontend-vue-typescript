<template>
  <modal :isActive="isActive" @close="$emit('close')">
    <h4 class="is-size-4 has-text-weight-normal">Delete this list?</h4>
    <br />
    <p>
      The url
      <span class="has-text-danger">{{ currentList.vanityUrl }}</span> will be
      released for others to use.
    </p>
    <br />
    <button
      :disabled="!canDelete"
      class="button is-danger is-large is-fullwidth has-text-white"
      @click="deleteList"
    >
      Yes, Delete It
    </button>
  </modal>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Modal from "@/components/Modal.vue";

@Component({
  props: {
    isActive: {
      type: Boolean
    }
  },
  components: { Modal }
})
export default class Login extends Vue {
  get currentList() {
    return this.$store.getters.currentList;
  }

  canDelete() {
    this.$store.getters.appIsBusy;
  }

  async deleteList(vanityUrl: string) {
    try {
      await this.$store.dispatch("deleteList", this.currentList.vanityUrl);
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
