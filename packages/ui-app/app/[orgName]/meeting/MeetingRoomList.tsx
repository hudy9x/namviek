import { meetingService } from "@/services/meeting";
import { Button, Form, randomId } from "@shared/ui";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function MeetingRoomList() {
  const { orgName } = useParams()
  const { push } = useRouter()
  const [loading, setloading] = useState(false)
  const [link, setLink] = useState('')

  const createInstantMeeting = () => {
    setloading(true)
    const name = randomId()
    meetingService.createRoom(name).then(res => {

      setloading(false)
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
