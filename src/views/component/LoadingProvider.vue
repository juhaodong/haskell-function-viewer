<script setup>
import LoadingIndicator from "@/views/component/LoadingIndicator.vue";

defineProps({
  loading: Boolean
})
</script>

<template>
  <template v-if="loading">
    <loading-indicator />
  </template>
  <template v-else>
    <slot />
  </template>
</template>

<style scoped>

</style>
