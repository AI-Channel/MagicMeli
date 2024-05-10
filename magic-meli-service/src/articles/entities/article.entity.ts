import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number
  @Column()
  title: string
  @Column()
  author: string
  @Column()
  category: string
  @Column()
  summary: string
  @Column()
  updateTime: string
  @Column()
  isDeleted: boolean
  @Column()
  isPublished: boolean
  @Column()
  tags: string[]
}
