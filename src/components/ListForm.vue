<template>
  <div class="container main content">
    <new-link @onAddNewLink="addLink"></new-link>
    <div id="linkHeader" class="columns is-mobile is-vcentered is-gapless">
      <div class="column">
        <h3 class="has-text-primary is-size-3 has-text-weight-medium">
          Links
        </h3>
      </div>
      <div class="column">
        <span class="is-pulled-right">Drag links to re-order</span>
      </div>
    </div>
    <link-list :links="currentList.links" :editable="true"></link-list>
    <button
      id="deleteButton"
      v-if="currentList.links.length > 0 && listIsPublished"
      class="button is-large is-danger has-text-white is-fullwidth"
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
    // this.$modal.show(
    //   ModalDelete,
    //   {
    //     vanityUrl: this.currentList.vanityUrl
    //   },
    //   {
    //     width: "60%",
    //     adaptive: true,
    //     minWidth: 300,
    //     maxWidth: 500
    //   }
    // );
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#linkHeader {
  margin-top: 30px;
}

#deleteButton {
  margin-bottom: 20px;
}
</style>
