import { NextFunction, Request, Response } from 'express'

export enum HTTPMethod {
  GET = 'get',
  POST = 'post',
  DELETE = 'delete',
  PUT = 'put'
}

export enum RouterParams {
  REQUEST = 'REQUEST',
  RESPONSE = 'RESPONSE',
  NEXT = 'NEXT',
  BODY = 'BODY',
  QUERY = 'QUERY',
  PARAM = 'PARAM',
  USER = 'USER'
}

export enum MetaKey {
  ROUTES = 'ROUTES',
  PREFIX = 'PREFIX',
  MIDDLEWARES = 'MIDDLEWARES',
  PARAMS = 'PARAMS',
  AUTH = 'AUTH'
}

export interface RouteDefinition {
  requestMethod: HTTPMethod
  path: string
  methodName: string
}

export type ExpressRequest = Request
export type ExpressResponse = Response
export type ExpressNext = NextFunction

export type ExpressMiddlewareFunction = (req: Request, res: Response, next: NextFunction) => void
