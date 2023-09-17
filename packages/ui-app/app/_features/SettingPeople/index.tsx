'use client'
import { useServiceOrgMember } from '@/hooks/useServiceOrgMember'
import { useOrgMemberGet } from '@/services/organizationMember'
import { useOrgMemberStore } from '@/store/orgMember'
import { Avatar, Button, Form, messageError, messageSuccess } from '@shared/ui'
import { useParams } from 'next/navigation'
import FormGroup from 'packages/shared-ui/src/components/FormGroup'
import { useState } from 'react'
import { HiOutlineMail } from 'react-icons/hi'

export default function SettingPeopleContent() {
  const { orgID } = useParams()
  const { orgMembers } = useOrgMemberStore()
  const { addNewMemberToOrg } = useServiceOrgMember()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  useOrgMemberGet()

  const sendInvitation = () => {
    if (!email || !orgID) {
      messageError('Please input your email')
      return
    }

    setLoading(true)
    addNewMemberToOrg({
      orgId: orgID,
      email
    })
      .then(res => {
        messageSuccess('Doine')
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
    <div className="w-[600px] mx-auto pt-20">
      <h2 className="text-gray-500 dark:text-gray-400 pb-3">{`Send an invitation via email here 👇`}</h2>
      <FormGroup>
        <Form.Input
          value={email}
          disabled={loading}
          onChange={ev => {
            setEmail(ev.target.value)
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
      <div className="bg-white dark:bg-gray-900 dark:border-gray-700 rounded-md border shadow-lg shadow-indigo-100 dark:shadow-gray-900 divide-y dark:divide-gray-700 mt-5">
        {orgMembers.map(mem => {
          return (
            <div key={mem.id} className="flex items-center gap-2 py-2 px-3">
              <Avatar src={mem.photo || ''} name={mem.name || ''} />
              <section className="text-gray-600 dark:text-gray-400">
                <h2>{mem.name}</h2>
                <div className="text-xs text-gray-400 dark:text-gray-500">
                  {mem.email}
                </div>
              </section>
            </div>
          )
        })}
      </div>
    </div>
  )
}
