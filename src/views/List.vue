<template>
  <div class="container">
    <div class="section">
      <div v-if="!notFound">
        <h2
          class="is-size-3 is-heading has-text-weight-medium has-text-primary"
        >
          {{ currentList.description }}
        </h2>
        <link-list :links="currentList.links" :editable="false"></link-list>
      </div>
      <div v-if="vanityUrl.length > 0">
        <not-found
          id="notFound"
          v-if="notFound"
          :vanityUrl="vanityUrl"
        ></not-found>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import LinkList from "@/components/LinkList.vue";
import NotFound from "@/components/NotFound.vue";

@Component({
  components: {
    LinkList,
    NotFound
  }
})
export default class List extends Vue {
  notFound: boolean = false;
  vanityUrl: string = "";

  get currentList() {
    return this.$store.getters.currentList;
  }

  get listIsPublished() {
    return this.$store.getters.listIsPublished;
  }

  async created() {
    // get the list from the db based on the url id
    this.vanityUrl = this.$route.params.id;

    try {
      // get the list for this vanityUrl
      if (!this.listIsPublished)
        await this.$store.dispatch("getList", this.vanityUrl);
    } catch (err) {
      this.notFound = true;
    }
  }
}
</script>

<style lang="scss" scoped>
#notFound {
  margin-top: -100px;
}
</style>

