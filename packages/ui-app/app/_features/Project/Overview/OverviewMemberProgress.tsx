import { Avatar } from '@shared/ui'
import { useMemberStore } from 'packages/ui-app/store/member'

export default function OverviewMemberProgress() {
  const { members } = useMemberStore()

  const total = 40
  const records = [
    { uid: '649ab9864792890df8449c68', done: 14 },
    { uid: '64a0f87de769d58fb12d0cb0', done: 32 },
    { uid: '64a24393fb17d4eadfa8da7a', done: 28 },
    { uid: '64a243aafb17d4eadfa8da7b', done: 3 },
    { uid: '64a243bcfb17d4eadfa8da7c', done: 19 },
    { uid: '64a243d1fb17d4eadfa8da7d', done: 1 },
    { uid: '64a24428fb17d4eadfa8da7e', done: 0 }
  ].sort((a, b) => b.done - a.done)

  return (
    <div className="member-progress rounded-md bg-white p-4 shadow-sm border mt-3">
      <h2 className="text-gray-600">Killing tasks Racing 🔥</h2>
      <div className="space-y-2 mt-3">
        {records.map((r, idx) => {
          const user = members.find(m => m.id === r.uid)
          if (!user) return null

          let metal = ''

          switch (idx) {
            case 0:
              metal = '🐎'
              break
            case 1:
              metal = '🐐'
              break
            case 2:
              metal = '🦜'
              break

            default:
              metal = '🐘'
              break
          }

          return (
            <div key={idx} className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Avatar name={user.name || ''} src={user.photo || ''} />
                <div className="text-gray-600 text-sm">
                  <span className="text-sm">{user.name}</span>
                  <div className="text-gray-400">{r.done} resolved</div>
                </div>
              </div>
              <div className="text-[20px]">{metal}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
