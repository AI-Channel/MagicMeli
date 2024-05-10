import { Injectable } from '@nestjs/common'
import { CreateArticleDto } from './dto/create-article.dto'
import { UpdateArticleDto } from './dto/update-article.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Article } from './entities/article.entity'
import { Repository } from 'typeorm'

@Injectable()
export class ArticlesService {
  constructor(@InjectRepository(Article) private articleRepository: Repository<Article>) {}
  create(createArticleDto: CreateArticleDto) {
    return 'This action adds a new article'
  }

  findAll(): Promise<Article[]> {
    return this.articleRepository.find()
  }

  findOne(id: number): Promise<Article | null> {
    return this.articleRepository.findOneBy({ id })
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return `This action updates a #${id} article`
  }

  async remove(id: number) {
    await this.articleRepository.delete(id)
  }
}
