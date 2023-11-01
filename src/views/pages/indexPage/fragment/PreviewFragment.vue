<script setup>
import {usePreviewPageController} from "@/dataLayer/states/previewPageController";

const pageState = usePreviewPageController()
</script>

<template>
  <div style="height: 100%">
    {{ pageState.selectedItems }}
  </div>
</template>

<style scoped>

</style>
