import { Comment } from '@prisma/client'
import TaskComment from './TaskComment'
import { useState } from 'react'
import { useUser } from '@goalie/nextjs'
import { useCommentContext } from './context'
import { dateFormat } from '@shared/libs'
import { Button } from '@shared/ui'
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi2'

export default function TaskCommentListItem(comment: Comment) {
  const { id, createdBy, content, createdAt } = comment
  const [editable, setEditable] = useState(false)
  const { user } = useUser()
  const userId = user?.id
  const { updateComment, removeComment } = useCommentContext()

  const handleValueSubmit = (s: string) => {
    const updatedAt = new Date()
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
    removeComment(id)
  }

  const dateString = dateFormat(new Date(createdAt), 'iiii, dd MMM yy')

  return (
    <div className="mt-4 group relative">
      <TaskComment
        userId={createdBy}
        initValue={content}
        readOnly={!editable}
        onValueSubmit={handleValueSubmit}
        onCancel={handleCancelEvent}
        onBlur={handleCancelEvent}
      />
      <div className="pl-9 flex text-xs pt-1 justify-start gap-2">
        {!editable ? (
          <div className="cursor-pointer dark:text-gray-500">{dateString}</div>
        ) : null}
      </div>
      {!editable && userId === createdBy ? (
        <div className="opacity-0 group-hover:opacity-100 absolute right-4 top-2 space-x-1">
          <Button
            size="sm"
            leadingIcon={<HiOutlinePencil />}
            onClick={handleEditButtonClick}
          />
          <Button
            size="sm"
            leadingIcon={<HiOutlineTrash />}
            onClick={handleDeleteButtonClick}
          />
        </div>
      ) : null}
    </div>
  )
}
