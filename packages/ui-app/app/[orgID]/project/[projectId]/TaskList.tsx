import { useTaskStore } from 'packages/ui-app/store/task'
import ListMode from './views/ListMode'
import readXlsxFile from 'read-excel-file'
import { useMemberStore } from 'packages/ui-app/store/member'
import { useProjectStatusStore } from 'packages/ui-app/store/status'
import { taskAddMany } from 'packages/ui-app/services/task'
import { messageError } from '@shared/ui'
import { useParams } from 'next/navigation'

export default function TaskList() {
  const { addTasks, addAllTasks } = useTaskStore()
  const { members } = useMemberStore()
  const { statuses } = useProjectStatusStore()
  const params = useParams()
  console.log({ members })
  console.log({ statuses })

  const importExcel = async (e: any) => {
    const fileTypes = ['xlsx']
    const file = e.target.files[0]
    const filename = file.name
    const extension = filename.split('.').pop().toLowerCase()

    const isSuccess = fileTypes.indexOf(extension) > -1

    if (isSuccess) {
      let data = await readXlsxFile(file)
        .then(rows => rows)
        .catch(error => error)
      try {
        if (data.length > 0) {
          data.shift()
          data = data.map((row: any) => ({
            projectId: row[0],
            title: row[1],
            // member.name is not unique
            assigneeIds:
              members
                .filter(member =>
                  row[2].split(', ').includes(member.name?.trim())
                )
                .map(member => member.id) || null,
            dueDate: new Date(row[3]),
            priority: row[4] && row[4].toUpperCase(),
            taskPoint: parseInt(row[5]),
            taskStatusId:
              statuses.filter(
                status => status.name.trim() === row[6].trim()
              )?.[0]?.id || null
          }))

          console.log({ data })
          addTasks(data)
          taskAddMany({ data, projectId: params.projectId })
            .then(res => {
              const { data, status, error } = res.data
              if (status !== 200) {
                messageError(error)
                return
              }
              // addAllTasks(data)
              console.log('add success response: ', data)
            })
            .catch(err => console.log({ err }))
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
  return (
    <div>
      <div>
        <form>
          <label htmlFor="file">Tải lên .xlxs</label>
          <input
            type="file"
            name="file"
            id="file"
            onChange={e => importExcel(e)}
          />
        </form>
      </div>
      <ListMode />
    </div>
  )
}
