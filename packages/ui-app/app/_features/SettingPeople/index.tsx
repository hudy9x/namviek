'use client'
import { useServiceOrgMember } from '@/hooks/useServiceOrgMember'
import { useOrgMemberGet } from '@/services/organizationMember'
import { useOrgMemberStore } from '@/store/orgMember'
import {
  Avatar,
  Button,
  Form,
  confirmAlert,
  confirmWarning,
  messageError,
  messageSuccess
} from '@shared/ui'
import { useParams } from 'next/navigation'
import FormGroup from 'packages/shared-ui/src/components/FormGroup'
import { useState } from 'react'
import { HiOutlineMail } from 'react-icons/hi'
import { HiOutlineTrash } from 'react-icons/hi2'

export default function SettingPeopleContent() {
  const { orgID } = useParams()
  const { orgMembers } = useOrgMemberStore()
  const { addNewMemberToOrg, removeMemberFromOrg } = useServiceOrgMember()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  useOrgMemberGet()

  const sendInvitation = () => {
    if (!email || !orgID) {
      messageError('Please input your email')
      return
    }

    if (orgMembers.length >= 25) {
      confirmWarning({
        title: 'Reached To Limit',
        message:
          'Your plan has a maximum of 25 member each organization. Please contact to admin to upgrade.',
        yes: () => {
          console.log(1)
        }
      })
      return
    }

    if (orgMembers.find(orgm => orgm.email === email)) {
      messageError(`${email} already exist in your organization !`)
      return
    }

    setLoading(true)
    addNewMemberToOrg({
      orgId: orgID,
      email
    })
      .then(res => {
        messageSuccess('Invited to organization')
        setEmail('')
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
      })

    console.log(email, orgID)
  }

  return (
    <div
      className="overflow-y-auto pb-20 pt-20 custom-scrollbar"
      style={{
        height: 'calc(100vh - 84px)'
      }}>
      <div className="w-[600px] mx-auto">
        <h2 className="text-gray-500 dark:text-gray-400 pb-3">{`Send an invitation via email here 👇`}</h2>
        <FormGroup>
          <Form.Input
            value={email}
            disabled={loading}
            onChange={ev => {
              setEmail(ev.target.value)
            }}
            onEnter={() => {
              sendInvitation()
            }}
            className="w-72"
            placeholder="user@email.com"
          />
          <Button
            loading={loading}
            primary
            onClick={sendInvitation}
            leadingIcon={<HiOutlineMail />}
            title="Let's invite"
          />
        </FormGroup>

        <h2></h2>
        <div className="grid grid-cols-2 gap-2 mt-5">
          {orgMembers.map(mem => {
            return (
              <div
                key={mem.id}
                className="flex items-center justify-between gap-2 py-2 px-3 bg-white dark:bg-gray-900 dark:border-gray-700 rounded-md border shadow-lg shadow-indigo-100 dark:shadow-gray-900 dark:divide-gray-700">
                <div className="flex items-center gap-2">
                  <Avatar src={mem.photo || ''} name={mem.name || ''} />
                  <section className="text-gray-600 dark:text-gray-400">
                    <h2>{mem.name}</h2>
                    <div className="text-xs text-gray-400 dark:text-gray-500">
                      {mem.email}
                    </div>
                  </section>
                </div>
                <div>
                  <Button
                    size="sm"
                    leadingIcon={<HiOutlineTrash />}
                    onClick={() => {
                      confirmAlert({
                        title: `Are you sure you want to do this action ?`,
                        message: `This action will remove ${mem.email} from the organization and all projects in which he/she is currently participating`,
                        yes: () => {
                          removeMemberFromOrg(mem.id).then(res => {
                            messageSuccess(`Removed ${mem.email}`)
                          })
                        }
                      })
                    }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
