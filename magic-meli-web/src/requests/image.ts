import type { Image, ImageMeta } from '@/models/image'
import instance from './axiosInstance'
import type { FileWithHandle } from 'browser-fs-access'

export async function getImageById(id: string): Promise<Image> {
  const response = await instance.get<Image>(`/image/${id}`)
  return response.data
}

export async function getImageRawById(id: string): Promise<Image> {
  const response = await instance.get<Image>(`/image/${id}/raw`)
  return response.data
}

export async function getImageList(): Promise<ImageMeta[]> {
  const response = await instance.get<ImageMeta[]>(`/image/all-images`)
  return response.data
}

export async function delImageById(id: string): Promise<Image> {
  const response = await instance.delete<Image>(`/image/${id}`)
  return response.data
}

export async function uploadImageBase64(params: Image) {
  const response = await instance.post<Image>('/image/upload', params)
  return response.data
}
