<template>
  <div class="flex flex-column main">
    <div class="container">
      <div class="section">
        <div class="columns is-mobile">
          <div class="column is-half">
            <div class="app-header">
              <h1>
                <span class="has-text-primary">Group</span> links,
                <span class="has-text-primary">Save</span> &
                <span class="has-text-primary">Share</span> them with the world!
              </h1>
              <p>
                Add links to a list and share it with one simple URL
              </p>
              <br />
              <p>Create a list anonymously, or login to save, manage and edit your lists</p>
            </div>
          </div>
          <div class="column is-half is-hidden-mobile">
            <img src="@/assets/banner-logo-large.png" class="banner-image" />
          </div>
        </div>
      </div>
    </div>
    <div class="flex landing-footer is-horizontally-centered">
      <div class="home-bottom-background"></div>
      <div class="container home-bottom">
        <div class="section">
          <div class="flex is-horizontally-centered">
            <h2 class="has-text-primary">Get Started</h2>
          </div>
          <new-link @onAddNewLink="addLink"></new-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import NewLink from "@/components/NewLink.vue";

@Component({
  components: {
    NewLink
  }
})
export default class Home extends Vue {
  // event emitted by the AddBar component
  addLink(url: string) {
    this.$store.dispatch("newLink", url);
    this.$router.push("s/edit");
  }
}
</script>

<style lang="scss">
.main {
  background-color: #fff;
}

.banner-image {
  max-width: 500px;
  height: 100%;
  width: 100%;
}

.landing-footer {
  overflow: hidden;
  position: relative;
  flex: 1;
}

.home-bottom {
  width: 100%;
}

.home-bottom-background {
  position: absolute;
  left: 0;
  right: -25%;
  margin-left: -25%;
  height: 100%;
  max-width: 150%;
  width: 150%;
  border-top-left-radius: 50%;
  border-top-right-radius: 50%;
  background-color: #f9fafc;
}

.footer {
  > img {
    width: 100%;
    height: 100%;
  }
}

@media only screen and (max-width: 1000px) {
  .app-header {
    text-align: center;
  }
}
</style>
