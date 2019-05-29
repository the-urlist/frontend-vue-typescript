<template>
  <div class="hero is-fullheight has-text-centered">
    <div class="hero-body">
      <div class="container">
        <div class="shrug has-text-primary">
          <span>¯\_</span>
          <span>(ツ)</span>
          <span>_/¯</span>
        </div>
        <br />
        <h3 class="is-size-5 has-text-weight-medium">
          We couldn't find that Url List.
        </h3>
        <br />
        <p class="is-size-6">
          But that's not necessarily a bad thing. That means the url "{{
            vanityUrl
          }}" is
          <a class="has-color-primary" @click="newList">still available.</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  props: {
    vanityUrl: {
      type: String,
      required: true
    }
  }
})
export default class extends Vue {
  newList() {
    this.$router.push(`/s/edit`);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.shrug {
  text-align: center;
  font-size: 10vw;
  position: relative;
  line-height: 1;
  span {
    &:first-child,
    &:last-child {
      display: inline-block;
      animation: shrugHands 5s infinite;
    }
  }
}

.shrug-description {
  padding-top: 40px;
  text-align: center;
}

@keyframes shrugHands {
  0% {
    transform: translateY(0);
  }
  10% {
    transform: translateY(-10%);
  }
  20%,
  100% {
    transform: translateY(0);
  }
}
</style>
