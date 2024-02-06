import {
  useEventDeleteTaskComment,
  useEventSendTaskComment,
  useEventUpdateTaskComment
} from '@/events/useEventTaskComment'
import { useUrl } from '@/hooks/useUrl'
import {
  commentCreate,
  commentDelete,
  commentGetAllByTask,
  commentUpdate
} from '@/services/comment'
import { useUser } from '@goalie/nextjs'
import { Comment } from '@prisma/client'
import { messageError } from '@shared/ui'
import compareAsc from 'date-fns/compareAsc'
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useState
} from 'react'

interface ICommentContext {
  comments: Comment[]
  taskId: string
  setTaskId: (taskId: string) => void
  loadComments: () => void
  addComment: (content: string) => void
  updateComment: (comment: Comment) => void
  removeComment: (commentId: string) => void
}

const CommentContext = createContext<ICommentContext>({
  taskId: '',
  setTaskId: () => console.log(1),
  comments: [] as Comment[],
  loadComments: () => console.log(1),
  addComment: () => console.log(1),
  removeComment: () => console.log(1),
  updateComment: () => console.log(1)
})

export const CommentContextProvider = ({ children }: PropsWithChildren) => {
  const [taskId, setTaskId] = useState<string>('')
  const [comments, setComments] = useState<Comment[]>([] as Comment[])
  const { user } = useUser()
  const userId = user?.id
  const { projectId } = useUrl()

  useEventSendTaskComment(comment => {
    const newComment = comment as Comment
    console.log({ newComment })
    setComments(prev => (prev?.length ? [newComment, ...prev] : [newComment]))
  })

  useEventUpdateTaskComment(comment => {
    setComments(prev => {
      const idx = prev.findIndex(({ id }) => id === comment.id)
      prev[idx] = comment
      return [...prev]
    })
  })

  useEventDeleteTaskComment(({ id: idx }) => {
    console.log({ idx })
    setComments(prev => prev.filter(({ id }) => id !== idx))
  })

  const loadComments = useCallback(() => {
    taskId &&
      commentGetAllByTask(taskId)
        .then(res => {
          const { data, status, error } = res.data
          if (status !== 200) {
            messageError(error)
            return false
          }

          if (!Array.isArray(data)) throw Error
          data.sort((a, b) =>
            compareAsc(new Date(b.createdAt), new Date(a.createdAt))
          )
          setComments(data)
          return true
        })
        .catch(error => {
          messageError(error)
        })
  }, [taskId])

  const addComment = useCallback(
    (content: string) => {
      if (!userId) return false
      const now = new Date()
      const comment: Omit<Comment, 'id'> = {
        content,
        createdBy: userId,
        taskId,
        projectId,
        createdAt: now,
        updatedAt: now
      }

      commentCreate(comment)
        .then(res => {
          const { status, error, data } = res.data
          if (status !== 200) {
            messageError(error)
            return false
          }

          return true
        })
        .catch(error => messageError(error))
    },
    [projectId, taskId, userId]
  )

  const updateComment = useCallback((comment: Comment) => {
    commentUpdate(comment)
      .then(res => {
        const { status, error } = res.data

        if (status !== 200) {
          messageError(error)
          return false
        }

        return true
      })
      .catch(error => messageError(error))
  }, [])

  const removeComment = useCallback(
    (commentId: string) => {
      userId &&
        commentDelete(commentId, taskId, userId)
          .then(res => {
            const { status, error } = res.data
            if (status !== 200) {
              messageError(error)
              return false
            }

            return true
          })
          .catch(error => {
            messageError(error)
          })
    },
    [userId, taskId]
  )

  return (
    <CommentContext.Provider
      value={{
        taskId,
        setTaskId,
        comments,
        loadComments,
        addComment,
        updateComment,
        removeComment
      }}>
      {children}
    </CommentContext.Provider>
  )
}

export const useCommentContext = () => {
  return { ...useContext(CommentContext) }
}
