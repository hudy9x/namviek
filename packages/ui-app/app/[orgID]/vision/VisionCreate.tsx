import { useTaskStore } from '@/store/task'
import { Button, Modal } from '@shared/ui'
import { useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import VisionForm from './VisionForm'

export default function VisionCreate() {
  const { addOneTask, syncRemoteTaskById } = useTaskStore()
  const [visible, setVisible] = useState(false)

  const handleSubmit = (v: any) => {

    console.log('formData:', v)

    setVisible(false)
    //   addOneTask({
    //     ...v,
    //     ...{
    //       id: randomId
    //     }
    //   })

    //   taskAdd(v)
    //     .then(res => {
    //       const { data, status } = res.data
    //       if (status !== 200) return

    //       syncRemoteTaskById(randomId, data as Task)
    //       messageSuccess('Synced success !')
    //     })
    //     .catch(err => {
    //       messageError('Create new task error')
    //       console.log(err)
    //     })
    //     .finally(() => {
    //       // setLoading(false)
    //     })
  }

  return (
    <div>
      <Modal
        visible={visible}
        onVisibleChange={setVisible}
        title="Add a new vision"
        triggerBy={
          <div>
            <Button
              primary
              leadingIcon={<AiOutlinePlus />}
              title="Create vision"
              className="fixed-craete-btn"
            />
          </div>
        }
        content={
          <>
            <VisionForm onSubmit={v => handleSubmit(v)} />
          </>
        }
      />
    </div>
  )
}
