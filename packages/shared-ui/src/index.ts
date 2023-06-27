// Use this file to export React client components (e.g. those with 'use client' directive) or other non-server utilities

import ModalComp from "./components/Modal";
import * as FormControls from "./components/Controls"
import ButtonControl from "./components/Button"
import {LoadingSpinner} from "./components/Loading";

export { messageInfo, messageError, messageSuccess, messageWarning } from "./components/Message";

import useFormHook from "./hooks/useForm"

export const Modal = ModalComp
export const Form = FormControls
export const Button = ButtonControl
export const useForm = useFormHook
export const Loading = LoadingSpinner

