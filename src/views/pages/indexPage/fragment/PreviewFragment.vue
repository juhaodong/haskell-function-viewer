<script setup>
import {usePreviewPageController} from "@/dataLayer/states/previewPageController";
import {TabNames, usePageController} from "@/dataLayer/states/pageController";
import {computed} from "vue";
import PageSteper from "@/views/component/PageSteper.vue";
import PageFrame from "@/views/component/PageFrame.vue";
import PackageList from "@/views/component/PackageList.vue";
import {tr} from "vuetify/locale";

const previewPageController = usePreviewPageController()
const appState = usePageController()

const displayPageItems = computed(() => {
  return previewPageController.selectedPackages.map(removePrefix)
})

function removePrefix(name) {
  return name?.replace('/package/', '') ?? ''
}

</script>

<template>
  <page-frame :loading="!previewPageController.showingInfo||previewPageController.pageLoading">
    <template #header>
      <page-steper
        :page-items="displayPageItems"
        :current-page-index="previewPageController.activeIndex"
        @page-update="previewPageController.changePageActiveIndex"
      />
    </template>
    <template #title>
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
    </template>
    <v-lazy
      min-height="90"
      v-for="m in previewPageController.filteredModuleInfo"
      :key="m.module"
    >
      <div @click="previewPageController.toggleModules(m)">
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
  </page-frame>
  <v-card
    v-if="previewPageController.showFilter"
    rounded="0"
    max-width="300"
    width="30%"
    color="grey-darken-4"
    class="pa-6 rounded-s-xl"
    style="position: fixed;right: 0;top: 20%"
  >
    <div class="text-h5 font-weight-black d-flex align-center">
      <v-icon
        size="36"
        class="mr-2"
      >
        mdi-filter
      </v-icon>
      <div>
        Filters
      </div>
      <v-spacer />
      <v-btn
        icon
        @click="previewPageController.showFilter=false"
        size="36"
      >
        <v-icon size="18">
          mdi-arrow-collapse-right
        </v-icon>
      </v-btn>
    </div>
    <div>
      <div class="mt-12 text-body-2 d-flex">
        <div>Min size of the module</div>
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
      <div class="mt-4 text-body-2 d-flex align-center">
        <v-switch
          v-model="previewPageController.onlyFunctionFilter"
          color="primary"
          hide-details
        />
        <v-spacer />
        <div>Only with function</div>
      </div>
    </div>
    <div>
      <div class="mt-8 text-h6 d-flex align-center">
        <div>
          Result
          <v-icon>mdi-approximately-equal</v-icon>
        </div>
        <v-spacer />
        <div>
          {{ previewPageController.filteredModuleInfo?.length }} <span class="text-body-2">modules</span>
        </div>
      </div>
    </div>
  </v-card>

  <v-card
    v-if="!previewPageController.showFilter"
    @click="previewPageController.showFilter=true"
    rounded="0"
    color="grey-darken-4"
    class="pa-6 rounded-s-xl"
    style="position: fixed;right: 0;top: 20%"
  >
    <v-btn icon>
      <v-icon>mdi-filter</v-icon>
    </v-btn>
  </v-card>


  <v-card
    @click="previewPageController.startCartDialog()"
    v-if="previewPageController.selectedModules.length>0"
    color="grey-darken-4"
    elevation="16"
    rounded="0"
    style="position: fixed;right: 0;bottom: 0"
    class="pa-4 d-flex align-center rounded-ts-xl pr-8 px-12 pt-6 text-h4 font-weight-black"
  >
    {{ previewPageController.selectedModules.length }} Selected
    <v-icon class="ml-8">
      mdi-arrow-right
    </v-icon>
  </v-card>
  <v-dialog
    max-width="600"
    v-model="previewPageController.showCartDialog"
  >
    <v-card
      color="black"
      rounded="xl"
    >
      <div class="pa-6">
        <div class="text-h6 d-flex align-center">
          <v-icon class="mr-4">
            mdi-dots-grid
          </v-icon>
          Selected Modules
          <v-spacer />
          <template v-if="previewPageController.deleteActive">
            <v-card
              @click="previewPageController.tryDelete()"
              rounded="lg"
              class="pa-2 px-4 text-body-2  d-flex align-center"
              color="error"
            >
              <v-icon class="mr-2">
                mdi-delete
              </v-icon>
              Are you sure?
            </v-card>
          </template>
          <template v-else>
            <v-icon @click="previewPageController.tryDelete()">
              mdi-delete
            </v-icon>
          </template>
        </div>
        <div class="mt-8 mb-4">
          <div
            class="pa-2 py-4 d-flex align-center"
            :key="m.module"
            v-for="m in previewPageController.selectedModules"
          >
            <div>
              <div class="text-body-1 font-weight-black">
                {{ m.module }}
              </div>
              <div class="text-body-2">
                Size: {{ m.info.length }}
              </div>
            </div>
            <v-spacer />
            <v-btn
              density="comfortable"
              size="x-small"
              icon
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
        </div>
        <v-btn @click="appState.goOutput()">
          Show Output
        </v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>


