import {defineStore} from "pinia";
import {computed, ref} from "vue";

export const useOutputController = defineStore('output-page', () => {
  const modules = ref([])
  const downloadableInfo = computed(() => {
    return modules.value.map(it => it.info.map(t => handleInfo(t.display_html))).flat().filter(it => it)
  })
  return {modules, downloadableInfo}
})

export function handleInfo(rawHtml) {
  try {
    const parser = new DOMParser()
    const doc = parser.parseFromString(rawHtml, 'text/html')
    const signature = Array.from(doc.body.childNodes).map(it => {
      if (it.nodeType === 3) {
        return it.nodeValue
      } else {
        return it.innerHTML
      }
    }).join('')
    if (signature.includes('->') || signature.includes('::')&&!signature.includes("<li>")) {
      let [name, rest] = signature.split('::')
      let functionParameterAndReturns = rest.split('->')
      let constrains = ""
      if (functionParameterAndReturns?.[0].includes('=>')) {
        const [c, tmp] = functionParameterAndReturns[0].split('=>')
        constrains = c
        functionParameterAndReturns[0] = tmp
        console.log(constrains, 'discard')
      }
      const retValue = functionParameterAndReturns.pop()
      return `Symbol {symbol="${name}", arguments = [${functionParameterAndReturns.map(toType).join(',')}], result = ${toType(retValue)}}`

    } else {
      return ""
    }
  } catch (e) {
    return ""
  }


}


function toType(typeString) {
  return `Type {name="${typeString.trim()}"}`

}
