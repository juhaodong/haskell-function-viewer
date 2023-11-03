import {defineStore} from "pinia";
import {computed, ref} from "vue";
import {useSearchController} from "@/dataLayer/states/searchPage/searchController";

export const useSearchFilter = defineStore('search-filter', () => {
  const downloadLimit = ref(0)
  const ratingLimit = ref(0)
  const showFilterDialog = ref(false)

  const usingFilters = computed(() => {
    return ratingLimit.value > 0 || downloadLimit.value > 0
  })

  async function useFilter() {
    showFilterDialog.value = false
    const search = useSearchController()
    await search.loadList()
  }

  function resetFilter() {
    ratingLimit.value = 0
    downloadLimit.value = 0
  }

  function showFilter() {
    showFilterDialog.value = true
  }

  return {
    downloadLimit, ratingLimit, showFilterDialog, usingFilters, useFilter, resetFilter, showFilter
  }

})
