'use client'

import { useOrganizationList } from "@clerk/nextjs"
import { Form } from "@shared/ui"
import { useFormik } from "formik"

export default function CreateOrganization() {
	const {createOrganization} = useOrganizationList()
	const formik = useFormik({
		initialValues: {
			name: '',
			
		}
	})
	return <div>
		<Form.Input />
	</div>
}
