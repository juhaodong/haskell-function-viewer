import hillo from "hillo";
import {sleep} from "@/plugins/utils";

const proxy = 'http://innerken.tpddns.cn/jsonProxy2.php?url='

export async function getAllPackages(searchQuery = "") {
  const numberOfResult = (await getPackageByPage(0))?.numberOfResults ?? 0
  const pageSize = 50
  const pageCount = Math.ceil(numberOfResult / pageSize)
  console.log(pageCount)
  const rqs = []
  for (let i = 0; i < 2; i++) {
    rqs.push(...(await getPackageByPage(i, searchQuery))?.pageContents ?? [])
    await sleep(50)
  }

  return rqs

}


export async function getPackageByPage(page, searchQuery) {
  return await hillo.jsonPost(`${proxy}https://hackage.haskell.org/packages/search`, {
    "page": page,
    "sortColumn": "default",
    "sortDirection": "ascending",
    "searchQuery": searchQuery
  })
}


export async function getPackageDetail(uri) {
  return await hillo.get(`https://hackage.haskell.org${uri}/docs/doc-index.json`)
}

export const hackageFilterDesc = " <h5>Usage</h5>" +
  "Apart from just writing words to search everywhere in package metadata," +
  " you can also use filters in the search query string input field above." +
  " Filters are surrounded by parentheses" +
  ". All filters have to pass for every package shown in the result," +
  " that is, it is a <b>logical conjunction.</b> <a href='https://hackage.haskell.org/packages/browse'>More reference.</a>"

