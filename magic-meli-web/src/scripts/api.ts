import instance from './axiosinstance'

export async function get<T>(url: string, params?: any): Promise<T> {
  const response = await instance.get<T>(url, { params })
  return response.data
}

export async function post<T>(url: string, data?: any): Promise<T> {
  const response = await instance.post<T>(url, data)
  return response.data
}

export async function put<T>(url: string, data?: any): Promise<T> {
  const response = await instance.put<T>(url, data)
  return response.data
}

export async function del<T>(url: string, params?: any): Promise<T> {
  const response = await instance.put<T>(url, { params })
  return response.data
}
