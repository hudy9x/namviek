export enum HTTPMethod {
  GET = 'GET',
  POST = 'POST',
  DELETE = 'DELETE',
  PUT = 'PUT'
}

export enum MetaKey {
  ROUTES = 'ROUTES',
  PREFIX = 'PREFIX',
  MIDDLEWARES = 'MIDDLEWARES',
  PARAMS = 'PARAMS'
}

export interface RouteDefinition {
  requestMethod: HTTPMethod
  path: string
  methodName: string
}
