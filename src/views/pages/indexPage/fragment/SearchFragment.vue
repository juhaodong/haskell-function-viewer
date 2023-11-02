<script setup>
import {onMounted} from "vue";
import PackageList from "@/views/component/PackageList.vue";
import {useSearchController} from "@/dataLayer/states/searchController";
import {usePageController} from "@/dataLayer/states/pageController";
import {hackageFilterDesc} from "@/dataLayer/repository/hackageRepo";

const controller = useSearchController()
const page = usePageController()
onMounted(async () => {
  await controller.loadList()
})

async function doSearch() {
  await controller.loadList()
}

</script>

<template>
  <div class="pa-6">
    <div class="d-flex">
      <v-text-field
        class="mr-2"
        clearable=""
        v-model="controller.searchQuery"
        density="compact"
        label="Search By Names"
        variant="outlined"
      />
      <v-btn
        class="mr-2"
        size="large"
        color="black"
        :variant="controller.usingFilters?'flat':'tonal'"
        @click="controller.showFilter()"
      >
        <template #prepend>
          <v-icon>
            mdi-filter
          </v-icon>
        </template>
        Filters
      </v-btn>
      <v-btn
        :loading="controller.loading"
        @click="doSearch"
        size="large"
        variant="tonal"
      >
        <template #prepend>
          🔍
        </template>
        Search now
      </v-btn>
    </div>
    <package-list
      v-if="!controller.loading"
      :list="controller.packageList"
    />
    <v-card
      v-if="controller.selectedPackageUri.length>0"
      color="grey-darken-3"
      elevation="16"
      @click="controller.showCart()"
      rounded="0"
      style="position: fixed;right: 0;bottom: 0"
      class="pa-4 pl-8 rounded-ts-xl px-8 pt-6 text-h4 font-weight-black"
    >
      <v-icon class="mr-8">
        mdi-dots-grid
      </v-icon>
      {{ controller.selectedPackageUri.length }} Selected
    </v-card>
    <v-dialog
      max-width="600"
      v-model="controller.showCartDialog"
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
            Selected Packages
            <v-spacer />
            <template v-if="controller.deleteActive">
              <v-card
                @click="controller.tryDelete()"
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
              <v-icon @click="controller.tryDelete()">
                mdi-delete
              </v-icon>
            </template>
          </div>
          <package-list
            class="mt-12"
            :list="controller.activePackages"
          />
          <v-btn @click="page.goPreview(controller.selectedPackageUri)">
            Show Preview
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
    <v-dialog
      max-width="600"
      v-model="controller.showFilterDialog"
    >
      <v-card
        rounded="xl"
      >
        <div class="pa-6">
          <div class="text-h6 d-flex align-center">
            <v-icon class="mr-4">
              mdi-filter
            </v-icon>
            Filters
            <v-spacer />
            <template v-if="controller.deleteActive">
              <v-card
                @click="controller.tryDelete()"
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
              <v-icon @click="controller.resetFilter()">
                mdi-refresh
              </v-icon>
            </template>
          </div>
          <div class="px-2">
            <div class="mt-8">
              <div class="text-caption d-flex align-center">
                Rating
                <v-spacer />
                {{ controller.ratingLimit }}
              </div>
              <v-slider
                step="0.25"
                v-model="controller.ratingLimit"
                max="3"
                min="0"
              />
            </div>
            <div class="mt-2">
              <div class="text-caption d-flex align-center">
                Downloads
                <v-spacer />
                {{ controller.downloadLimit }}
              </div>
              <v-slider
                step="10"
                v-model="controller.downloadLimit"
                max="1000"
                min="0"
              />
            </div>
            <div
              class="text-body-2"
              v-html="hackageFilterDesc"
            />
            <v-btn
              @click="controller.useFilter()"
              class="mt-4"
              variant="flat"
              color="black"
            >
              Apply Filters
            </v-btn>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<style scoped>

</style>
