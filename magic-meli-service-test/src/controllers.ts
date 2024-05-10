import Database from 'bun:sqlite'
import { ArticleDto, ArticleMetaDto } from './models/article'
import { tagsObject, tagsObjectToArray } from './libs/tags'

const db = new Database('MagicMeli.db')

export class ArticleController {
  getArticleById(id: number) {
    const query = db.query<ArticleDto, number>(`SELECT * FROM article WHERE id == $param;`)
    const tagQuery = db.query<tagsObject, number>(
      `SELECT tag FROM tags WHERE id IN (SELECT tagId FROM articleHasTags WHERE articleId == $param)`
    )
    const article: ArticleDto | null = query.get(id)
    if (article == null) return null
    else article.tags = tagsObjectToArray(tagQuery.all(id))
    return article
  }
  getArticleByTitle(title: string) {
    const query = db.query<ArticleDto, string>(`SELECT * FROM article WHERE title == $param;`)
    const tagQuery = db.query<tagsObject, string>(
      `SELECT tag FROM tags WHERE id IN (SELECT tagId FROM articleHasTags WHERE articleId == $param)`
    )
    const article: ArticleDto | null = query.get(title)
    if (article == null) return null
    else article.tags = tagsObjectToArray(tagQuery.all(title))
    return article
  }

  getAriticleList() {
    const query = db.query<ArticleMetaDto, null>(
      `SELECT id,title,summary,author,category,isDeleted,isPublished,updateTime FROM article`
    )
    return query.all(null)
  }

  insertArticle(article: ArticleDto) {
    const insert = db.prepare(
      `INSERT INTO article (title,summary,author,content,category,updateTime,isPublished)
      VALUES($title,$summary,$author,$content,$category,$updateTime,$isPublished)
      RETURNING *`
    )
    insert.run({
      $title: article.title,
      $summary: article.summary ?? '',
      $author: article.author,
      $content: article.content,
      $category: article.category,
      $updateTime: new Date().toISOString(),
      $isPublished: article.isPublished ?? false
    })
    return this.getArticleByTitle(article.title)
  }

  deleteArticleById(id: number) {
    const query = db.query<ArticleDto, number>(`SELECT * FROM article WHERE id == $param;`)
    const del = db.prepare<ArticleDto, number>(`UPDATE article SET isDeleted=true WHERE id==$id`)
    del.run(id)
    const article: ArticleDto | null = query.get(id)
    return article
  }

  revertArticleById(id: number) {
    const query = db.query<ArticleDto, number>(`SELECT * FROM article WHERE id == $param;`)
    const revert = db.prepare<ArticleDto, number>(
      `UPDATE article SET isDeleted=false WHERE id==$id`
    )
    revert.run(id)
    const article: ArticleDto | null = query.get(id)
    return article
  }

  updateArticle(article: ArticleDto) {
    if (typeof article.id != 'number') {
      throw new Error('invalid article object')
    }
    const update = db.prepare(
      `UPDATE article SET title=$title,summary=$summary,author=$author,content=$content,category=$category,updateTime=$updateTime,isPublished=$isPublished WHERE id=$id`
    )
    update.run({
      $id: article.id,
      $title: article.title,
      $summary: article.summary ?? '',
      $author: article.author,
      $content: article.content,
      $category: article.category,
      $updateTime: new Date().toISOString(),
      $isPublished: article.isPublished ?? false
    })
  }

  hardDelArticleById(id: number) {
    const del = db.prepare<null, number>(`DELETE FROM article WHERE ID == $param`)
    del.run(id)
  }
}
