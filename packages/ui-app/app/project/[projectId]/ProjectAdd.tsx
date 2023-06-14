'use client'

import { Form, Modal, Button } from "@shared/ui"
import { useFormik } from "formik"
import { useState } from "react"
import { HiOutlinePlusSm } from "react-icons/hi"
import { quickAddProject } from "../../services/project"

export default function ProjectAdd() {
	const [visible, setVisible] = useState(false)
	const formik = useFormik({
		initialValues: {
			name: "",
			desc: "",
		},
		onSubmit: values => {
			console.log(values)
			setVisible(false)
			quickAddProject(values)
		}
	})

	return <>
		<Modal
			visible={visible}
			onVisibleChange={setVisible}
			title="Create new project"
			triggerBy={<div>
				<HiOutlinePlusSm className="section-icon" />
			</div>}
			content={<>
				<form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
					<Form.Input title="Project name" name="name" onChange={formik.handleChange} value={formik.values.name} />
					<Form.Textarea title="Desciption" name="desc" onChange={formik.handleChange} value={formik.values.desc} />
					<div className="flex justify-end">
						<Button title="Create new" block primary />
					</div>
				</form>
			</>} />
	</>
}
