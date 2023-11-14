import { ExpressNext, ExpressRequest, ExpressResponse } from '../type'

export class AbstractController {
  req: ExpressRequest
  res: ExpressResponse
  next: ExpressNext
}
