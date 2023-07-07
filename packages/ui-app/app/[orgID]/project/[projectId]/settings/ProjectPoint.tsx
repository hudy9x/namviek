import { useParams, useRouter } from 'next/navigation'
import { TaskPoint } from '@prisma/client'
import { Input } from 'packages/shared-ui/src/components/Controls'
import { AiOutlineStar } from 'react-icons/ai'
import { CiEdit } from 'react-icons/ci'
import { RiDeleteBinLine } from 'react-icons/ri'
import { useCallback, useEffect, useRef, useState } from 'react'
import { taskPointCreate, taskPointGet } from 'packages/ui-app/services/setting/point'

export default function ProjectPoint() {
	const [taskPointList, setTaskPointList] = useState<TaskPoint[]>([])
	const inputAddRef = useRef<HTMLInputElement>(null)
	const { projectId } = useParams()

	useEffect(() => {
		;(async function () {
			const { data: _points } = (await taskPointGet(projectId)).data
			setTaskPointList([..._points])
		})()
	}, [projectId])

	const deletePointItem = (id: string) => {
		setTaskPointList(currentList => currentList.filter(item => item.id !== id))
		handleUpdate()
		inputAddRef.current?.focus()
	}

	const handleUpdate = useCallback(() => {
		// console.log({ taskPointList });
		// dat null cho {icon}
	}, [])

	const handleAddNew = useCallback(
		async (v: number | undefined) => {
			if (v) {
				const { data } = (await taskPointCreate({ point: v, projectId } as Pick<TaskPoint, 'point' | 'projectId'>)).data
				if (data) {
					setTaskPointList(currentList => [...currentList, data])
					if (inputAddRef.current?.value) inputAddRef.current.value = ''
					inputAddRef.current?.focus()
					console.log(inputAddRef.current)
				}
			}
		},
		[projectId]
	)

	return (
		<div>
			<h2>Project Status</h2>
			<p>
				Story points are used to measured the ...
				<br />
				For instance: <b>1, 2, 3, 5, ... 100</b>{' '}
			</p>
			<div className="rounded-lg border">
				<div className="relative flex items-center">
					<AiOutlineStar className="absolute" />
					<input type="text" className="w-full" />
					<div className="absolute flex right-0">
						<CiEdit className="cursor-pointer" onClick={() => console.log('yolo')} />
						<RiDeleteBinLine className="cursor-pointer" onClick={() => deletePointItem(item.id)} />
					</div>
				</div>

				<div
					onKeyDown={e => {
						if (e.key === 'Enter' && inputAddRef.current?.value) {
							handleAddNew(parseInt(inputAddRef.current.value))
						}
					}}></div>
			</div>
		</div>
	)
}
