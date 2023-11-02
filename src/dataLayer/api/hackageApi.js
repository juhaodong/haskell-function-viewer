import hillo from "hillo";

const proxy = 'https://api.aaden.online/result.php?url='

export async function getAllPackageWithDocs() {
  return await hillo.get(`${proxy}https://hackage.haskell.org/packages/docs`)
}


export async function getPackageByPage(page, searchQuery) {
  return await hillo.jsonPost(`${proxy}https://hackage.haskell.org/packages/search`, {
    "page": page,
    "sortColumn": "default",
    "sortDirection": "ascending",
    "searchQuery": searchQuery+'(ageOfLastUpload < 1y)'
  })
}


export async function getPackageDetail(uri) {
  return await hillo.get(`${proxy}https://hackage.haskell.org/package/${uri}/docs/doc-index.json`)
}

