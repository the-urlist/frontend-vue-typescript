<template>
  <div>
    <qrcode-vue
      :value="value"
      size="70%"
      level="H"
      background="#F9FAFC"
      renderAs="svg"
    ></qrcode-vue>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import QrcodeVue from "qrcode.vue";

@Component({
  components: {
    QrcodeVue
  },
  props: {
    value: String
  }
})
export default class QrCode extends Vue {
  data() {
    return {
      size: window.innerWidth
    };
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
