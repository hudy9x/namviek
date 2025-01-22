'use client'
import { useGetParams } from '@/hooks/useGetParams'
import { useServiceOrgMember } from '@/hooks/useServiceOrgMember'
import { useOrgMemberGet } from '@/services/organizationMember'
import { useOrgMemberStore } from '@/store/orgMember'
import {
  Button,
  Form,
  messageError,
  messageSuccess
} from '@ui-components'
import FormGroup from 'packages/ui-components/src/components/FormGroup'
import { useState } from 'react'
import { HiOutlineMail } from 'react-icons/hi'

export default function SettingPeopleInvitation() {
  const { orgId } = useGetParams()
  const { orgMembers } = useOrgMemberStore()
  const { addNewMemberToOrg } = useServiceOrgMember()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  useOrgMemberGet()

  const sendInvitation = () => {
    if (!email || !orgId) {
      messageError('Please input your email')
      return
    }

    if (orgMembers.find(orgm => orgm.email === email)) {
      messageError(`${email} already exist in your organization !`)
      return
    }

    setLoading(true)
    addNewMemberToOrg({
      orgId,
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

    console.log(email, orgId)
  }

  return <FormGroup>
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

      onClick={sendInvitation}
      leadingIcon={<HiOutlineMail />}
      title="Let's invite"
    />
  </FormGroup>
}
