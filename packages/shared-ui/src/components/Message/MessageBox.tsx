import { getMessageIcon } from "./Icons"
import { MessageType } from "./type"

interface Props {
  type: MessageType,
  message: string
}

export default function MessageBox({ type, message }: Props) {
  return <div className={`message ${type}`}>
    {getMessageIcon(type)}
    <p>{message}</p>
  </div>
}
