import { SnowflakeIdv1 } from 'simple-flakeid'

export const idGenerate = () => new SnowflakeIdv1({ workerId: 1, baseTime: 1704038400000 }).NextId()

export function union<T>(setA: Set<T>, setB: Set<T>): Set<T> {
  return new Set([...setA, ...setB])
}

export function intersection<T>(setA: Set<T>, setB: Set<T>): Set<T> {
  return new Set([...setA].filter((x) => setB.has(x)))
}

export function difference<T>(setA: Set<T>, setB: Set<T>): Set<T> {
  return new Set([...setA].filter((x) => !setB.has(x)))
}

export function isSubsetOf<T>(setA: Set<T> | undefined, setB: Set<T> | undefined) {
  if (typeof setA == 'undefined') setA = new Set([])
  if (typeof setB == 'undefined') setB = new Set([])
  for (const item of setA) {
    if (setB.has(item) === false) return false
  }
  return true
}

export function shuffle<T>(arr: Array<T>) {
  let i = arr.length
  let j = 0
  while (i) {
    j = Math.floor(Math.random() * i--)
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}
