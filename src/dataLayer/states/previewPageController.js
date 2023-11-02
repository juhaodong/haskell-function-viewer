import {defineStore} from "pinia";
import {ref} from "vue";
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

      const minEntityFilter = ref(0)


      async function init(packages) {
        selectedPackages.value = packages
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
        return selectedModules.value.includes(moduleName)
      }

      function toggleModules(moduleName) {
        if (moduleIsActive(moduleName)) {
          selectedModules.value = selectedModules.value.filter(it => it !== moduleName)
        } else {
          selectedModules.value.push(moduleName)
        }

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

      return {
        selectedPackages,
        selectedModules,
        minEntityFilter,
        toggleModules,
        moduleIsActive,
        init,
        showingInfo,
        activeIndex,
        pageLoading,
        changePageActiveIndex
      }
    })
