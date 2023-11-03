import {defineStore} from "pinia";

import {getAllPackages} from "@/dataLayer/repository/hackageRepo";
import {useSearchFilter} from "@/dataLayer/states/searchPage/useSearchFilter";

export const useSearchController =
  defineStore('search-fragment-controller',
    {
      state() {
        return {
          packageList: [],
          selectedPackage: [],
          loading: true,
          searchQuery: '',
          currentPage: 0,
          totalPageCount: 0,
          showCartDialog: false,
          deleteActive: false,
        }
      },
      getters: {
        activePackages() {
          return this.selectedPackage
        },
        pageCount() {
          return Math.ceil(this.totalPageCount / 50)
        }

      },
      actions: {
        showCart() {
          this.deleteActive = false
          this.showCartDialog = true
        },
        tryDelete() {
          if (this.deleteActive) {
            this.showCartDialog = false
            this.selectedPackage = []
          } else {
            this.deleteActive = true
          }
        },
        async changeActivePage(newPageIndex) {
          if (newPageIndex < this.pageCount) {
            this.currentPage = newPageIndex
          } else {
            this.currentPage = 0
          }
          await this.loadList()
        },
        async loadList() {
          this.loading = true
          let filterQuery = ""
          const filter = useSearchFilter()
          if (filter.downloadLimit > 0) {
            filterQuery += `(downloads > ${filter.downloadLimit})`
          }
          if (filter.ratingLimit > 0) {
            filterQuery += `(rating >= ${filter.ratingLimit})`
          }
          const res =
            await getAllPackages(this.searchQuery + filterQuery, this.currentPage)
          this.packageList = res.result
          this.totalPageCount = Math.ceil(res.numberOfResults / 50)
          this.loading = false
        },
        togglePackageUri(p) {
          if (this.packageIsActive(p.name.uri)) {
            this.selectedPackage = this.selectedPackage.filter(it => it.name.uri !== p.name.uri)
          } else {
            this.selectedPackage.push(p)
          }
        },
        packageIsActive(uri) {
          return this.selectedPackage.find(it=>it.name.uri===uri)
        },

      }
    }
  )
