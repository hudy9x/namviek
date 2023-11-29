import EmojiPicker, { EmojiClickData } from 'emoji-picker-react'
import PopoverControl from 'packages/shared-ui/src/components/Controls/PopoverControl'

import { BsEmojiLaughing } from 'react-icons/bs'
import { useActivityContext } from './context'
import { Activity } from '@prisma/client'
import { ActivityCommentData } from '@shared/models'
import { useUser } from '@goalie/nextjs'

export default function ActivityCardCommentReaction({
  commentId
}: {
  commentId: string
}) {
  const { user } = useUser()
  const { activities, updateActivity } = useActivityContext()
  const comment = activities.find(({ id }) => id === commentId)
  if (!comment) return null

  if (!user) return null
  const { id: uid } = user

  const { data } = comment as Activity & { data: ActivityCommentData }
  const { interactions } = data

  const handleEmojiClick = (e: EmojiClickData) => {
    const { emoji } = e

    const newAcitivity = {
      ...comment,
      data: {
        ...data,
        interactions: interactions
          ? [...interactions, { emoji, uid }]
          : [{ emoji, uid }]
      }
    } as Activity
    updateActivity(newAcitivity)
  }
  return (
    <div className="m-2 flex gap-1 items-center">
      {interactions
        ? interactions
            .sort((a, b) => (a.emoji < b.emoji ? 1 : 0))
            .reduce((accumulator, current) => {
              const last = accumulator.at(-1)
              const { emoji: currentEmoji, uid: currentUid } = current
              if (!last || last.emoji !== currentEmoji)
                return [
                  ...accumulator,
                  { emoji: currentEmoji, uids: [currentUid] }
                ]

              last.uids = [...last.uids, uid]
              const res = [...accumulator.slice(0, -1), last]
              return res
            }, [] as { emoji: string; uids: string[] }[])
            .slice(0, 5)
            .map(({ emoji, uids }) => (
              <div
                key={emoji}
                className="group relative flex border-blue-500 border rounded-2xl p-1 px-2 cursor-pointer">
                <span>{emoji}</span>
                <span>{uids?.length}</span>
                <span className="absolute hidden group-hover:block -bottom-5 left-0 bg-gray-600 text-white">
                  {uids?.join(', ')}
                </span>
              </div>
            ))
        : null}
      {interactions?.slice(5).length
        ? `+ ${interactions.slice(5).length} mores...`
        : null}
      <PopoverControl
        triggerBy={
          <div className="rounded-2xl border-gray-600 border p-1 px-2">
            <BsEmojiLaughing size={24} />
          </div>
        }
        content={
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        }></PopoverControl>
    </div>
  )
}
