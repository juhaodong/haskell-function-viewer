import {defineStore} from "pinia";
import {ref} from "vue";
import {getPackageDetail} from "@/dataLayer/api/hackageApi";

export const usePreviewPageController =
  defineStore('preview-fragment-controller',
    () => {
      const selectedItems = ref([])

      async function init(selectedPackages) {
        selectedItems.value = selectedPackages
        await getInfoForIndex()
      }

      async function getInfoForIndex(index = 0) {
        const uri = selectedItems.value[index]
        const result = await getPackageDetail(uri)
        console.log(result)
      }

      return {selectedItems, init}
    })
