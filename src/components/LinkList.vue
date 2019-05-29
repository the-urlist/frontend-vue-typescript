<template>
  <div>
    <sortable-list
      v-model="currentList.links"
      :distance="10"
      :disabled="editable"
      lock-axis="y"
    >
      <sortable-item
        v-for="(link, index) in currentList.links"
        :index="index"
        :key="index"
        :disabled="!editable"
      >
        <link-list-item :link="link" :editable="editable"></link-list-item>
      </sortable-item>
    </sortable-list>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { SlickList, SlickItem } from "vue-slicksort";
import LinkListItem from "@/components/LinkListItem.vue";

const SortableList: object = SlickList;
const SortableItem: object = SlickItem;

@Component({
  props: {
    links: {
      type: Array,
      required: true
    },
    editable: {
      type: Boolean,
      required: true
    }
  },
  components: {
    SortableList,
    SortableItem,
    LinkListItem
  }
})
export default class extends Vue {
  get currentList() {
    return this.$store.getters.currentList;
  }
}
</script>
