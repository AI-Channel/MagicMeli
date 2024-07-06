import Elysia, { t } from 'elysia'

export const ImageModel = new Elysia().model({
  'image.transfer': t.Object({ title: t.String(), imageLink: t.String() })
})
