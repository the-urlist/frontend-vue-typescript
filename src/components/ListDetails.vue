<template>
  <div>
    <div id="listDetails" class="addbar flex is-horizontally-centered">
      <div class="container main">
        <div class="columns">
          <div class="column">
            <label class="control-label" for="vanityUrl">Link Title</label>
            <input
              class="input is-large"
              id="vanityUrl"
              ref="vanityUrl"
              type="text"
              disabled="disabled"
              v-model="currentList.vanityUrl"
              v-if="listIsPublished"
            />
            <input
              title="Optional: Enter a name for this list. The name will become the URL (i.e. my-list becomes theurlist.com/my-list). If you leave this box blank, we'll generate a random name for you."
              class="input is-large has-tooltip"
              :class="{ 'is-invalid': $v.vanityUrl.$error }"
              id="vanityUrl"
              ref="vanityUrl"
              type="text"
              @input="setvanityUrl($event.target.value)"
              v-else
            />
            <div id="errorMessage">
              <p
                class="has-text-danger is-font-weight-medium"
                v-show="$v.vanityUrl.$error"
              >
                {{ validationError }}
              </p>
            </div>
            <p id="liveLink" v-if="listIsPublished">
              <a :href="liveLink" target="_new">
                {{ liveLink }}
              </a>
            </p>
          </div>
          <div class="column">
            <label class="control-label" for="description">Description</label>
            <textarea
              rows="2"
              title="Optional: The description will show up as the title on your public list page."
              class="textarea has-fixed-size"
              id="description"
              v-model="currentList.description"
            ></textarea>
          </div>
          <div class="column is-narrow">
            <label class="control-label is-hidden-mobile" for>&nbsp;</label>
            <button
              id="publishButton"
              :disabled="!canSave"
              class="button is-primary is-large has-text-white has-text-weight-bold"
              @click="saveList"
            >
              Publish
            </button>
          </div>
        </div>
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
#listDetails {
  padding-top: 40px;
  background-color: white;
  top: 0;
  width: 100%;
  background: #fff;
  box-shadow: 0 50px 40px -40px #e8e8e8;
  padding-bottom: 20px;
}

#description {
  font-size: 0.8em;
  line-height: 1.5em;
}

#vanityUrl {
  font-size: 2.25em;
  font-weight: 500;
}

#publishButton {
  margin-top: 1.2em;
}

#liveLink {
  margin-top: 10px;
  font-size: 12px;
}
</style>
