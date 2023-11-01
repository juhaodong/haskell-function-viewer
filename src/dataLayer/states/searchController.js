import {defineStore} from "pinia";
import {getAllPackages} from "@/dataLayer/api/hackageApi";

export const useSearchController =
  defineStore('search-fragment-controller',
    {
      state() {
        return {
          packageList: [],
          selectedPackageUri: [],
          loading: true,
          searchQuery: '',
          currentPage: 0,
          downloadLimit: 0,
          ratingLimit: 0,
          showCartDialog: false,
          deleteActive: false,
          showFilterDialog: false,
        }
      },
      getters: {
        activePackages() {
          return this.packageList.filter(it => this.packageIsActive(it.name.uri))
        },
        usingFilters() {
          return this.ratingLimit > 0 || this.downloadLimit > 0
        }
      },
      actions: {
        async useFilter() {
          this.showFilterDialog = false
          await this.loadList()
        },
        resetFilter() {
          this.ratingLimit = 0
          this.downloadLimit = 0
        },
        showFilter() {
          this.showFilterDialog = true
        },
        showCart() {
          this.deleteActive = false
          this.showCartDialog = true
        },
        tryDelete() {
          if (this.deleteActive) {
            this.showCartDialog = false
            this.selectedPackageUri = []
          } else {
            this.deleteActive = true
          }
        },
        async loadList() {
          this.loading = true
          let filterQuery = ""
          if (this.downloadLimit > 0) {
            filterQuery += `(downloads > ${this.downloadLimit})`
          }
          if (this.ratingLimit > 0) {
            filterQuery += `(rating >= ${this.ratingLimit})`
          }
          this.packageList = await getAllPackages(this.searchQuery + filterQuery)
          console.log(this.packageList, 'packageList')
          this.loading = false
        },
        togglePackageUri(uri) {
          if (this.packageIsActive(uri)) {
            this.selectedPackageUri = this.selectedPackageUri.filter(it => it !== uri)
          } else {
            this.selectedPackageUri.push(uri)
          }
        },
        packageIsActive(uri) {
          return this.selectedPackageUri.includes(uri)
        },

      }
    }
  )
