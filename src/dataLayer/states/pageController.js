import {defineStore} from "pinia";
import {usePreviewPageController} from "@/dataLayer/states/previewPageController";
import {useSearchController} from "@/dataLayer/states/searchPage/searchController";
import {useOutputController} from "@/dataLayer/states/outputPageController";

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
      this.activeTabName = TabNames.Preview
      await preview.init(search.selectedPackage)
      search.showCartDialog = false

    },
    async goOutput() {
      const preview = usePreviewPageController()
      const output
        = useOutputController()
      output.modules.push(...preview.selectedModules)
      this.activeTabName = TabNames.Output
      preview.showCartDialog = false

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
          this.goOutput();
          break;
      }
    }
  }
})

