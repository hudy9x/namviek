'use client'

import { Button, Form, useForm } from "@shared/ui";
import { validateRegisterUser } from "@shared/validation";
import Link from "next/link";

export default function SignupForm() {
	const { regField, regHandleSubmit } = useForm({
		values: {
			email: '',
			password: '',
			name: ''
		},
		validateFn: (values) => {
			return validateRegisterUser(values)
		},
		onSubmit: (values) => {
			console.log(values)
		}
	})



	return <div className="h-screen w-screen flex items-center justify-center ">
		<div className="flex rounded-md border-2 border-indigo-300 shadow-2xl shadow-indigo-200">

			{/* <div className="w-[400px] bg-white p-4 pr-0 rounded-md"> */}
			{/* 	<div className="bg-indigo-100 rounded-md p-8 h-full"> */}
			{/* 		<div className="flex gap-2 items-center"> */}
			{/* 			<h2 className="logo rounded-md bg-indigo-500 w-5 h-5 flex items-center justify-center"> */}
			{/* 				<span className="rounded-sm bg-white w-2 h-2 inline-block"></span> */}
			{/* 			</h2> */}
			{/* 			<span className="text-sm font-bold text-indigo-800">Kampuni</span> */}
			{/* 		</div> */}
			{/* 		<h2 className="font-bold text-2xl mt-8">Let us help you run your startup.</h2> */}
			{/* 		<p className="text-indigo-800 text-sm mt-6">Our registration process is quick and easy, taking no more than 10 minutes to complete.</p> */}
			{/* 	</div> */}
			{/* </div> */}
			<form onSubmit={regHandleSubmit} className="bg-white p-8 w-[400px] rounded-md">

				<h2 className="text-2xl font-bold">Let's get started</h2>
				<p className="text-gray-400 text-sm mt-3">Create your own account here.</p>

				<div className="flex flex-col gap-4 mt-6">
					<Form.Input title="Fullname" {...regField('name')} />
					<Form.Input title="Email" {...regField('email')} />
					<Form.Input title="Password" type="password" {...regField('password')} />
					<Button title="Sign up" type="submit" block primary />
				</div>

				<div className="mt-6 text-center text-gray-400 text-sm">Have a account ? <Link className="text-indigo-600 hover:underline" href={"/sign-in"}>Login</Link></div>

			</form>
		</div>


		{/* <SignUp /> */}
	</div>;
}
