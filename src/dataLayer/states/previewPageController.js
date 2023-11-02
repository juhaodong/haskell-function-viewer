import {defineStore} from "pinia";
import {ref} from "vue";
import {getPackageDetail} from "@/dataLayer/api/hackageApi";
import {groupBy} from "lodash-es";

export const usePreviewPageController =
  defineStore('preview-fragment-controller',
    () => {
      const selectedItems = ref([])
      const showingInfo = ref(null)

      async function init(selectedPackages) {
        selectedItems.value = selectedPackages
        showingInfo.value = await getInfoForIndex()
      }

      async function getInfoForIndex(index = 0) {
        const uri = selectedItems.value[index]
        const result = groupBy(await getPackageDetail(uri), 'module')
        return {
          uri,
          moduleInfo: Object.entries(result).map(([key,info])=>{
            return {
              module:key,
              info,
            }
          })
        }
      }

      return {selectedItems, init,showingInfo}
    })
