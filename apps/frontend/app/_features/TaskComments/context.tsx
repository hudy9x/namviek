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
import { useSearchParams } from 'next/navigation'
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react'

interface ICommentContext {
  comments: Comment[]
  // taskId: string
  // setTaskId: (taskId: string) => void
  loadComments: () => void
  addComment: (content: string) => void
  updateComment: (comment: Comment) => void
  removeComment: (commentId: string) => void
  setComments: Dispatch<SetStateAction<Comment[]>>
}

const CommentContext = createContext<ICommentContext>({
  // taskId: '',
  // setTaskId: () => console.log(1),
  comments: [] as Comment[],
  loadComments: () => console.log(1),
  addComment: () => console.log(1),
  removeComment: () => console.log(1),
  updateComment: () => console.log(1),
  setComments: () => console.log(1)
})

export const CommentContextProvider = ({ taskId, children }: PropsWithChildren & { taskId: string }) => {
  // const sp = useSearchParams()
  // const taskId = sp.get('taskId')

  const [comments, setComments] = useState<Comment[]>([] as Comment[])
  const { user } = useUser()
  const userId = user?.id
  const { projectId } = useUrl()

  const addComment = useCallback(
    (content: string) => {
      if (!userId || !taskId) return false
      const now = new Date()
      const comment: Omit<Comment, 'id'> = {
        content,
        createdBy: userId,
        taskId,
        projectId,
        createdAt: now,
        updatedAt: now
      }

      const newComment = { ...comment, id: '' }
      setComments(prev => (prev?.length ? [newComment, ...prev] : [newComment]))

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
      return true
    },
    [projectId, taskId, userId]
  )

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

  const updateComment = useCallback((comment: Comment) => {
    setComments(prev => {
      const idx = prev.findIndex(({ id }) => id === comment.id)
      prev[idx] = comment
      return [...prev]
    })

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
      setComments(prev => prev.filter(({ id }) => id !== commentId))
      userId &&
        taskId &&
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
        comments,
        loadComments,
        addComment,
        updateComment,
        removeComment,
        setComments
      }}>
      {children}
    </CommentContext.Provider>
  )
}

export const useCommentContext = () => {
  return { ...useContext(CommentContext) }
}
