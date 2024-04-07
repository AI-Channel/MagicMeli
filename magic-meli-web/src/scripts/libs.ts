function GetTheme() {
  return document.body.className
}
function SetTheme(theme: string) {
  document.body.className = theme
  localStorage.setItem('theme', theme)
}
function SwitchTheme() {
  if (document.body.className === 'light') {
    SetTheme('dark')
  } else {
    SetTheme('light')
  }
}
function Union(setA: Set<any>, setB: Set<any>) {
  return new Set([...setA, ...setB])
}
function Intersection(setA: Set<any>, setB: Set<any>) {
  return new Set([...setA].filter((x) => setB.has(x)))
}
function Difference(setA: Set<any>, setB: Set<any>) {
  return new Set([...setA].filter((x) => !setB.has(x)))
}
function isSubsetOf(setA: Set<any> | undefined, setB: Set<any> | undefined) {
  if (typeof setA == 'undefined') setA = new Set([])
  if (typeof setB == 'undefined') setB = new Set([])
  for (const item of setA) {
    if (setB.has(item) === false) return false
  }
  return true
}
export { SwitchTheme, GetTheme, SetTheme, Union, Intersection, Difference, isSubsetOf }
