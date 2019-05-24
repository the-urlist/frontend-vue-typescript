<template>
  <div>
    <div class="addbar container flex is-horizontally-centered">
      <div class="control stretch">
        <label class="control-label" for="vanityUrl">URL</label>
        <input
          title="Optional: Enter a custom URL for this list. If you leave this box blank, we'll generate a random one for you."
          class="input"
          :class="{ invalid: $v.vanityUrl.$error }"
          id="vanityUrl"
          ref="vanityUrl"
          type="text"
          @input="setvanityUrl($event.target.value)"
          v-show="!listIsPublished"
        />
        <input
          class="input"
          id="vanityUrl"
          ref="vanityUrl"
          type="text"
          disabled="disabled"
          v-model="currentList.vanityUrl"
          v-if="listIsPublished"
        />
        <div>
          <p class="error" v-show="$v.vanityUrl.$error">
            {{ validationError }}
          </p>
        </div>
        <p class="live-link">
          <a :href="liveLink" v-if="listIsPublished" target="_new">
            {{ liveLink }}
          </a>
        </p>
      </div>
      <div class="control stretch">
        <label class="control-label" for="description">Description</label>
        <textarea
          title="Optional: The description will show up as the title on your public list page."
          class="textarea description"
          id="description"
          v-model="currentList.description"
        ></textarea>
      </div>
      <div class="control">
        <label class="control-label is-hidden-mobile" for>&nbsp;</label>
        <button
          :disabled="!canSave"
          class="is-color-primary has-text-white has-text-bold save-button"
          @click="saveList"
        >
          Publish
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { debounce } from "typescript-debounce-decorator";
import { validationMixin } from "vuelidate";
import { helpers } from "vuelidate/lib/validators";
import config from "@/config";

/* eslint-disable */
// disable eslint which doesn't like the escapes in the regex
const mustBeValidUrl = (value: string, vm: AddBar) => {
  vm.validationError = "Only letters, numbers and dashes";
  // only accepts alphanumeric and dashes
  return /^(^$|[a-zA-Z0-9_\-])+$/.test(value);
};
/* eslint-enable */

const mustBeUnique = async (value: string, vm: AddBar) => {
  if (vm.listIsPublished) return true;

  // we don't run this validator if the url isn't valid in the first place
  if (helpers.req(value) && mustBeValidUrl(value, vm)) {
    vm.validationError = "That URL is already taken";
    // check with the backend to see if the vanityUrl is available
    return await vm.$store.dispatch("checkvanityUrlAvailable", value);
  } else return true;
};

@Component({
  mixins: [validationMixin],
  validations: {
    vanityUrl: {
      mustBeValidUrl,
      mustBeUnique
    }
  }
})
export default class AddBar extends Vue {
  isBusy: boolean = false;
  validationError: string = "";

  get canSave() {
    return (
      !this.$v.$error &&
      !this.$v.$pending &&
      this.currentList.links.length > 0 &&
      !this.isBusy
    );
  }

  get currentList() {
    return this.$store.getters.currentList;
  }

  get listIsPublished() {
    return this.$store.getters.listIsPublished;
  }

  get liveLink() {
    return `${config.FRONTEND}/${this.currentList.vanityUrl}`;
  }

  get vanityUrl() {
    return this.$store.getters.currentList.vanityUrl;
  }

  @debounce(300, { leading: false })
  setvanityUrl(value: string) {
    this.currentList.vanityUrl = value.trim();
    this.$v.$touch();
  }

  async saveList() {
    this.isBusy = true;
    try {
      this.listIsPublished
        ? await this.$store.dispatch("updateList", this.vanityUrl)
        : await this.$store.dispatch("publishList");

      this.$router.push(`/${this.currentList.vanityUrl}`);
    } catch (err) {
      // handle this
    } finally {
      this.isBusy = false;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.control {
  padding: 10px 10px 0px;
  &.stretch {
    flex: 1 1 200px;
  }
}

.control-label {
  padding-bottom: 0.8rem;
  display: block;
}

.save-button {
  padding: 10px 10px 10px;
}

.live-link {
  margin-top: 10px;
  font-size: 12px;
}

@media only screen and (max-width: 700px) {
  .addbar {
    display: block;
  }
  .control {
    padding-right: 5px;
  }
}
</style>
