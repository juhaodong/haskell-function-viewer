<script setup>
import {usePreviewPageController} from "@/dataLayer/states/previewPageController";
import {usePageController} from "@/dataLayer/states/pageController";
import LoadingIndicator from "@/views/component/LoadingIndicator.vue";

const previewPageController = usePreviewPageController()
const appState = usePageController()

function removePrefix(name) {
  return name?.replace('/package/', '') ?? ''
}

</script>

<template>
  <div style="height: 100%">
    <v-card
      flat=""
      color="grey-darken-4"
      variant="flat"
      rounded="0"
      class=" align-center"
    >
      <div class="d-flex px-6">
        <v-spacer />
        <v-card
          rounded="0"
          @click="previewPageController.changePageActiveIndex(i)"
          :color="previewPageController.activeIndex===i?'grey-lighten-4':'grey-darken-4'"
          variant="flat"
          class="pa-2 px-4 mx-2 rounded-b-lg"
          :key="item"
          v-for="(item,i) in previewPageController.selectedItems"
        >
          {{ removePrefix(item) }}
        </v-card>
      </div>
      <div class="d-flex pa-6 pb-16 ">
        <v-btn
          @click="appState.goSearch()"
          variant="flat"
          icon
          class="mr-4"
        >
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <div
          class="text-h4 font-weight-black"
          v-if="!previewPageController.pageLoading"
        >
          {{ removePrefix(previewPageController.showingInfo?.uri) }}
        </div>
      </div>
    </v-card>
    <v-card
      class="pa-6 rounded-t-xl bg-white mt-n10"
      flat=""
    >
      <template v-if="previewPageController.showingInfo&&!previewPageController.pageLoading">
        <v-lazy
          min-height="90"
          v-for="m in previewPageController.showingInfo.moduleInfo"
          :key="m.module"
        >
          <div @click="previewPageController.toggleModules(m.module)">
            <div class="text-h6 mt-4 d-flex align-baseline">
              <div class="mr-2">
                <v-icon
                  color="grey-darken-2"
                >
                  <template v-if="previewPageController.moduleIsActive(m.module)">
                    mdi-checkbox-marked
                  </template>
                  <template v-else>
                    mdi-checkbox-blank-outline
                  </template>
                </v-icon>
              </div>
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
      <template v-else>
        <loading-indicator />
      </template>
    </v-card>
    <v-card
      rounded="0"
      max-width="300"
      width="30%"
      color="black"
      class="pa-6 rounded-s-xl"
      style="position: fixed;right: 0;top: 20%"
    >
      <div class="text-h5 font-weight-black d-flex">
        <v-icon
          size="36"
          class="mr-2"
        >
          mdi-filter
        </v-icon>
        <div>
          Filters
        </div>
      </div>

      <div>
        <div class="mt-12 text-body-2 d-flex">
          <div>Min entity of the module</div>
          <v-spacer />
          {{ previewPageController.minEntityFilter }}
        </div>
        <v-slider
          min="0"
          max="100"
          step="1"
          v-model="previewPageController.minEntityFilter"
          class="mt-2 mx-2"
          color="white"
        />
      </div>
      <div>
        <div class="mt-4 text-body-2">
          <div>Some other filter</div>
        </div>
        <v-slider
          class="mt-2 mx-2"
          color="white"
        />
      </div>
      <div>
        <div class="mt-4 text-body-2 d-flex align-center">
          <v-switch
            color="primary"
            hide-details
          />
          <v-spacer />
          <div>Only with function</div>
        </div>
      </div>
      <div>
        <div class="mt-8 text-h6 d-flex align-center">
          <div>Result <v-icon>mdi-approximately-equal</v-icon></div>
          <v-spacer />
          <div>{{ previewPageController.showingInfo?.moduleInfo?.length }} <span class="text-body-2">modules</span></div>
        </div>
      </div>
    </v-card>
  </div>
</template>


