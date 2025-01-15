import { useGetParams } from "@/hooks/useGetParams";
import { meetingService } from "@/services/meeting";
import { Button, Form, randomId, setFixLoading } from "@shared/ui";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function MeetingRoomList() {
  const { orgName } = useGetParams()
  const { push } = useRouter()
  const [loading, setloading] = useState(false)
  const [link, setLink] = useState('')

  const showRedirectingStatus = () => {
    setFixLoading(true)
    // fallback as page was suspended
    setTimeout(() => {
      setFixLoading(false)
    }, 5000)
  }

  const createInstantMeeting = () => {
    if (loading) return
    setloading(true)
    const name = randomId()
    meetingService.createRoom(name).then(res => {

      setloading(false)
      showRedirectingStatus()
      push(`/${orgName}/meeting/${name}`)

    }).catch(err => {
      setloading(false)
    })
  }

  const onJoin = () => {
    try {
      new URL(link)
      push(link)
    } catch (error) {
      if (!link) return

      push(`/${orgName}/meeting/${link}`)

    }
  }

  // only clear fixed loading as the page unmount
  useEffect(() => {
    return () => {
      // setFixLoading(false)
    }
  })

  return <div className="meeting-list flex bg-white dark:bg-gray-900 items-center justify-center h-screen">
    <div className="">
      <p className="text-2xl w-[450px] mb-8 text-gray-700 dark:text-gray-400">Quickly create your meeting room or just paste your meeting link or code to join for free</p>
      <div className="flex items-center gap-2">
        <Button title="Create instant meeting" loading={loading} primary onClick={createInstantMeeting} />
        <Form.Input value={link} onChange={ev => setLink(ev.target.value)} placeholder="Paste your link or enter code" />
        <Button title="Join now" onClick={onJoin} />
      </div>
    </div>

  </div>
}
