<script setup>

import dayjs from "dayjs";

import {useSearchController} from "@/dataLayer/states/searchController";

const controller = useSearchController()
defineProps({
  list: Array,
})
</script>

<template>
  <div
    class="pb-16"
  >
    <v-card
      rounded="xl"
      variant="flat"
      :color="controller.packageIsActive(p.name.display)?'grey-darken-4':'grey-lighten-5'"
      class="pa-4 px-6 mb-2"
      @click="controller.togglePackageUri(p.name.display)"
      v-for="p in list"
      :key="p.name.display"
    >
      <div class="d-flex align-baseline">
        <div>
          <div class="text-body-1 font-weight-medium">
            {{ p.name.display }}<span class="text-body-2 text-grey-darken-1">
              @v{{ p.lastVersion }}
            </span>
          </div>
          <div class="text-body-2 mt-1 text-grey-darken-1">
            {{ p.description }}
          </div>
        </div>
        <v-spacer />
        <div
          style="width: 120px"
          class="text-grey-darken-1 text-body-2 text-right text-no-wrap flex-shrink-0"
        >
          <v-icon class="mr-2">
            mdi-update
          </v-icon>
          {{ dayjs(p.lastUpload).format('DD.MM.YYYY') }}
        </div>
        <div
          style="width: 80px"
          class="text-grey-darken-1 text-right text-body-2 flex-shrink-0"
        >
          <v-icon class="mr-2">
            mdi-download
          </v-icon>
          {{ p.downloads }}
        </div>
      </div>
    </v-card>
  </div>
</template>

<style scoped>

</style>
