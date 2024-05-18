import Database from "bun:sqlite"

export interface ImageMeta {
  id: string
  title: string
  updateTime: string
}
export interface Image extends ImageMeta {
  imageData: BlobPart
}

export class ImageService{
    private db = new Database('MagicMeli.db')
    getImageById(id:number){
        return this.db.query(`SELECT title,imageLink FROM image WHERE id=$id`).get(id)
    }
    getImageList(){
        return this.db.query(`SELECT title,imageLink FROM image`).all()
    }
}