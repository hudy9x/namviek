## A Guide for coding
### Using Pusher/channel

We're using Pusher/channel to push a message from server to client. For instance:
- When a user type a new comment, the other user will receive this comment immediately.
- Or when a new user was added to a new project, he/she will be see it right after the manager update member list

To use it, in your backend code, import the `pusherServer` and trigger an event as follows:
```javascript
import { pusherServer } from '../../lib/pusher-server'

const eventName = `event-delete-task-comment`

pusherServer.trigger('team-collab', eventName, {
    id,
    triggerBy: updatedBy
})
```

Next, on the client side, create a new file in format as follow `ui-app/app/_events/useEvent<event-name>.ts`
```javascript
// ui-app/app/_events/useEventDeleteComment.ts

import { usePusher } from './usePusher' // search usePusher in /ui-app

export const useEventDeleteComment = () => {

  useEffect(() => {
    const eventName = `event-delete-task-comment`

    channelTeamCollab &&
      channelTeamCollab.bind(eventName, (data) => {
        console.log(data)
      })

    return () => {
      channelTeamCollab && channelTeamCollab.unbind(eventName)
    }
  }, [channelTeamCollab])
}
```
