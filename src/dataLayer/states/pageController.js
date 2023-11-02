import {defineStore} from "pinia";
import {usePreviewPageController} from "@/dataLayer/states/previewPageController";
import {useSearchController} from "@/dataLayer/states/searchController";

export const TabNames = {
  Browse: 'Browse',
  Preview: 'Preview',
  Output: 'Output'
}
export const usePageController = defineStore('page-controller', {
  state: () => ({
    activeTabName: TabNames.Browse,
  }), actions: {
    goPreview(packages) {
      const preview = usePreviewPageController()
      preview.init(packages)
      const search = useSearchController()
      search.showCartDialog = false
      this.activeTabName = TabNames.Preview
    },
    goBack() {
      this.activeTabName = TabNames.Browse
    }
  }
})

