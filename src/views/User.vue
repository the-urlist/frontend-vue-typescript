<template>
  <div class="container">
    <div class="lists">
      <h2 class="is-size-3 is-heading has-text-primary has-text-weight-medium">
        My Collections
      </h2>
      <div class="columns is-multiline list">
        <div
          class="column is-one-quarter-widescreen is-one-third-desktop is-half-tablet"
        >
          <div class="list-item" @click="addNewList()">
            <div class="list-placeholder  has-text-centered">
              <div class="column has-text-weight-medium">
                <div>+</div>
                <span>Create new collection</span>
              </div>
            </div>
          </div>
        </div>
        <div
          class="column is-one-quarter-widescreen is-one-third-desktop is-half-tablet"
          v-for="list in usersLists"
          :key="list.vanityUrl"
        >
          <img
            src="../assets/bg.png"
            alt
            class="list-dots is-pulled-right is-relative"
          />
          <div
            class="card list-item is-relative"
            @click="editList(list.vanityUrl)"
          >
            <span
              class="list-count tag is-primary is-size-6 has-text-weight-bold"
            >
              {{ list.linkCount }} Links
            </span>
            <div class="list-item-content">
              <div class="card-content list-item-content-details">
                <h3
                  class="is-block list-title is-size-5 has-text-weight-medium"
                >
                  {{ list.vanityUrl }}
                </h3>
                <p class="is-size-6">{{ list.description }}</p>
                <p></p>
              </div>
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

  async addNewList() {
    this.$store.dispatch("resetCurrentList");
    this.$router.push("/s/edit");
  }

  editList(vanityUrl: string) {
    this.$store.dispatch("resetCurrentList");
    this.$store.dispatch("getList", vanityUrl);
    this.$router.push("/s/edit");
  }
}
</script>

<style scoped lang="scss">
#userHeader {
  margin: 40px 0px;
}

.lists {
  margin: 0px 20px;
}

.list {
  .list-dots {
    top: -20px;
    right: -10px;
  }

  .list-title {
    padding: 10px 0px;
  }

  .list-count {
    position: absolute;
    margin-left: 20px;
    margin-top: -15px;
  }

  .list-item {
    margin-bottom: 20px;
    height: 195px;
    cursor: pointer;
    .list-item-content {
      position: absolute;
      width: 100%;
      overflow: hidden;
      margin-bottom: 20px;
    }
  }

  .list-placeholder {
    display: flex;
    height: 100%;
    align-items: center;
    border-style: dashed;
    border-color: #979797;
    border-width: 2px;
  }
}
</style>
