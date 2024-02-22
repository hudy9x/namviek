import { OrgMember, useOrgMemberStore } from '@/store/orgMember'
import { useUser } from '@goalie/nextjs'
import { Avatar, Form, messageWarning } from '@shared/ui'
import { useEffect, useState } from 'react'
import { HiOutlineSearch } from 'react-icons/hi'
import { HiOutlineCheck } from 'react-icons/hi2'

function AddedMembers({ members }: { members: OrgMember[] }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[11px] uppercase text-gray-600 dark:text-gray-400">
        Invited {members.length} members
      </span>
      <div className="py-2 flex items-center justify-end">
        {members.slice(0, 3).map(m => {
          return (
            <div
              key={m.id}
              className="flex items-center -ml-2 shadow rounded-full">
              <Avatar size="md" src={m.photo} name={m.name} />
            </div>
          )
        })}

        {members.length > 3 ? (
          <div className="flex items-center justify-center bg-gray-200 dark:bg-gray-900 text-[10px] w-6 h-6 -ml-2 shadow rounded-full">
            +{members.length - 3}
          </div>
        ) : null}
      </div>
    </div>
  )
}

function SelectMemberSection({
  selection,
  selected,
  onClick
}: {
  selected: string[]
  selection: OrgMember[]
  onClick: (isAlreadyAdded: boolean, m: OrgMember) => void
}) {
  return (
    <div className="border-t dark:border-gray-700 space-y-2 pt-2">
      {selection.slice(0, 10).map(m => {
        const isAdded = selected.includes(m.id)
        return (
          <div
            key={m.id}
            onClick={() => {
              onClick(isAdded, m)
            }}
            className="flex items-center gap-2 cursor-pointer">
            <Avatar size="md" src={m.photo} name={m.name} />
            <div className="text-gray-700 dark:text-gray-400 flex items-center justify-between w-full">
              <div>
                <h2 className="text-sm">{m.name}</h2>
                <p className="text-xs text-gray-400 dark:text-gray-600">
                  {m.email}
                </p>
              </div>
              {isAdded ? <HiOutlineCheck /> : null}
            </div>
          </div>
        )
      })}
    </div>
  )
}

const useExtractAddedNSelection = (term: string, selected: string[]) => {
  const { orgMembers } = useOrgMemberStore()
  const added = orgMembers.filter(m => selected.includes(m.id))
  const selection = orgMembers.filter(m => {
    if (!term) return true

    const name = m.name || ''
    const email = m.email || ''

    if (
      name.toLowerCase().includes(term) ||
      email.toLowerCase().includes(term)
    ) {
      return true
    }

    return false
  })

  return {
    added,
    selection
  }
}

export default function FormMember({
  onChange
}: {
  onChange?: (uids: string[]) => void
}) {
  const { user } = useUser()
  const [term, setTerm] = useState('')
  const [selected, setSelected] = useState<string[]>([])

  const { added, selection } = useExtractAddedNSelection(term, selected)

  const triggerOnChange = (users: string[]) => {
    onChange && onChange(users)
  }

  const addMember = (id: string) => {
    setSelected(prev => {
      const newMembers = [...prev, id]

      triggerOnChange(newMembers)
      return newMembers
    })
  }

  const removeMember = (id: string) => {
    if (id === user?.id) {
      messageWarning('Please do not remove yourself =.=!! ')
      return
    }
    setSelected(prev => {
      // only being removed as the number of members are greater than 1

      if (prev.length <= 1) {
        return prev
      }

      const filtered = prev.filter(p => p !== id)
      triggerOnChange(filtered)

      return filtered
    })
  }

  const onClick = (isAlreadyAdded: boolean, m: OrgMember) => {
    if (isAlreadyAdded) {
      removeMember(m.id)
      return
    }

    addMember(m.id)
  }

  useEffect(() => {
    if (user && user?.id) {
      triggerOnChange([user.id])
      setSelected(prev => [user.id, ...prev])
    }
  }, [user?.id])

  return (
    <div className="form-control">
      <label>Invite members</label>
      <div className="border p-2 rounded-md bg-gray-100 dark:bg-gray-800 dark:border-gray-700 space-y-2">
        <div>
          <Form.Input
            onChange={ev => {
              setTerm(ev.target.value)
            }}
            placeholder="Type name or email"
            icon={<HiOutlineSearch className="text-gray-500" />}
          />
        </div>

        <AddedMembers members={added} />
        <SelectMemberSection
          onClick={onClick}
          selection={selection}
          selected={selected}
        />
      </div>
    </div>
  )
}
