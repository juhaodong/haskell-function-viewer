import {getAllPackageWithDocs, getPackageByPage} from "@/dataLayer/api/hackageApi";
import {keyBy} from "lodash-es";

let docMap = null

export async function getDocsMap() {
  if (!docMap) {
    docMap = keyBy((await getAllPackageWithDocs()).filter(it => it.docs), 'pkgid')
  }
  return docMap
}

export async function getAllPackages(searchQuery = "") {
  const doc = await getDocsMap()
  console.log(doc)
  const res = ((await getPackageByPage(0, searchQuery))?.pageContents ?? []).filter(it => doc[it.name.display + '-' + it.lastVersion])
  console.log(res)
  return res
}

export const hackageFilterDesc = " <h5>Usage</h5>" +
  "Apart from just writing words to search everywhere in package metadata," +
  " you can also use filters in the search query string input field above." +
  " Filters are surrounded by parentheses" +
  ". All filters have to pass for every package shown in the result," +
  " that is, it is a <b>logical conjunction.</b> <a href='https://hackage.haskell.org/packages/browse'>More reference.</a>"
