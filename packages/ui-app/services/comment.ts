import { httpDel, httpGet, httpPost, httpPut } from './_req'
import { Comment } from '@prisma/client'

export const commentGetAllByTask = (taskId: string) => {
  return httpGet(`/api/comment`, {
    params: {
      objectId: taskId
    }
  })
}

export const commentCreate = (comment: Partial<Comment>) => {
  return httpPost('/api/comment', comment)
}

export const commentUpdate = (comment: Comment) => {
  return httpPut('/api/comment', comment)
}

export const commentDelete = (id: string) => {
  return httpDel('/api/comment', {
    params: {
      id
    }
  })
}
