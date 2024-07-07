import Database, { SQLQueryBindings } from 'bun:sqlite'
import { difference, idGenerate, userLevelNumtoStr, userLevelStrtoNum } from '../../libs/libs'
import {
  ArticleDtoIn,
  ArticleDtoOut,
  ArticleEntity,
  ArticleListDtoOut,
  ArticleListEntity,
  articleStatusHandles,
  listQueryMode
} from './article.model'
import { usersLevelStr } from '../user/user.model'

interface tagsObject {
  id: number
  tag: string
  refCount: number
}

export class ArticleService {
  private tempArticleHasTagsTable = `SELECT articleId,tags.tag FROM articleHasTags JOIN tags WHERE articleHasTags.tagId == tags.id`
  private db = new Database('MagicMeli.db')
  private defaultTagObj: tagsObject = { id: 0, tag: 'error', refCount: 0 }

  getArticleById = (id: number) => {
    const article = this.db.query<ArticleEntity, number>(`SELECT * FROM article WHERE id == $param`).get(id) ?? false
    if (!article) return false
    return this.articleEntitytoDtoOut(article)
  }

  getArticleList(mode: listQueryMode) {
    let queryCondition = ''
    try {
      switch (mode) {
        case listQueryMode.published:
          queryCondition = `isDeleted == 0 AND isPublished == 1`
          break
        case listQueryMode.deleted:
          queryCondition = `isDeleted == 1`
          break
        case listQueryMode.draft:
          queryCondition = `isDeleted == 0 AND isPublished == 0`
          break
        default:
          throw new Error('Invalid list status!')
      }
    } catch (error) {
      console.warn(error)
      return false
    }
    const articleList = this.db
      .query<ArticleListEntity, null>(
        `SELECT id,title,summary,author,category,isDeleted,isPublished,updateTime,permission 
        FROM article WHERE ${queryCondition} 
        ORDER BY id `
      )
      .all(null)
    const articleListReturn: ArticleListDtoOut[] = []

    for (const article of articleList) {
      articleListReturn.push({
        id: article.id,
        summary: article.summary,
        title: article.title,
        author: article.author,
        category: article.category,
        tags: this.getArticleTagsById(article.id),
        isDeleted: article.isDeleted,
        isPublished: article.isPublished,
        updateTime: article.updateTime,
        permission: userLevelNumtoStr(article.permission)
      })
    }
    return articleListReturn
  }

  getArticleMetaById(id: number) {
    const articleMeta = this.db
      .query<ArticleListEntity, number>(
        `SELECT id,title,summary,author,category,isDeleted,isPublished,updateTime,permission 
        FROM article WHERE id=$id`
      )
      .get(id)
    if (!articleMeta) return false
    return this.articleListEntityToDtoOut(articleMeta)
  }

  insertArticle = this.db.transaction((article: ArticleDtoIn): ArticleDtoOut | false => {
    const echo = this.db
      .query<ArticleEntity, SQLQueryBindings>(
        `INSERT INTO article (id,title,summary,author,content,category,updateTime,isPublished,permission)
      VALUES($id,$title,$summary,$author,$content,$category,$updateTime,$isPublished,$permission) 
      RETURNING *`
      )
      .get({
        $id: idGenerate(),
        $title: article.title,
        $summary: article.summary ?? '',
        $author: article.author,
        $content: article.content,
        $category: article.category,
        $updateTime: new Date().toISOString(),
        $isPublished: article.isPublished ?? false,
        $permission: userLevelStrtoNum(article.permission)
      })
    if (echo) {
      this.updateAllTags(echo.id, article.tags)
      return this.articleEntitytoDtoOut(echo)
    } else return false
  })

  updateArticleStatusById(id: number, mode: articleStatusHandles) {
    let dbHandle = ''
    try {
      switch (mode) {
        case articleStatusHandles.delete:
          dbHandle = `isDeleted = true`
          break
        case articleStatusHandles.revert:
          dbHandle = `isDeleted = false`
          break
        case articleStatusHandles.publish:
          dbHandle = `isPublished = true`
          break
        case articleStatusHandles.unpublish:
          dbHandle = `isPublished = false`
          break
        default:
          throw new Error('Invalid update mode!')
      }
    } catch (error: unknown) {
      console.warn(error)
      return false
    }
    const echo =
      this.db
        .query<
          ArticleEntity,
          SQLQueryBindings
        >(`UPDATE article SET ${dbHandle},updateTime = $time WHERE id == $id RETURNING *`)
        .get({ $id: id, $time: new Date().toISOString() }) ?? false
    if (!echo) return false
    else return this.articleEntitytoDtoOut(echo)
  }

  updatePermissionById(id: number, permission: usersLevelStr) {
    const echo = this.db
      .query<ArticleEntity, SQLQueryBindings>(`UPDATE article SET permission = $permission WHERE id = $id RETURNING *`)
      .get({ $id: id, $permission: userLevelStrtoNum(permission) })
    if (!echo) return false
    else return this.articleEntitytoDtoOut(echo)
  }

