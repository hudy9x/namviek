import { Button, Dialog, Form, Loading, Switch, messageError, messageInfo, messageSuccess } from "@ui-components";
import { useState } from "react";
import { HiOutlineUserPlus } from "react-icons/hi2";
import { useUserRole } from "../UserPermission/useUserRole";
import { UserStatus } from "@prisma/client";
import { settingPeopleSv } from "@/services/settingPeople";
import { useGetParams } from "@/hooks/useGetParams";
import { useServiceOrgMember } from "@/hooks/useServiceOrgMember";
import { useOrgMemberStore } from "@/store/orgMember";

export default function CreateNewMember() {
  const { orgRole } = useUserRole()

  const { orgId } = useGetParams()
  const { addNewMemberToOrg } = useServiceOrgMember()
  const orgMembers = useOrgMemberStore(state => state.orgMembers)
  const [step, setStep] = useState(0)
  const [open, setOpen] = useState(false)
  const [userStatus, setUserStatus] = useState(true)
  const [fullname, setFullname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const clearData = () => {
    setEmail('')
    setFullname('')
    setPassword('')
    setUserStatus(false)
  }
  const onCreate = () => {

    if (!email || !password || !fullname) {
      messageError('Email, Password and Fullname are required')
      return
    }

    if (orgMembers.some(m => m.email === email)) {
      messageError('This email has already exist')
      return
    }

    setStep(1)

    settingPeopleSv.create({
      email,
      password,
      status: userStatus ? UserStatus.ACTIVE : UserStatus.INACTIVE,
      name: fullname
    })
      .then(res => {
        const { data, error, status } = res.data

        if (error || status !== 200) {
          messageError(error)
          setStep(0)
          return
        }

        setStep(2)
        addNewMemberToOrg({
          orgId,
          email
        }).then(res => {

          messageSuccess('Invited to organization')
          console.log('register successully', data, res)
          setOpen(false)
          setStep(0)

          clearData()
        }).catch(err => {
          setStep(0)
        })

      }).catch(err => {
        setStep(0)
        clearData()
      })

  }

  if (orgRole !== 'ADMIN') {
    return <Button leadingIcon={<HiOutlineUserPlus />} onClick={() => {
      messageInfo('Only admin is able to create new member')
    }} title="Create" />
  }

  const StepForm = () => {
    if (step === 0) return null

    let message = ''
    if (step === 1) {
      message = 'Creating new user (1/2)'
    }

    if (step === 2) {
      message = 'Inviting user to organization (2/2)'
    }

    return <Loading.Absolute title={message} />

  }


  return <div>
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <Button primary leadingIcon={<HiOutlineUserPlus />} title="Create & Invite" />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Content>
          <StepForm />
          <h2 className="text-xl font-bold">Create and invite new member</h2>
          <div className="mt-7 space-y-3">
            <Form.Input title="Fullname" type="text" required value={fullname} onChange={ev => setFullname(ev.target.value)} />
            <Form.Input title="Email" required value={email} onChange={ev => setEmail(ev.target.value)} />
            <Form.Input title="Password" required type="password" value={password} onChange={ev => setPassword(ev.target.value)} />

            {/* <div className="form-control"> */}
            {/*   <label>Active this user</label> */}
            {/**/}
            {/*   <div className="flex items-center gap-3"> */}
            {/*     <Switch */}
            {/*       title="Status" */}
            {/*       className="shrink-0" */}
            {/*       checked={userStatus} */}
            {/*       onChange={setUserStatus} */}
            {/*     /> */}
            {/*   </div> */}
            {/* </div> */}

            <div className="flex items-center gap-3">
              <Button title="Do it now" primary onClick={onCreate} />
              <Button title="Cancel" onClick={() => setOpen(false)} />

            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  </div>
}
