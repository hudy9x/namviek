import MemberPicker from '@/components/MemberPicker'
import { useMemberStore } from '@/store/member'
import { Task, TaskPriority } from '@prisma/client'
import {
  Button,
  DatePicker,
  Form,
  Modal,
  messageError,
  messageSuccess,
  messageWarning,
  setFixLoading
} from '@ui-components'
import { format } from 'date-fns'
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState
} from 'react'

export default function TaskImportCsvFormat({
  visible,
  setVisible
}: {
  visible: boolean
  setVisible: Dispatch<SetStateAction<boolean>>
}) {
  const [hide, setHide] = useState(false)
  const [headers, setHeaders] = useState<string[]>([])
  const [taskDatas, setTaskDatas] = useState<Partial<Task>[]>([])
  const { members } = useMemberStore()
  const { tasks } = useTaskStore()
  const { updateTaskData } = useServiceTaskUpdate()

  useEffect(() => {
    if (!visible) {
      setHide(false)
      setTaskDatas([])
      setHeaders([])
    }
  }, [visible])

  




  return (
    <Modal
      size="xl"
      visible={visible}
      onVisibleChange={setVisible}
      title="Insert data using .csv format"
      content={
        <div>
          
          Import csv format
        </div>
      }
    />
  )
}
