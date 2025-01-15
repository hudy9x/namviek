import {
  ExpressMiddlewareFunction,
  getMetadata,
  MetaKey,
  RouteDefinition,
  RouterParams
} from '../core'
import { Router } from 'express'

function isPromise(p) {
  return p && Object.prototype.toString.call(p) === '[object Promise]'
}

export const AppRoutes = (routeControllers: any[]) => {
  const rootRouter = Router()

  routeControllers.forEach(controller => {
    const instance = new controller()
    // console.log('================')

    const prefix = getMetadata(MetaKey.PREFIX, controller) as string
    const routes = getMetadata(MetaKey.ROUTES, controller) as RouteDefinition[]
    const controllerMiddleware = getMetadata(
      MetaKey.MIDDLEWARES,
      controller
    ) as ExpressMiddlewareFunction[]

    if (!prefix) return

    const controllerRouter = Router()
    const methodRouter = Router()
    // console.log(prefix)
    // console.log('middleware:', controllerMiddleware)

    // mainRouter.use(`${prefix}`)

    // console.log(prefix, routes)

    routes.forEach(r => {
      const params = getMetadata(
        MetaKey.PARAMS,
        controller,
        r.methodName
      ) as string[]

      const method = r.requestMethod
      const path = r.path
      const func = instance[r.methodName]

      if (!func) return

      if (params && params.length) {
        // console.log(
        //   method.toUpperCase(),
        //   `${prefix}${path}`,
        //   '==>',
        //   r.methodName
        // )
        // console.log(params)

        methodRouter[method](path, async (req, res, next) => {
          const paramDatas = []
          params.forEach(p => {
            if (p === RouterParams.REQUEST) {
              paramDatas.push(req)
            }

            if (p === RouterParams.RESPONSE) {
              paramDatas.push(res)
            }

            if (p === RouterParams.NEXT) {
              paramDatas.push(next)
            }

            if (p === RouterParams.BODY) {
              paramDatas.push(req.body)
            }

            if (p === RouterParams.PARAM) {
              paramDatas.push(req.params)
            }

            if (p === RouterParams.QUERY) {
              paramDatas.push(req.query)
            }
          })

          instance.req = req
          instance.res = res
          instance.next = next

          try {
            const result = await func.apply(instance, paramDatas)
            // console.log('result app route', result)
            if (result !== undefined) {
              res.json({
                status: 200,
                data: result
              })
            }
          } catch (error) {
            console.log('AppRoute', error)
            res.status(500).send(error)
          }
        })
      } else {
        // console.log(
        //   method.toUpperCase(),
        //   `${prefix}${path}`,
        //   '==>',
        //   r.methodName
        // )
        methodRouter[method](path, async (req, res, next) => {
          instance.req = req
          instance.res = res
          instance.next = next

          try {
            const result = await func.apply(instance, [])

            if (result !== undefined) {
              res.json({
                status: 200,
                data: result
              })
            }
          } catch (error) {
            console.log('AppRoute2', error)
            res.status(500).json({
              status: 500,
              message: error.message,
              error: JSON.stringify(error)
            })
          }
        })
      }
    })

    const middlewares = controllerMiddleware || []
    controllerRouter.use(prefix, middlewares, methodRouter)

    rootRouter.use(controllerRouter)

    // mainRouter.use(prefix, childRouter)
    // routeList.push(mainRouter)
  })

  // console.log(routeList)

  return rootRouter
}
