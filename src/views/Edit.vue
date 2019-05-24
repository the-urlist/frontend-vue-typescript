<template>
  <div class="container content">
    <div class="section">
      <new-link @onAddNewLink="addLink"></new-link>
    </div>
    <div class="flex is-vertically-centered">
      <h2 class="has-text-primary">Links</h2>
      <span class="is-aligned-right">Drag each link to re-arrange</span>
    </div>
    <link-list :links="currentList.links" :editable="true"></link-list>
    <button
      v-if="currentList.links.length > 0 && listIsPublished"
      class="delete-button button is-color-danger has-text-white"
      @click="deleteList"
    >
      Delete This List
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { validationMixin } from "vuelidate";
import { required, url, helpers } from "vuelidate/lib/validators";
import LinkList from "@/components/LinkList.vue";
import NewLink from "@/components/NewLink.vue";
import ModalDelete from "@/components/ModalDelete.vue";

/* eslint-disable */
const customURL = helpers.regex(
  "customURL",
  /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
);
/* eslint-enable */

@Component({
  mixins: [validationMixin],
  validations: {
    newLink: {
      required,
      customURL
    }
  },
  components: {
    LinkList,
    NewLink
  }
})
export default class extends Vue {
  newLink: string = "";

  get currentList() {
    return this.$store.getters.currentList;
  }

  get listIsPublished() {
    return this.$store.getters.listIsPublished;
  }

  addLink(url: string) {
    this.$store.dispatch("newLink", url);
    this.newLink = "";
  }

  deleteList() {
    this.$modal.show(
      ModalDelete,
      {
        vanityUrl: this.currentList.vanityUrl
      },
      {
        width: "60%",
        adaptive: true,
        minWidth: 300,
        maxWidth: 500
      }
    );
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.add-links {
  margin-top: 100px;
}

.delete-button {
  width: 100%;
}
</style>
