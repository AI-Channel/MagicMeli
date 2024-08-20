import type { ArticleListViewResponse, ArticleViewResponse } from '@/models/article'

const prefixList = ['default', 'tag', 'tags', 'reg', 'regex', 'title', 'sum', 'summary']

interface searchQuery {
  prefix: string
  queryText: string
}

export function prefixParse(searchText: string): searchQuery {
  const queryTextSplit = searchText.split(/\s*:|：\s*/)
  const prefix = prefixList.includes(queryTextSplit[0]) ? queryTextSplit[0] : 'default'
  const queryText = prefixList.includes(queryTextSplit[0]) ? queryTextSplit[queryTextSplit.length - 1] : searchText
  // console.log([prefix, queryText])
  return { prefix: prefix, queryText: queryText }
}

export function metaSearch(item: ArticleListViewResponse, searchText: string): boolean
export function metaSearch(item: ArticleViewResponse | ArticleListViewResponse, searchText: string): boolean {
  const parsedText = prefixParse(searchText)
  let searchShowCase: boolean
  switch (parsedText.prefix) {
    case 'reg':
    case 'regex':
      try {
        new RegExp(parsedText.queryText)
      } catch (e) {
        return false
      }
      searchShowCase = item.title.match(parsedText.queryText) || item.summary.match(parsedText.queryText) ? true : false
      if ('content' in item) searchShowCase ||= item.content.match(parsedText.queryText) ? true : false
      break
    case 'tag':
    case 'tags': {
      searchShowCase = item.tags.includes(parsedText.queryText) || parsedText.queryText == ''
      break
    }
    case 'title':
      searchShowCase = item.title.toLocaleLowerCase().includes(parsedText.queryText.toLocaleLowerCase())
      break
    case 'sum':
    case 'summary':
      searchShowCase = item.summary.toLocaleLowerCase().includes(parsedText.queryText.toLocaleLowerCase())
      break
    case 'default':
    default:
      searchShowCase =
        item.title.toLocaleLowerCase().includes(parsedText.queryText.toLocaleLowerCase()) ||
        item.summary.toLocaleLowerCase().includes(parsedText.queryText.toLocaleLowerCase())
      if ('content' in item)
        searchShowCase ||= item.content.toLocaleLowerCase().includes(parsedText.queryText.toLocaleLowerCase())
  }
  return searchShowCase
}
// const areaPrefix = new Set(['default', 'meta', 'title', 'author', 'summary', 'content', 'tag', 'tags', 'all'])
// const modePrefix = new Set(['default', 'reg', 'regex', 'i', 'ignore'])

// function prefixParse(queryText:string) {}

// export function search(searchText: string) {
//   const queryList = searchText.split(/\s+/)
//   console.log('Query List: ' + queryList)
//   for (const queryText of queryList) {
//     const queryTextSplit = queryText.split(/:|：/)
//     const prefix = areaPrefix.has(queryTextSplit[0]) ? queryTextSplit[0] : 'default'
//     const queryWord = areaPrefix.has(prefix) ? queryTextSplit[queryTextSplit.length - 1] : queryText
//     console.log([prefix, queryWord])
//   }
// }
