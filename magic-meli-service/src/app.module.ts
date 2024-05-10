import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ArticlesModule } from './articles/articles.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Article } from './articles/entities/article.entity'

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ArticlesModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'MagicMeli.db',
      autoLoadEntities: true,
      synchronize: true,
      entities: [Article]
    })
  ]
})
export class AppModule {}
