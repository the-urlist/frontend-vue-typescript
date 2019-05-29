<template>
  <div>
    <p>Enter a link and press enter</p>
    <input
      class="input is-large is-size-2"
      :class="{ invalid: isUrlInvalid }"
      ref="newLink"
      type="text"
      id="newLink"
      v-model="newLink"
      @keyup.enter="addLink()"
    />
    <p v-show="isUrlInvalid" class="error">
      That doesn't look like a valid URL
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { validationMixin } from "vuelidate";
import { required, url, helpers } from "vuelidate/lib/validators";

/* eslint-disable */
const customURL = helpers.regex(
  "customURL",
  /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
);
/* eslint-enable */

@Component({
  mixins: [validationMixin],
  validations: {
    newLink: {
      required,
      customURL
    }
  }
})
export default class extends Vue {
  isUrlInvalid: boolean = false;
  newLink: string = "";

  addLink() {
    if (!this.$v.$invalid) {
      this.isUrlInvalid = false;
      this.$emit("onAddNewLink", this.newLink);
      this.newLink = "";
    } else {
      this.isUrlInvalid = true;
    }
  }
}
</script>
