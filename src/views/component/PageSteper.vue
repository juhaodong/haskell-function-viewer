<script setup>
defineProps({
  currentPageIndex: Number,
  pageItems: Array,
})
defineEmits(['pageUpdate'])

</script>

<template>
  <div
    class="d-flex pl-6"
    style="min-height: 40px"
  >
    <v-spacer />
    <div
      class="d-flex flex-grow-0"
      v-dragscroll
      style="max-width: 70%;overflow-x: scroll"
    >
      <v-card
        rounded="0"
        width="fit-content"
        @click="$emit('pageUpdate',i)"
        :color="currentPageIndex===i?'grey-lighten-4':'grey-darken-4'"
        variant="flat"
        class="pa-2 px-4 mx-2 rounded-b-lg text-no-wrap flex-shrink-0"
        :key="item"
        v-for="(item,i) in pageItems"
      >
        {{ item }}
      </v-card>
    </div>
  </div>
</template>

<style scoped>
div{
  user-select: none;
}

</style>
