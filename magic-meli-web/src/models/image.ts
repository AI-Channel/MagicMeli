export interface ImageMeta {
  id?: string
  title: string
  description: string
  uploadDate?: string
}
export interface Image extends ImageMeta {
  imageDataBase64: string
}