  updateArticle = this.db.transaction((id: number, article: ArticleDtoIn): ArticleDtoOut | false => {
    const update = this.db.query<ArticleEntity, SQLQueryBindings>(
      `UPDATE article 
      SET title = $title, summary = $summary, author = $author,content = $content, category = $category, updateTime = $updateTime, isPublished = $isPublished, permission = $permission 
      WHERE id = $id 
      RETURNING *`
    )

    const echo = update.get({
      $id: id,
      $title: article.title,
      $summary: article.summary,
      $author: article.author,
      $content: article.content,
      $category: article.category,
      $updateTime: new Date().toISOString(),
      $isPublished: article.isPublished,
      $permission: userLevelStrtoNum(article.permission)
    })
    this.updateAllTags(id, article.tags)
    if (echo) {
      this.updateAllTags(echo.id, article.tags)
      return this.articleEntitytoDtoOut(echo)
    } else return false
  })

  hardDelArticleById(id: number) {
    const echo = this.db.query<ArticleEntity, number>(`DELETE FROM article WHERE ID == $param RETURNING *`).get(id)
    if (echo) this.updateAllTags(echo.id, this.getArticleTagsById(echo.id))
    else return false
  }

  getTagsList() {
    return this.db.query<tagsObject, null>(`SELECT DISTINCT id,tag FROM tags`).all(null)
  }

  getAllCategories() {
    const categories = this.db.query(`SELECT DISTINCT category FROM article ORDER BY category`).values()
    const outputArray = []
    for (const item of categories) {
      outputArray.push(...item)
    }
    return outputArray
  }

  private articleListEntityToDtoOut(articleMeta: ArticleListEntity): ArticleListDtoOut {
    return {
      id: articleMeta.id,
      title: articleMeta.title,
      summary: articleMeta.summary,
      author: articleMeta.author,
      category: articleMeta.category,
      tags: this.getArticleTagsById(articleMeta.id),
      isDeleted: articleMeta.isDeleted,
      isPublished: articleMeta.isPublished,
      updateTime: articleMeta.updateTime,
      permission: userLevelNumtoStr(articleMeta.permission)
    }
  }

  private articleEntitytoDtoOut(article: ArticleEntity): ArticleDtoOut {
    return {
      id: article.id,
      title: article.title,
      summary: article.summary,
      author: article.author,
      content: article.content,
      category: article.category,
      tags: this.getArticleTagsById(article.id),
      isDeleted: article.isDeleted,
      isPublished: article.isPublished,
      updateTime: article.updateTime,
      permission: userLevelNumtoStr(article.permission)
    }
  }
  private getArticleTagsObjectById = (id: number) => {
    return this.db
      .query<
        tagsObject,
        number
      >(`SELECT articleId as id,tag FROM (${this.tempArticleHasTagsTable}) WHERE articleId = $id`)
      .all(id)
  }

  private getArticleTagsById(id: number) {
    return this.tagsObjectToArray(this.getArticleTagsObjectById(id))
  }

  private tagsObjectToArray(tagsObjectArray: tagsObject[]) {
    const outputArray: string[] = []
    for (const item of tagsObjectArray) {
      outputArray.push(item.tag)
    }
    return outputArray
  }

  private getTagByTagName(tagname: string) {
    return this.db.query<tagsObject, string>(`SELECT * FROM tags WHERE tag == $tagname`).get(tagname)
  }

  private insertTag = this.db.transaction((tag: string) => {
    return (
      this.db.query<tagsObject, string>(`INSERT INTO tags (tag) VALUES ($tag) RETURNING *`).get(tag) ??
      this.defaultTagObj
    )
  })

  private deleteTag = this.db.transaction((tag: string) => {
    return (
      this.db.query<tagsObject, string>(`DELETE FROM tags WHERE tag = $tag RETURNING *`).get(tag) ?? this.defaultTagObj
    )
  })

  private deleteTagMap = this.db.transaction((articleId: number, tag: string) => {
    let thisTagObj: tagsObject = this.getTagByTagName(tag) ?? this.defaultTagObj
    this.db.query(`DELETE FROM articleHasTags WHERE articleId = $id AND tagId = $tagId;`).run({
      $id: articleId,
      $tagId: thisTagObj.id
    })
    thisTagObj =
      this.db
        .query<tagsObject, number>(`UPDATE tags SET refCount = refCount - 1 WHERE id = $tagId RETURNING *`)
        .get(thisTagObj.id) ?? this.defaultTagObj
    if (thisTagObj.refCount == 0) {
      this.deleteTag(thisTagObj.tag)
    }
  })

  private insertTagMap = this.db.transaction((articleId: number, tagName: string) => {
    let thisTagObj = this.getTagByTagName(tagName) ?? this.defaultTagObj
    if (thisTagObj.id == 0) {
      thisTagObj = this.insertTag(tagName)
    }
    this.db
      .query(`INSERT INTO articleHasTags (articleId,tagId) VALUES ($articleId,$tagId)`)
      .run({ $articleId: articleId, $tagId: thisTagObj.id })
    this.db.query(`UPDATE tags SET refCount = refCount + 1 WHERE id = $tagId`).run({ $tagId: thisTagObj.id })
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
