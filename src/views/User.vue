<template>
  <div class="big-container">
    <h2 class="has-text-primary">My Collections</h2>
    <div class="columns is-mobile">
      <div
        class="column is-one-quarter-widescreen is-one-third-desktop is-half-tablet is-full-mobile first"
      >
        <div class="list-item">
          <div class="list-item-content">
            <div
              class="placeholder flex flex-column is-horizontally-centered is-vertically-centered"
              @click="addNewList()"
            >
              <div>+</div>
              <div>Create new collection</div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="column is-one-quarter-widescreen is-one-third-desktop is-half-mobile is-half-tablet is-full-mobile"
        v-for="list in usersLists"
        :key="list.vanityUrl"
      >
        <div class="list-item" @click="editList(list.vanityUrl)">
          <div class="background flex">
            <img class="is-aligned-right" src="../assets/bg.png" alt />
          </div>
          <div class="card list-item-content">
            <div class="card-content list-item-content-details">
              <div class="badge link-count">{{ list.linkCount }} Links</div>
              <h3>{{ list.vanityUrl }}</h3>
              <p>{{ list.description }}</p>
              <p></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.$store.dispatch("getUsersLists");
    });
  }
})
export default class Me extends Vue {
  get usersLists() {
    return this.$store.getters.usersLists;
  }

  addNewList() {
    this.$store.dispatch("resetCurrentList");
    this.$router.push("/s/edit");
  }

  editList(vanityUrl: string) {
    this.$store.dispatch("getList", vanityUrl);
    this.$router.push("/s/edit");
  }
}
</script>

<style scoped lang="scss">
.background {
  z-index: -9999;
  position: relative;
}

.list-item {
  margin-right: 20px;
  cursor: pointer;
  .list-item-content {
    height: 175px;
    margin-top: -20px;
    margin-right: 10px;
    padding-top: 20px;
  }
  .list-item-content-details {
    padding-left: 20px;
    padding-right: 20px;
  }
}

.placeholder {
  height: 195px;
  box-sizing: border-box;
  border-style: dashed;
  margin-top: 15px;
  border-color: #979797;
  border-width: 2px;
}

.link-count {
  position: absolute;
  margin-top: -55px;
}

@media screen and (max-width: 600px), print {
  .first {
    margin-bottom: 60px;
  }
}
</style>
