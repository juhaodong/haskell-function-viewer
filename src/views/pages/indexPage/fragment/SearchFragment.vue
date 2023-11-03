<script setup>
import {computed, onMounted} from "vue";
import PackageList from "@/views/component/PackageList.vue";
import {useSearchController} from "@/dataLayer/states/searchPage/searchController";
import {usePageController} from "@/dataLayer/states/pageController";
import {hackageFilterDesc} from "@/dataLayer/repository/hackageRepo";

import LoadingProvider from "@/views/component/LoadingProvider.vue";
import {useSearchFilter} from "@/dataLayer/states/searchPage/useSearchFilter";
import PageSteper from "@/views/component/PageSteper.vue";
import PageFrame from "@/views/component/PageFrame.vue";
import NiceHeader from "@/views/component/decoration/NiceHeader.vue";

const searchController = useSearchController()
const filterController = useSearchFilter()
const page = usePageController()

onMounted(async () => {
  await searchController.changeActivePage(0)

})

async function doSearch() {
  await searchController.loadList()
}

const displayPageItems = computed(() => {
  return Array.from(Array(searchController.pageCount).keys()).map((i) => i + 1)
})


</script>

<template>
  <page-frame :loading="searchController.loading">
    <template #header>
      <page-steper
        :page-items="displayPageItems"
        :current-page-index="searchController.currentPage"
        @page-update="searchController.changeActivePage"
      />
    </template>
    <template #title>
      <nice-header>
        <template #icon>
          mdi-format-list-bulleted
        </template>
        Package List
      </nice-header>
      <v-spacer />
      <div style="width: 400px">
        <v-text-field
          class="mr-2"
          hide-details
          clearable=""
          v-model="searchController.searchQuery"
          density="compact"
          label="Search By Names"
          variant="outlined"
        />
      </div>

      <v-btn
        class="mr-2"
        size="large"
        :color="filterController.usingFilters?'primary':''"
        variant="flat"
        @click="filterController.showFilter()"
      >
        <template #prepend>
          <v-icon>
            mdi-filter
          </v-icon>
        </template>
        Filters
      </v-btn>
      <v-btn
        flat=""
        :disabled="searchController.loading"
        @click="doSearch"
        size="large"
      >
        <template #prepend>
          🔍
        </template>
        Search
      </v-btn>
    </template>
    <package-list
      :list="searchController.packageList"
    />
  </page-frame>
  <v-card
    v-if="searchController.selectedPackage.length>0"
    color="grey-darken-3"
    elevation="16"
    @click="searchController.showCart()"
    rounded="0"
    style="position: fixed;right: 0;bottom: 0"
    class="pa-4 pl-8 rounded-ts-xl px-8 pt-6 text-h4 font-weight-black"
  >
    <v-icon class="mr-8">
      mdi-dots-grid
    </v-icon>
    {{ searchController.selectedPackage.length }} Selected
  </v-card>
  <v-dialog
    max-width="600"
    v-model="searchController.showCartDialog"
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
          <template v-if="searchController.deleteActive">
            <v-card
              @click="searchController.tryDelete()"
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
            <v-icon @click="searchController.tryDelete()">
              mdi-delete
            </v-icon>
          </template>
        </div>
        <package-list
          class="mt-12"
          :list="searchController.activePackages"
        />
        <v-btn @click="page.goPreview(searchController.selectedPackage)">
          Show Preview
        </v-btn>
      </div>
    </v-card>
  </v-dialog>
  <v-dialog
    max-width="600"
    v-model="filterController.showFilterDialog"
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
          <template v-if="searchController.deleteActive">
            <v-card
              @click="searchController.tryDelete()"
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
            <v-icon @click="filterController.resetFilter()">
              mdi-refresh
            </v-icon>
          </template>
        </div>
        <div class="px-2">
          <div class="mt-8">
            <div class="text-caption d-flex align-center">
              Rating
              <v-spacer />
              {{ filterController.ratingLimit }}
            </div>
            <v-slider
              step="0.25"
              v-model="filterController.ratingLimit"
              max="3"
              min="0"
            />
          </div>
          <div class="mt-2">
            <div class="text-caption d-flex align-center">
              Downloads
              <v-spacer />
              {{ filterController.downloadLimit }}
            </div>
            <v-slider
              step="10"
              v-model="filterController.downloadLimit"
              max="1000"
              min="0"
            />
          </div>
          <div
            class="text-body-2"
            v-html="hackageFilterDesc"
          />
          <v-btn
            @click="filterController.useFilter()"
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
</template>
