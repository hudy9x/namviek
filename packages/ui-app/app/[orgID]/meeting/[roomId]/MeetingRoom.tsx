'use client'
import '@livekit/components-styles'
import {
  LiveKitRoom,
  VideoConference,
  GridLayout,
  ParticipantTile,
  useTracks,
  RoomAudioRenderer,
  ControlBar,
  Chat,
  PreJoin
} from '@livekit/components-react'
import { useEffect, useState } from 'react'
import { Track } from 'livekit-client'
import { meetingGetParticipant } from '@/services/meeting'
import { useParams, useRouter } from 'next/navigation'
import { useUser } from '@goalie/nextjs'
import { Form } from '@shared/ui'

export default function MeetingContainer() {
  // TODO: get user input for room and name
  const { roomId, orgID } = useParams()
  const { push } = useRouter()
  const { user } = useUser()


  const [token, setToken] = useState('')

  useEffect(() => {
    if (user && user.name && roomId) {
      meetingGetParticipant({ room: roomId, username: user.name }).then(res => {
        setToken(res.data.token)
      })
    }
  }, [user?.id, roomId])

  if (token === '') {
    return <div>Getting token...</div>
  }

  return (
    <div className='fixed top-0 left-0 z-10 w-full h-full'>
      <LiveKitRoom
        onDisconnected={() => {
          push(`/${orgID}/meeting`)
        }}
        video={true}
        audio={true}
        token={token}

        connectOptions={{ autoSubscribe: false }}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
        // Use the default LiveKit theme for nice styles.
        data-lk-theme="default"
        style={{ height: '100vh' }}>
        <div className='flex items-center h-full'>
          <div className='w-full'>
            {/* Your custom component with basic video conferencing functionality. */}
            <MyVideoConference />
            {/* The RoomAudioRenderer takes care of room-wide audio for you. */}
            <RoomAudioRenderer />
            {/* <PreJoin /> */}
            {/* Controls for the user to start/stop audio, video, and screen 
      share tracks and to leave the room. */}
            <ControlBar />
          </div>

          <div className='w-[350px] shrink-0 flex items-end h-full'>
            <Chat />
          </div>
        </div>
      </LiveKitRoom>
      <div className='fixed bottom-5 left-5 bg-white rounded-md shadow-lg p-4 w-[400px] text-gray-600 text-sm'>
        <h2 className='text-2xl text-gray-800 mb-2'>Your meeting is ready</h2>
        <div className='space-y-2'>
          <p>Share this link with others you want in the meeting</p>

          <Form.Input readOnly value={roomId} />
          <p>People who use this meeting link must get your permission before they can join </p>
        </div>
      </div>
    </div>
  )
}

function MyVideoConference() {
  // `useTracks` returns all camera and screen share tracks. If a user
  // joins without a published camera track, a placeholder track is returned.
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false }
    ],
    { onlySubscribed: false }
  )
  return (
    <GridLayout
      tracks={tracks}
      style={{ height: 'calc(100vh - var(--lk-control-bar-height))' }}>
      {/* The GridLayout accepts zero or one child. The child is used
      as a template to render all passed in tracks. */}
      <ParticipantTile />
    </GridLayout>
  )
}
