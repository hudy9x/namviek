import {
  Avatar,
  Button,
  Loading,
  Modal,
  messageError,
  messageInfo
} from '@shared/ui'
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'
import { HiOutlinePlus, HiX } from 'react-icons/hi'
import { orgMemberSearch } from '../../../../services/organizationMember'
import { useParams } from 'next/navigation'
import { UserMember, useMemberStore } from '../../../../store/member'
import { MemberRole, OrganizationMembers, User } from '@prisma/client'
import { memAddNewToProject } from '../../../../services/member'

let timeout = 0

type OrgMemUser = OrganizationMembers & {
  users: User
}

const SelectedMembers = ({
  selectedMember,
  setSelectedMember
}: {
  selectedMember: User[]
  setSelectedMember: Dispatch<SetStateAction<User[]>>
}) => {
  return (
    <>
      <h2 className="my-3 font-medium text-sm">Selected members:</h2>

      <div className="bg-gray-50 dark:bg-gray-900 dark:border-gray-700 rounded-lg border">
        <div className="divide-y divide-dashed">
          {!selectedMember.length ? (
            <div className="px-4 py-3 text-sm text-gray-500">
              No member selected
            </div>
          ) : null}
          {selectedMember.map(member => {
            return (
              <div
                key={member.id}
                className="relative px-4 py-3 hover:bg-white dark:hover:bg-slate-800 rounded-lg cursor-pointer">
                <MemberAvatarWithName
                  name={member.name}
                  photo={member.photo}
                  email={member.email}
                />
                <div className="absolute top-4 right-3">
                  <HiX
                    onClick={() => {
                      setSelectedMember(prev =>
                        prev.filter(sm => sm.id !== member.id)
                      )
                    }}
                    className="text-gray-500 w-7 h-7 rounded-md bg-white dark:bg-gray-900 dark:border-gray-700 dark:text-gray-400 dark:hover:text-red-400 border p-1.5 hover:text-red-400"
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

const MemberAvatarWithName = ({
  photo,
  name,
  email
}: {
  photo: string | null
  name: string | null
  email: string
}) => {
  return (
    <div className="flex items-center gap-3">
      <Avatar src={photo || ''} name={name || ''} size="lg" />
      <div className="flex flex-col text-sm">
        <span className="text-gray-700 font-medium">{name}</span>
        <span className="text-gray-400 text-xs">{email}</span>
      </div>
    </div>
  )
}

const SearchStatus = ({ status }: { status: boolean }) => {
  return (
    <>
      {status ? (
        <div className="px-6 py-3">
          <div className="flex items-center gap-5">
            <div className="w-4 h-4">
              <Loading />
            </div>
            <div className="flex flex-col text-sm">
              <span className="text-gray-700 font-medium">Searching ...</span>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default function ProjectMemberAdd() {
  const { orgID, projectId } = useParams()
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [searchResults, updateSearchResults] = useState<User[]>([])
  const [selectedMember, setSelectedMember] = useState<User[]>([])
  const { addMember } = useMemberStore()

  const addToProject = () => {
    const refactorMembers = selectedMember.map(sm => {
      const dt = sm as UserMember
      dt.role = MemberRole.MEMBER
      return dt
    })

    setVisible(false)
    addMember(refactorMembers)
    memAddNewToProject(projectId, refactorMembers)
      .then(res => {
        console.log('res', res)
      })
      .catch(err => {
        console.log(err)
        messageError('Can not add member to project, please refresh the page')
      })
  }

  const onChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const target = ev.target
    const value = target.value

    if (!value) {
      updateSearchResults([])
      return
    }

    timeout && clearTimeout(timeout)

    timeout = setTimeout(() => {
      setLoading(true)
      orgMemberSearch({
        projectId,
        orgId: orgID,
        term: value
      })
        .then(result => {
          const { status, data } = result.data

          if (status !== 200) {
            messageError('Error')
            return
          }

          const retData = data as OrgMemUser[]

          if (!retData.length) {
            messageInfo(
              `No user matched with '${value}', type another keyword and try again`
            )
            return
          }

          updateSearchResults(retData.map(d => d.users))
        })
        .finally(() => {
          setLoading(false)
        })
    }, 250) as unknown as number
  }

  const filteredSearchResults = searchResults.filter(
    sr => !selectedMember.find(sm => sm.id === sr.id)
  )

  return (
    <div className="mt-4 flex justify-end">
      <Modal
        visible={visible}
        onVisibleChange={setVisible}
        title="Add new member"
        triggerBy={
          <div>
            <Button
              title="New member"
              leadingIcon={<HiOutlinePlus />}
              primary
            />
          </div>
        }
        content={
          <div className="">
            <div className="bg-gray-50 dark:border-gray-700 dark:bg-gray-900 rounded-lg border">
              <div className="relative">
                <input
                  className="w-full bg-white dark:bg-gray-900 dark:border-gray-700 px-4 py-3 border-b border-dashed rounded-t-lg text-sm"
                  placeholder="Find your member"
                  onChange={onChange}
                />
              </div>
              <SearchStatus status={loading} />
              <div className="divide-y divide-dashed">
                {filteredSearchResults.map(member => {
                  return (
                    <div
                      key={member.id}
                      onClick={() => {
                        setSelectedMember(prev => {
                          return [...prev, member]
                        })
                      }}
                      className="px-4 py-3 hover:bg-white cursor-pointer">
                      <MemberAvatarWithName
                        name={member.name}
                        photo={member.photo}
                        email={member.email}
                      />
                    </div>
                  )
                })}
              </div>
            </div>

            <SelectedMembers
              selectedMember={selectedMember}
              setSelectedMember={setSelectedMember}
            />

            <div className="mt-3 text-right">
              <Button title="Add to project" primary onClick={addToProject} />
            </div>
          </div>
        }
      />
    </div>
  )
}
