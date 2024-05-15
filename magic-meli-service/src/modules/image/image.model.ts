export interface ImageMeta {
  id: string
  title: string
  uploadDate: string
}
export interface Image extends ImageMeta {
  imageBase64: string
}
