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
    async goPreview() {
      const preview = usePreviewPageController()
      const search = useSearchController()
      console.log(search.selectedPackageUri,'123')
      this.activeTabName = TabNames.Preview
      await preview.init(search.selectedPackageUri)
      search.showCartDialog = false

    },
    goSearch() {
      this.activeTabName = TabNames.Browse
    },
    goTab(tabName) {
      switch (tabName) {
        case TabNames.Browse:
          this.goSearch();
          break;
        case TabNames.Preview:
          this.goPreview();
          break;
        case TabNames.Output:
      }
    }
  }
})

