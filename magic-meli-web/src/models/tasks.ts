import type { LocationQueryRaw, RouteMeta, RouteParamsGeneric, RouteRecordNameGeneric } from 'vue-router'

export interface routeInfo {
  path: string
  name?: RouteRecordNameGeneric
  meta?: RouteMeta
  params?: RouteParamsGeneric
  query?: LocationQueryRaw
}
