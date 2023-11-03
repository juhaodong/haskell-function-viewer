import {defineStore} from "pinia";
import {computed, ref} from "vue";
import {getPackageDetail} from "@/dataLayer/api/hackageApi";
import {groupBy} from "lodash-es";

export const usePreviewPageController =
  defineStore('preview-fragment-controller',
    () => {
      const selectedPackages = ref([])
      const showingInfo = ref(null)
      const activeIndex = ref(0)
      const pageLoading = ref(true)
      const selectedModules = ref([])
      const showFilter = ref(false)

      const minEntityFilter = ref(0)
      const onlyFunctionFilter = ref(false)
      const showCartDialog = ref(false)

      const filteredModuleInfo = computed(() => {
        const filterFunc = [(it) => it || true]
        if (minEntityFilter.value > 0) {
          filterFunc.push((it) => it.info.length > minEntityFilter.value)
        }
        if (onlyFunctionFilter.value) {
          filterFunc.push((it) => it.info.some(i => i.display_html.includes('::')))
        }
        return showingInfo.value?.moduleInfo
          .filter(it => filterFunc.every(f => f(it))) ?? []
      })


      async function init(packages) {
        selectedPackages.value = packages.map(it => it.name.uri)
        activeIndex.value = 0
        await refreshInfo()
      }

      async function refreshInfo() {
        pageLoading.value = true
        showingInfo.value = await getInfoForIndex()
        console.log(showingInfo.value, 'showing info')
        pageLoading.value = false
      }

      async function changePageActiveIndex(newIndex) {
        activeIndex.value = newIndex
        await refreshInfo()
      }

      function moduleIsActive(moduleName) {
        return selectedModules.value.find(it => it.module === moduleName)
      }

      function toggleModules(module) {
        if (moduleIsActive(module.module)) {
          selectedModules.value = selectedModules.value.filter(it => it.module !== module.module)
        } else {
          selectedModules.value.push(module)
        }
        console.log(selectedModules)

      }

      async function getInfoForIndex() {
        const uri = selectedPackages.value[activeIndex.value]
        const result = groupBy(await getPackageDetail(uri), 'module')
        return {
          uri,
          moduleInfo: Object.entries(result).map(([key, info]) => {
            return {
              module: key,
              info,
            }
          })
        }
      }

      const deleteActive = ref(false)

      function startCartDialog() {
        deleteActive.value=false
        showCartDialog.value=true
      }
      function tryDelete() {
        if (deleteActive.value) {
          selectedModules.value = []
        } else {
          deleteActive.value = true
        }
      }

      return {
        selectedPackages,
        showFilter,
        selectedModules,
        minEntityFilter,
        onlyFunctionFilter,
        toggleModules,
        moduleIsActive,
        init,
        showingInfo,
        activeIndex,
        pageLoading,
        changePageActiveIndex,
        startCartDialog,
        tryDelete,
        filteredModuleInfo,
        showCartDialog,
        deleteActive,
      }
    })

