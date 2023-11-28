import { Row } from 'read-excel-file'
import { Button, DropdownMenu, Modal } from '@shared/ui'
import { useEffect, useState } from 'react'
import { AiOutlineCloudUpload, AiOutlineFileText } from 'react-icons/ai'
import { PiFileCsv, PiMicrosoftExcelLogo, PiTableLight } from 'react-icons/pi'
import TaskImportPreview from './TaskImportPreview'
import TaskImportArea from './TaskImportArea'
import { TaskImportProvider } from './context'
import TaskImportCsvFormat from './TaskImportCsvFormat'
import './style.css'
import { HiOutlineDotsHorizontal } from 'react-icons/hi'

export default function TaskImport() {
  const [visible, setVisible] = useState(false)
  const [csvVisible, setCsvVisible] = useState(false)
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
        <div>
          <DropdownMenu>
            <DropdownMenu.Trigger
              className="btn-trigger-no-border"
              icon={<HiOutlineDotsHorizontal />}
              title=""
            />
            <DropdownMenu.Content>
              <DropdownMenu.Item
                onClick={() => setVisible(true)}
                title={
                  <div className="flex items-center gap-2">
                    <PiMicrosoftExcelLogo className="w-5 h-5 text-gray-600" />
                    Import .xlsx file
                  </div>
                }
              />
              <DropdownMenu.Item
                onClick={() => setCsvVisible(true)}
                title={
                  <div className="flex items-center gap-2">
                    <PiTableLight className="w-5 h-5 text-gray-600" />
                    Import .csv format
                  </div>
                }
              />
              {/* <DropdownMenu.Item */}
              {/*   disabled={true} */}
              {/*   title={ */}
              {/*     <div className="flex items-center gap-2"> */}
              {/*       <PiFileCsv className="w-5 h-5 text-gray-600" /> */}
              {/*       From .csv file */}
              {/*     </div> */}
              {/*   } */}
              {/* /> */}
            </DropdownMenu.Content>
          </DropdownMenu>
        </div>
        <Modal
          visible={visible}
          onVisibleChange={setVisible}
          title="Import new tasks"
          className={isPreview ? 'task-import-modal' : ''}
          content={
            <div>
              {!isPreview ? <TaskImportArea /> : null}
              {isPreview ? <TaskImportPreview /> : null}
            </div>
          }
        />

        <TaskImportCsvFormat visible={csvVisible} setVisible={setCsvVisible} />
      </div>
    </TaskImportProvider>
  )
}
