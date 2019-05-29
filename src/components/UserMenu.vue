<template>
  <ul ref="menu" class="items-list" :class="{ open: showProfileMenu }">
    <li>
      <a :href="logoutUrl" class="item">
        Log Out<span class="iconitem fa fa-id-badge"></span>
      </a>
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import config from "@/config";

@Component
export default class extends Vue {
  get showProfileMenu() {
    return this.$store.getters.showProfileMenu;
  }

  logoutUrl = config.LOGOUT_URL;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.items-list {
  position: absolute;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  width: 200px;
  border-radius: 3px;
  background: #fff;
  padding: 0.5rem 0;
  top: 3.8rem;
  left: -140px;
  list-style: none;
  display: none;
  z-index: 99999;
}

.item {
  display: flex;
  box-sizing: border-box;
  justify-content: space-between;
  padding: 1rem;
  cursor: pointer;
  color: black;
}

.item:hover {
  // background: $primary-color-hover;
  color: white;
}

.item:hover > .iconitem {
  color: white;
}

.items-list.open {
  display: block;
}

.items-list::before {
  content: "";
  position: absolute;
  left: 160px;
  top: -10px;
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 10px solid rgba(0, 0, 0, 0.24);
  box-shadow: 0 0 0 rgba(0, 0, 0, 0.12), 0 0 0 rgba(0, 0, 0, 0.24);
  clear: both;
}
</style>
