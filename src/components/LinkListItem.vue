<template>
  <div class="link-outer">
    <div class="link-wrapper" :class="{ 'link-editable': editable }">
      <div class="columns is-vcentered is-mobile">
        <div class="column is-narrow" v-if="editable">
          <span class="icon is-medium has-text-grey link-drag-handle">
            <i class="fas fa-lg fa-grip-vertical"></i>
          </span>
        </div>
        <div class="card link">
          <div class="column">
            <div class="columns is-vcentered">
              <div class="column is-narrow is-hidden-mobile">
                <figure class="link-image">
                  <img
                    width="64"
                    height="64"
                    class="is-64x64"
                    :src="link.image || '/images/no-image.png'"
                    :alt="link.title"
                  />
                </figure>
              </div>
              <div class="column link-details">
                <div class="columns is-mobile is-multiline is-gapless">
                  <div class="column is-narrow is-hidden-tablet">
                    <figure class="link-image link-image-little">
                      <img
                        width="24"
                        height="24"
                        class="is-24x24"
                        :src="link.image || '/images/no-image.png'"
                        :alt="link.title"
                      />
                    </figure>
                  </div>
                  <div class="column">
                    <input
                      type="text"
                      :placeholder="editable ? 'Enter a title' : ''"
                      class="has-text-weight-bold link-title input has-text-weight-medium"
                      v-model="link.title"
                      v-blur-on-enter-key
                    />
                  </div>
                  <div class="column is-full">
                    <textarea
                      :placeholder="editable ? 'Enter a description' : ''"
                      class="link-description textarea has-fixed-size is-size-7"
                      v-model="link.description"
                      v-blur-on-enter-key
                    ></textarea>
                    <input
                      disabled="disabled"
                      v-model="link.url"
                      class="link-url"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="is-overlay" v-if="!editable" @click="go(link.url)"></div>
        </div>
        <div class="column is-narrow" v-if="editable">
          <div class="columns is-vcentered">
            <div class="column">
              <a
                class="has-text-bold link-delete has-text-grey"
                @click.prevent="deleteLink(link.id)"
              >
                <span class="icon is-medium">
                  <i class="fas fa-lg fa-times"></i>
                </span>
                <!-- <img src="@/assets/close.png" alt /> -->
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Link from "@/models/Link";

@Component({
  props: {
    link: {
      type: Link,
      required: true
    },
    editable: {
      type: Boolean,
      required: true
    }
  }
})
export default class extends Vue {
  deleteLink(id: string) {
    this.$store.dispatch("deleteLink", id);
  }

  go(url: string) {
    // if the url doesn't begin with http or https, add http
    /^https?:/.test(url) || (url = `http://${url}`);

    window.open(url, "_blank");
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.link-outer {
  height: 130px;
}

// this class bumps the drag handle and delete button to the outer margin
// it is only applied when a list is in edit mode
.link-editable {
  margin: 10px -40px auto -40px;
}

.link-wrapper {
  transition: margin 400ms linear;
  margin-top: 10px;
  margin-bottom: auto;
}

.link {
  width: 100%;
  height: 110px;
  cursor: pointer;
  padding-left: 10px;
  .textarea,
  .input {
    padding: 0px 4px 0px 4px;
    line-height: auto;
    height: auto;
    min-height: auto;
    border: none;
    box-shadow: none;
    overflow: hidden;
    text-overflow: ellipsis;
    &:hover {
      box-shadow: inset 1px 0px 2px #20ae96;
    }
  }
  .link-image {
    padding-right: -14px;
    &.link-image-little {
      margin-left: 4px;
      margin-right: 4px;
    }
  }
  .link-details {
    height: 110px;
    margin-right: 10px;
  }
  .link-description {
    font-size: 1em;
    height: 40px;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .link-url {
    margin-left: 4px;
    font-size: 12px;
    border: none;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    &:disabled {
      background-color: white;
      color: black;
    }
  }
  .link-delete {
    cursor: pointer;
    margin-top: -20px;
    margin-left: 20px;
    transition: margin 400ms linear;
  }
  .link-overlay {
    height: 110px;
    width: 100%;
    cursor: pointer;
    position: absolute;
    margin-top: -110px;
  }
}

.link-drag-handle {
  cursor: move;
}

@media only screen and (max-width: 1090px) {
  .link-wrapper {
    margin-left: 0;
    margin-right: 0;
  }
}
</style>
