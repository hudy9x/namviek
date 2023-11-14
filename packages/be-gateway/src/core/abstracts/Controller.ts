import { ExpressNext, ExpressRequest, ExpressResponse } from '../type'

export class BaseController {
  req: ExpressRequest
  res: ExpressResponse
  next: ExpressNext
}
