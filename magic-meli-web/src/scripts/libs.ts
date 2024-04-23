function getTheme() {
  return document.body.className
}
function setTheme(theme: string) {
  document.body.className = theme
  localStorage.setItem('theme', theme)
}
function switchTheme() {
  if (document.body.className === 'light') {
    setTheme('dark')
  } else {
    setTheme('light')
  }
}

function union<T>(setA: Set<T>, setB: Set<T>): Set<T> {
  return new Set([...setA, ...setB])
}
function intersection<T>(setA: Set<T>, setB: Set<T>): Set<T> {
  return new Set([...setA].filter((x) => setB.has(x)))
}
function difference<T>(setA: Set<T>, setB: Set<T>): Set<T> {
  return new Set([...setA].filter((x) => !setB.has(x)))
}
function isSubsetOf<T>(setA: Set<T> | undefined, setB: Set<T> | undefined) {
  if (typeof setA == 'undefined') setA = new Set([])
  if (typeof setB == 'undefined') setB = new Set([])
  for (const item of setA) {
    if (setB.has(item) === false) return false
  }
  return true
}

function shuffle(arr: any) {
  let i = arr.length
  let j = 0
  while (i) {
    j = Math.floor(Math.random() * i--)
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

function titleToUpperCase(str: string) {
  return str.toLowerCase().replace(/( |^)[a-z]/g, (i) => i.toUpperCase())
}
export {
  switchTheme,
  getTheme,
  setTheme,
  union,
  intersection,
  difference,
  isSubsetOf,
  shuffle,
  titleToUpperCase
}
