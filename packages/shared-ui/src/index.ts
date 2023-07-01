// Use this file to export React client components (e.g. those with 'use client' directive) or other non-server utilities

import ModalComp from "./components/Modal";
import * as FormControls from "./components/Controls"
import ButtonControl from "./components/Button"
import {LoadingSpinner} from "./components/Loading";
import useFormHook from "./hooks/useForm"
import AvatarContainer from "./components/Avatar";

export { messageInfo, messageError, messageSuccess, messageWarning } from "./components/Message";


export const Modal = ModalComp
export const Form = FormControls
export const Button = ButtonControl
export const useForm = useFormHook
export const Loading = LoadingSpinner
export const Avatar = AvatarContainer

