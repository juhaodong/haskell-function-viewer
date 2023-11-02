<template>
  <div
    style="height: 100%"
  >
    <v-card
      flat=""
      class="d-flex px-2"
      rounded="0"
      color="grey-lighten-4"
    >
      <v-card
        elevation="0"
        :key="t.name"
        v-for="t in tabs"
        :color="pageController.activeTabName===t.name?'grey-darken-4':'grey-lighten-3'"
        class="rounded-t-lg rounded-b-0 pa-3 px-8"
      >
        <div class="text-body-2 d-flex align-center">
          <v-icon class="mr-4">
            {{ t.icon }}
          </v-icon>
          {{ t.name }}
        </div>
      </v-card>
    </v-card>
    <v-card
      rounded="0"
      min-height="calc(100vh - 64px - 45px)"
    >
      <template v-if="pageController.activeTabName===TabNames.Browse">
        <search-fragment />
      </template>
      <template v-else-if="pageController.activeTabName===TabNames.Preview">
        <preview-fragment />
      </template>
    </v-card>
  </div>
</template>

<script setup>
import {TabNames, usePageController} from "@/dataLayer/states/pageController";
import SearchFragment from "@/views/pages/indexPage/fragment/SearchFragment.vue";
import PreviewFragment from "@/views/pages/indexPage/fragment/PreviewFragment.vue";

const pageController = usePageController()
const tabs = [
  {name: TabNames.Browse, icon: 'mdi-cloud-search'},
  {name: TabNames.Preview, icon: 'mdi-file-find'},
  {name: TabNames.Output, icon: 'mdi-export'},
]

</script>
