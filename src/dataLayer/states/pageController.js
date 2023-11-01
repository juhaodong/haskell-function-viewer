import {defineStore} from "pinia";
import {usePreviewPageController} from "@/dataLayer/states/previewPageController";

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
      this.activeTabName = TabNames.Preview
    }
  }
})

