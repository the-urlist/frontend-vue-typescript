<template>
  <div class="link-outer">
    <div class="link-wrapper">
      <div class="flex is-vertically-centered full-width">
        <div class="card link flex">
          <div class="flex full-width">
            <div class="flex is-vertically-centered">
              <figure class="link-image is-hidden-mobile">
                <img
                  width="64"
                  :src="link.image || '/images/no-image.png'"
                  :alt="link.title"
                />
              </figure>
            </div>
            <div class="link-details flex flex-column fill-width">
              <div class="flex">
                <figure class="link-image is-visible-mobile">
                  <img
                    width="24"
                    :src="link.image || '/images/no-image.png'"
                    :alt="link.title"
                  />
                </figure>
                <div class="link-title">
                  <input
                    type="text"
                    :placeholder="editable ? 'Enter a title' : ''"
                    id="linkTitle"
                    class="input"
                    v-model="link.title"
                    v-blur-on-enter-key
                  />
                </div>
              </div>
              <div class="link-description">
                <textarea
                  :placeholder="editable ? 'Enter a description' : ''"
                  id="linkDescription"
                  class="textarea"
                  v-model="link.description"
                  v-blur-on-enter-key
                ></textarea>
              </div>
              <div>
                <div class="link-url">
                  <p>{{ link.url }}</p>
                </div>
              </div>
            </div>
            <!-- <div class="full-width"></div> -->
          </div>
        </div>
        <div class="is-aligned-right delete" v-show="editable">
          <a class="has-text-bold" @click.prevent="deleteLink(link.id)">
            <img src="@/assets/close.png" alt />
          </a>
        </div>
      </div>
    </div>
    <div class="link-overlay" v-if="!editable" @click="go(link.url)"></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
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

.link-wrapper {
  left: 20px;
  right: 20px;
  position: absolute;
}

.link-overlay {
  height: 130px;
  width: 100%;
  cursor: pointer;
  position: absolute;
}

.link {
  width: 100%;
  height: 110px;
  cursor: pointer;
  padding-left: 10px;
  .input {
    font-size: 1em;
    padding: 0;
    line-height: inherit;
    height: auto;
    border: none;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .textarea {
    padding: 0px 0px 0px 2px;
    margin: 0px;
    border: none;
    line-height: inherit;
    font-size: 1em;
    height: auto;
    width: 100%;
    box-sizing: border-box;
    resize: none;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

.link-image {
  margin: 0px 10px 0px 0px;
  padding: 0;
}

.link-details {
  flex: 1;
  margin-right: 20px;
  padding: 10px;
}

.link-title {
  display: block;
  color: #222c38;
  max-lines: 2;
  border: none;
  font-size: 1em;
  resize: none;
  box-sizing: border-box;
  width: 100%;
  &:focus {
    border-bottom: 1 solid $primary-color;
  }
}

.link-description {
  font-size: 0.8em;
  margin-top: 4px;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
}

.link-url {
  position: relative;
  width: 100%;
  margin-left: 2px;
  margin-top: 4px;
  font-size: 12px;
  p {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    width: 100%;
    position: absolute;
  }
}

.delete {
  cursor: pointer;
  margin-top: -20px;
  margin-left: 20px;
  transition: margin 400ms linear;
}

@media only screen and (min-width: 1040px) {
  .delete {
    margin-right: -40px;
  }
}

@media only screen and (max-width: 680px) {
  .link-description {
    font-size: 12px;
  }
  .link-title {
    margin-right: 30px;
  }
  .link .textarea {
    padding: 0;
    margin: 0;
  }
}
</style>
