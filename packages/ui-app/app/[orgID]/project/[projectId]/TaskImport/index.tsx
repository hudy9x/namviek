import { Row } from 'read-excel-file'
import { Button, Modal } from '@shared/ui'
import { useEffect, useState } from 'react'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import TaskImportPreview from './TaskImportPreview'
import TaskImportArea from './TaskImportArea'
import { TaskImportProvider } from './context'

export default function TaskImport() {
  const [visible, setVisible] = useState(false)
  const [rows, setRows] = useState<Row[]>([])
  const [step, setStep] = useState(0)
  const isPreview = !!rows.length

  useEffect(() => {
    if (!visible && rows.length) {
      setRows([])
      setStep(0)
    }
  }, [visible, rows])

  return (
    <TaskImportProvider
      value={{
        step,
        setStep,
        setVisible,
        rows,
        setRows
      }}>
      <div>
        <Modal
          visible={visible}
          onVisibleChange={setVisible}
          title="Import new tasks"
          className={isPreview ? 'task-import-modal' : ''}
          triggerBy={
            <Button
              size="sm"
              leadingIcon={
                <AiOutlineCloudUpload style={{ width: 17, height: 17 }} />
              }
            />
          }
          content={
            <div>
              {!isPreview ? <TaskImportArea /> : null}
              {isPreview ? <TaskImportPreview /> : null}
            </div>
          }
        />
      </div>
    </TaskImportProvider>
  )
}
