<script setup>

import LoadingProvider from "@/views/component/LoadingProvider.vue";
defineProps({
  loading: Boolean
})
</script>

<template>
  <div style="height: 100%">
    <v-card
      flat=""
      color="grey-darken-4"
      variant="flat"
      rounded="0"
      class="pb-16"
    >
      <slot name="header" />
      <div class="d-flex pa-6 pb-0">
        <slot name="title" />
      </div>
    </v-card>
    <v-card
      class="pa-6 rounded-t-xl bg-white mt-n10"
      flat=""
    >
      <loading-provider :loading="loading">
        <slot />
      </loading-provider>
    </v-card>
  </div>
</template>

<style scoped>

</style>
