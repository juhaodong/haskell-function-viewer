<script setup>
import {usePreviewPageController} from "@/dataLayer/states/previewPageController";
import {usePageController} from "@/dataLayer/states/pageController";

const pageState = usePreviewPageController()
const appState = usePageController()
</script>

<template>
  <div style="height: 100%">
    <v-card
      color="grey-darken-4"
      variant="flat"
      class="d-flex pa-6 pb-16 align-center"
    >
      <v-btn
        @click="appState.goBack()"
        variant="flat"
        icon
        class="mr-4"
      >
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <div class="text-h4 font-weight-black">
        {{ pageState.showingInfo?.uri }}
      </div>
    </v-card>
    <v-card class="pa-6 rounded-t-xl bg-white mt-n10">
      <template v-if="pageState.showingInfo">
        <v-lazy
          min-height="90"
          v-for="m in pageState.showingInfo.moduleInfo"
          :key="m.module"
        >
          <div>
            <div class="text-h6 mt-4 d-flex align-center">
              <v-icon
                color="grey-darken-2"
                class="mr-2"
              >
                mdi-view-grid
              </v-icon>
              {{ m.module }}
            </div>
            <div class="pa-4">
              <div
                class="mt-2"
                v-for="i in m.info"
                :key="i.name"
              >
                <div
                  v-html="i.display_html"
                />
              </div>
            </div>
            <v-divider />
          </div>
        </v-lazy>
      </template>
    </v-card>
  </div>
</template>


