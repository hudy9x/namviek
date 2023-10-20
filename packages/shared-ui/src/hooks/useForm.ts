import { FormikConfig, useFormik, FormikValues } from "formik";
import { ParseResult } from "@shared/validation";
import { useState } from "react";

type UseFormValues = {
	[key: string]: any
}

interface IUseForm {
	values: UseFormValues
	validateFn?: (values: UseFormValues) => ParseResult,
	onSubmit: (values: UseFormValues) => void
}

export default function useForm(config: IUseForm) {
	const [loading, setLoading] = useState(false)
	const formik = useFormik<typeof config.values>({
		initialValues: config.values,
		onSubmit: (values) => {
			setLoading(true)
			if (config.validateFn) {
				const {error, errorArr, data} = config.validateFn(values)

				console.log(error, errorArr)

				if (error) {
					formik.setErrors(errorArr)
					setLoading(false)
					return
				}
			}
			
			config.onSubmit(values)
			setLoading(false)
		}

	})

	const regField = (name: string) => {
		return { 
			name, 
			error: formik.errors[name] as string,
			value: formik.values[name], 
			onChange: formik.handleChange,
		}
	}

	return {
		loading,
		regField,
		regHandleSubmit: formik.handleSubmit,
	}

}
