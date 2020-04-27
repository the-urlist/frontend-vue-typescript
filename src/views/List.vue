<template>
  <div class="container">
    <div class="section">
      <div v-if="!notFound">
        <h2
          class="is-size-3 is-heading has-text-weight-medium has-text-primary"
        >
          {{ currentList.description }}
        </h2>
        <div class="columns is-mobile">
          <div class="column is-half">
            <div
              id="share"
              v-if="currentList.links.length > 0"
              class="buttons has-addons"
            >
              <a
                class="button"
                target="_blank"
                :href="
                  `https://twitter.com/intent/tweet?text=${
                    currentList.description
                  } theurlist.com/${currentList.vanityUrl}`
                "
              >
                <span class="icon"><i class="fab fa-twitter"></i></span>
              </a>
              <a
                class="button"
                target="_blank"
                :href="
                  `https://www.facebook.com/sharer/sharer.php?u=theurlist.com/${
                    currentList.vanityUrl
                  }`
                "
              >
                <span class="icon"><i class="fab fa-facebook-f"></i></span>
              </a>
              <a
                class="button"
                target="_blank"
                :href="
                  `https://www.linkedin.com/shareArticle?mini=true?summary=${
                    currentList.description
                  }&url=https://theurlist.com?${currentList.vanityUrl}`
                "
              >
                <span class="icon"><i class="fab fa-linkedin-in"></i></span>
              </a>
            </div>
          </div>
          <div class="column is-half">
            <div
              id="view"
              v-if="currentList.links.length > 0"
              class="buttons has-addons is-pulled-right"
            >
              <button
                title="View as List"
                class="button"
                :class="{ 'is-active': !qr }"
                @click="toggleQr(false)"
              >
                <span class="icon"><i class="fas fa-list-ul"></i></span>
              </button>

              <button
                title="View as QR Code"
                class="button"
                :class="{ 'is-active': qr }"
                @click="toggleQr(true)"
              >
                <span class="icon"><i class="fas fa-qrcode"></i></span>
              </button>
            </div>
          </div>
        </div>
        <br />
        <link-list
          :links="currentList.links"
          :editable="false"
          v-if="!qr"
        ></link-list>
        <div class="has-text-centered" v-else>
          <qr-code :value="`https://theurlist.com/${this.vanityUrl}`"></qr-code>
        </div>
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
import QrCode from "@/components/QrCode.vue";

@Component({
  components: {
    LinkList,
    NotFound,
    QrCode
  }
})
export default class List extends Vue {
  notFound: boolean = false;
  vanityUrl: string = "";
  qr: boolean = false;

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

  toggleQr(flag: boolean) {
    this.qr = flag;
  }
}
</script>

<style lang="scss" scoped>
#notFound {
  margin-top: -100px;
}
</style>
