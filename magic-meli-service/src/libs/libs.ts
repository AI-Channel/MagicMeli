import { SnowflakeIdv1 } from 'simple-flakeid'
import { usersLevelNum, usersLevelStr } from '../modules/user/user.model'

export const idGenerate = () => new SnowflakeIdv1({ workerId: 1, baseTime: 1704038400000 }).NextId()

export const jwtTokenSecret =
  '58fd7d0a2900b0364db82a5ac936bebd9d6adae9efc6537c2f2d9a1fa71dc05a5eeb2d3f23cea280a6d1e8c0b662f1d437996c1136a573c76b5df39ed23af14b76c109363fb1017f512851ee80db70784960ec3ad970b4762712406e52af7eaf50a8be556c6ce9ab2fd2feb4128698d8f05dd23d3d03059f8067febe63048c5ec0bb8f59e2c085b712c1d3407d9edf19dadb1866aa7ba26123903323515bffd745c4a819f3ab0de9fb85fd580b3149e4f0aca40d0192b4f6d944ac2ea8af1f2cd147924b7abbaf7362fb2a98b1dd7f92e4ef96d12ae23d3c0f6de0e70b3659dabcb56c0a7a8c659698bf9089ed9d791911462763abfcfdecde9040b5991817c3'

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

export function userLevelStrtoNum(levelStr: usersLevelStr) {
  return usersLevelNum[levelStr]
}

export function userLevelNumtoStr(levelNum: usersLevelNum) {
  switch (levelNum) {
    case 0:
      return usersLevelStr.guest
    case 1:
      return usersLevelStr.user
    case 2:
      return usersLevelStr.editor
    case 3:
      return usersLevelStr.admin
    default:
      return usersLevelStr.guest
  }
}
