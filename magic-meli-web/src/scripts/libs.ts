import type { JwtTokenInfo } from '@/models/user'
import { toast, type ToastType } from 'vue3-toastify'

export function getTheme() {
  return document.body.className
}

export function setTheme(theme: string) {
  document.body.className = theme
  localStorage.setItem('theme', theme)
}

export function switchTheme() {
  if (document.body.className === 'light') {
    setTheme('dark')
  } else {
    setTheme('light')
  }
}

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

export function shuffle<T>(arr: T[]) {
  let i = arr.length
  let j = 0
  while (i) {
    j = Math.floor(Math.random() * i--)
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

export const getNowTimeStamp10 = () => Math.floor(new Date().getTime() / 1000)

export function autoToast(message: string, mode: ToastType) {
  switch (mode) {
    case 'default': {
      toast(message, {
        autoClose: 1500,
        position: toast.POSITION.TOP_CENTER
      })
      break
    }
    case 'error': {
      toast.error(message, {
        autoClose: 1500,
        position: toast.POSITION.TOP_CENTER
      })
      break
    }
    case 'info': {
      toast.info(message, {
        autoClose: 1500,
        position: toast.POSITION.TOP_CENTER
      })
      break
    }
    case 'loading': {
      toast.loading(message, {
        autoClose: 1500,
        position: toast.POSITION.TOP_CENTER
      })
      break
    }
    case 'success': {
      toast.success(message, {
        autoClose: 1500,
        position: toast.POSITION.TOP_CENTER
      })
      break
    }
    case 'warning': {
      toast.warning(message, {
        autoClose: 1500,
        position: toast.POSITION.TOP_CENTER
      })
      break
    }
  }
}

export function jwtDecode(token: string) {
  const jwtVerifyPattern = /^[\w-]*\.[\w-]*\.[\w-]*$/g
  const tokenHeadPattern = /.*?(?=\.)/g
  const tokenPayloadPattern = /(?<=\.).*?(?=\.)/g
  if (!jwtVerifyPattern.test(token)) return false
  const tokenHeadArray = tokenHeadPattern.exec(token)
  const tokenArray = tokenPayloadPattern.exec(token)
  if (tokenArray != null && tokenHeadArray != null) {
    const info: JwtTokenInfo = { head: JSON.parse(atob(tokenHeadArray[0])), payload: JSON.parse(atob(tokenArray[0])) }
    return info
  }
}
