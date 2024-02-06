import { Comment } from '@prisma/client'
import TaskComment from './TaskComment'
import { useState } from 'react'
import { useUser } from '@goalie/nextjs'
import { useCommentContext } from './context'

interface ITaskCommentListItemProps extends Comment {}

export default function TaskCommentListItem(
  comment: ITaskCommentListItemProps
) {
  const { id, createdBy, content, createdAt } = comment
  const [editable, setEditable] = useState(false)
  const { user } = useUser()
  const userId = user?.id
  const { updateComment, removeComment } = useCommentContext()

  const handleValueSubmit = (s: string) => {
    const updatedAt = new Date()
    console.log({ updatecomment: comment })
    updateComment({ ...comment, content: s, updatedAt })
    setEditable(false)
  }

  const handleEditButtonClick = () => {
    setEditable(true)
  }

  const handleCancelEvent = () => {
    setEditable(false)
  }

  const handleDeleteButtonClick = () => {
    // console.log('impl delete')
    removeComment(id)
  }

  return (
    <div className="my-2">
      <TaskComment
        userId={createdBy}
        initValue={content}
        readOnly={!editable}
        onValueSubmit={handleValueSubmit}
        onCancel={handleCancelEvent}
      />
      <div className="flex justify-start gap-2 ">
        <div className="hover:underline cursor-pointer">
          {new Date(createdAt).toLocaleString()}
        </div>
        {!editable && userId === createdBy ? (
          <>
            <div
              className="underline cursor-pointer"
              onClick={handleEditButtonClick}>
              Edit
            </div>
            <div
              className="underline cursor-pointer"
              onClick={handleDeleteButtonClick}>
              Delete
            </div>
          </>
        ) : null}
      </div>
    </div>
  )
}
