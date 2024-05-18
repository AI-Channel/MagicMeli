import Elysia, { t } from 'elysia'
import { ImageModel } from './image.model'
import { ImageService } from './image.service'

export const imageController = new Elysia({ prefix: '/image' })
  .use(ImageModel)
  .decorate({ Service: new ImageService() })
  .get(
    '/:id',
    ({ Service, params: { id } }) => {
      return Service.getImageById(id)
    },
    {
      params: t.Object({
        id: t.Integer()
      })
    }
  )
  .get('/list', ({ Service }) => {
    return Service.getImageList()
  })
