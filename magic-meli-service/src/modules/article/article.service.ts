import Database, { SQLQueryBindings } from 'bun:sqlite'
import { difference, idGenerate } from '../../libs/libs'

interface ArticleMetaDto {
  id?: number
  title: string
  author: string
  summary?: string
  updateTime?: string
  tags?: string[]
  category: string
  isDeleted?: boolean
  isPublished?: boolean
}
interface ArticleDto extends ArticleMetaDto {
  content: string
}
interface tagsObject {
  id: number
  tag: string
}

export class ArticleService {
  private tempArticleHasTagsTable = `SELECT articleId,tags.tag FROM articleHasTags JOIN tags WHERE articleHasTags.tagId == tags.id`
  private db = new Database('MagicMeli.db')
  private defalutTagObj: tagsObject = { id: 0, tag: 'error' }

  getArticleById = (id: number) => {
    const article: ArticleDto | null = this.db.query<ArticleDto, number>(`SELECT * FROM article WHERE id == $param`).get(id)
    if (article == null) return null
    else article.tags = this.getArticleTagsById(id)
    return article
  }

  getAriticleList(mode: string) {
    let queryCondition = ''
    switch (mode) {
      case 'article':
        queryCondition = `isDeleted == 0 AND isPublished == 1`
        break
      case 'deleted':
        queryCondition = `isDeleted == 1`
        break
      case 'draft':
        queryCondition = `isDeleted == 0 AND isPublished == 0`
        break
      default:
        throw console.warn('Invalid list status!')
    }
    const articleList = this.db
      .query<
        ArticleMetaDto,
        null
      >(`SELECT id,title,summary,author,category,isDeleted,isPublished,updateTime FROM article WHERE ${queryCondition} ORDER BY id`)
      .all(null)
    for (const article of articleList) {
      article.tags = this.getArticleTagsById(article.id ?? 0)
    }
    return articleList
  }

  insertArticle(article: ArticleDto) {
    const insert = this.db.prepare<ArticleDto, SQLQueryBindings>(
      `INSERT INTO article (id,title,summary,author,content,category,updateTime,isPublished)
      VALUES($id,$title,$summary,$author,$content,$category,$updateTime,$isPublished) RETURNING *`
    )
    const echo = insert.get({
      $id: idGenerate(),
      $title: article.title,
      $summary: article.summary ?? '',
      $author: article.author,
      $content: article.content,
      $category: article.category,
      $updateTime: new Date().toISOString(),
      $isPublished: article.isPublished ?? false
    })
    if (echo) {
      this.updateAllTags(echo.id, article.tags)
      echo.tags = this.getArticleTagsById(echo.id ?? 0)
    }
    this.tagGarbageCollection()
    return echo
  }

  updateArticleStatusById(id: number, mode: string) {
    let dbHandle = ''
    switch (mode) {
      case 'delete':
        dbHandle = `isDeleted = true`
        break
      case 'revert':
        dbHandle = `isDeleted = false`
        break
      case 'publish':
        dbHandle = `isPublished = true`
        break
      case 'unpublish':
        dbHandle = `isPublished = false`
        break
      default:
        throw console.warn('Invalid update mode!')
    }
    const updateTime = new Date().toISOString()
    return this.db
      .prepare<ArticleDto, SQLQueryBindings>(`UPDATE article SET ${dbHandle},updateTime = $time WHERE id==$id RETURNING *`)
      .get({ $id: id, $time: updateTime })
  }

  updateArticle(article: ArticleDto) {
    if (typeof article.id != 'number') {
      throw new Error('invalid article object')
    }
    const update = this.db.prepare<ArticleDto, SQLQueryBindings>(
      `UPDATE article 
      SET title=$title,summary=$summary,author=$author,content=$content,category=$category,updateTime=$updateTime,isPublished=$isPublished 
      WHERE id=$id RETURNING *`
    )
    const echo = update.get({
      $id: article.id,
      $title: article.title,
      $summary: article.summary ?? '',
      $author: article.author,
      $content: article.content,
      $category: article.category,
      $updateTime: new Date().toISOString(),
      $isPublished: article.isPublished ?? false
    })
    this.updateAllTags(article.id, article.tags)
    if (echo) echo.tags = this.getArticleTagsById(echo.id ?? 0)
    return echo
  }

  hardDelArticleById(id: number) {
    const del = this.db.prepare<null, number>(`DELETE FROM article WHERE ID == $param`)
    del.run(id)
  }

  getTagsList() {
    return this.db.query<tagsObject, null>(`SELECT id,tag FROM tags`).all(null)
  }

  getAllCategories() {
    const categories = this.db.query(`SELECT DISTINCT category FROM article ORDER BY category`).values()
    const outputArray = []
    for (const item of categories) {
      outputArray.push(...item)
    }
    return outputArray
  }

  tagGarbageCollection = this.db.transaction((tag: string) => {
    this.db
      .prepare(
        `DELETE FROM tags WHERE tag=(SELECT DISTINCT tags.tag FROM articleHasTags RIGHT JOIN tags ON articleHasTags.tagId == tags.id WHERE articleId is null)`
      )
      .run(tag)
  })

  private getArticleTagsObjectById = (id: number) => {
    return this.db.query<tagsObject, number>(`SELECT articleId as id,tag FROM (${this.tempArticleHasTagsTable}) WHERE articleId=$id`).all(id)
  }

  private getArticleTagsById = (id: number) => {
    return this.tagsObjectToArray(this.getArticleTagsObjectById(id))
  }

  private tagsObjectToArray(tagsObjectArray: tagsObject[]) {
    const outputArray: string[] = []
    for (const item of tagsObjectArray) {
      outputArray.push(item.tag)
    }
    return outputArray
  }

  private getTagByTagName = (tagname: string) => {
    return this.db.query<tagsObject, string>(`SELECT id,tag FROM tags WHERE tag == $tagname`).get(tagname)
  }

  private insertTag = this.db.transaction((tag: string) => {
    return this.db.prepare<tagsObject, string>(`INSERT INTO tags (tag) VALUES ($tag) RETURNING *`).get(tag) ?? this.defalutTagObj
  })

  private deleteTagMap = this.db.transaction((articleId: number, tag: string) => {
    const thisTag: tagsObject = this.getTagByTagName(tag) ?? this.defalutTagObj
    this.db.prepare(`DELETE FROM articleHasTags WHERE articleId = $id AND tagId = $tag`).run({
      $id: articleId,
      $tag: thisTag.id
    })
  })

  private insertTagMap = this.db.transaction((articleId: number, tagName: string) => {
    let thisTagObj = this.getTagByTagName(tagName) ?? this.defalutTagObj
    if (thisTagObj.id == 0) {
      thisTagObj = this.insertTag(tagName)
    }
    this.db.prepare(`INSERT INTO articleHasTags (articleId,tagId) VALUES ($articleId,$tagId)`).run({ $articleId: articleId, $tagId: thisTagObj.id })
  })

  private updateAllTags = this.db.transaction((articleId: number, tags: string[]) => {
    const prevTags = new Set(this.getArticleTagsById(articleId))
    const currentTags = new Set(tags)
    const tagsNeedtoDel = [...difference(prevTags, currentTags)]
    const tagsNeedToAdd = [...difference(currentTags, prevTags)]
    for (const tag of tagsNeedtoDel) this.deleteTagMap(articleId, tag)
    for (const tag of tagsNeedToAdd) this.insertTagMap(articleId, tag)
  })
}
