import Elysia, { t } from 'elysia'
import { ImageModel } from './image.model'
import { ImageService } from './image.service'

export const imageController = new Elysia({ prefix: '/image' })
  .use(ImageModel)
  .decorate({ ImageService: new ImageService() })
  .get(
    '/:id',
    ({ ImageService, params: { id } }) => {
      return ImageService.getImageById(id)
    },
    {
      params: t.Object({
        id: t.Numeric()
      })
    }
  )
  .get('/list', ({ ImageService }) => {
    return ImageService.getImageList()
  })
