<template>
  <div class="has-background-white">
    <div class="container">
      <div class="section">
        <div class="columns">
          <div class="column">
            <div id="bannerText">
              <h1 class="is-size-3 has-text-weight-medium">
                <span class="has-text-primary">Group</span> links,
                <span class="has-text-primary">Save</span> &
                <span class="has-text-primary">Share</span> them with the world
              </h1>
              <br />
              <p>Add links to a list and share it with one simple URL.</p>
              <br />
              <p>
                Create a list anonymously or login to save, manage, and edit
                your lists.
              </p>
            </div>
          </div>
          <div class="column is-half is-hidden-mobile">
            <img src="@/assets/banner-logo-large.png" class="banner-image" />
          </div>
        </div>
      </div>
    </div>
    <div id="getStarted">
      <div id="homeBottomBackground"></div>
      <div id="homeBottom" class="container">
        <div class="section">
          <h2
            class="is-size-3 has-text-weight-bold has-text-primary has-text-centered"
          >
            Get Started
          </h2>
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
.banner-image {
  max-width: 500px;
  height: 100%;
  width: 100%;
}

#getStarted {
  overflow: hidden;
  position: relative;
  flex: 1;
}

#bannerText {
  padding-top: 20px;
}

#homeBottom {
  padding-top: 50px;
}

#homeBottomBackground {
  position: absolute;
  left: 0;
  right: -50%;
  margin-left: -25%;
  height: 100%;
  max-width: 150%;
  width: 150%;
  border-top-left-radius: 50%;
  border-top-right-radius: 50%;
  background-color: #f9fafc;
}
</style>
