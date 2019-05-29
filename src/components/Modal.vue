<template>
  <div class="modal" :class="{ 'is-active': isActive }">
    <div class="modal-background" @click="$emit('close')"></div>
    <div class="modal-content">
      <div class="card modal-content-inner">
        <a
          class="flex is-pulled-right"
          href="#"
          @click.prevent="$emit('close')"
        >
          <img src="../assets/close.png" />
        </a>
        <div class="card-content">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  props: {
    isActive: {
      type: Boolean
    }
  }
})
export default class extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.modal {
  padding: 20px;
}

.modal-content {
  min-width: 300px;
  max-width: 500px;
  background-color: white;
  box-shadow: 0 20px 60px -2px rgba(27, 33, 58, 0.4);
}

.modal-content-inner {
  padding: 20px;
  text-align: center;
}

.modal-background {
  opacity: 0.3;
}
</style>
