import * as Dialog from "@radix-ui/react-dialog";
import { MdClose } from "react-icons/md";
import "./styles.css";
import { SetStateAction, useEffect, useState } from "react";

interface ModalProps {
	triggerBy: React.ReactNode
	title: string
	desc?: string
	visible?: boolean
	onVisibleChange?: React.Dispatch<(SetStateAction<boolean>)>
	content: React.ReactNode
	backdrop?: boolean
}

export default function Modal({ triggerBy, visible = false, onVisibleChange, title, desc, content, backdrop = true }: ModalProps) {

	return <>
		<Dialog.Root open={visible} onOpenChange={onVisibleChange}>
			<Dialog.Trigger asChild>
				{triggerBy}
			</Dialog.Trigger>
			<Dialog.Portal>
				{backdrop ? <Dialog.Overlay className="modal-overlay" /> : null}
				<Dialog.Content className="modal-content">
					{title ? <Dialog.Title className="modal-title">{title}</Dialog.Title> : null}
					{desc ?
						<Dialog.Description className="modal-desc">
							{desc}
						</Dialog.Description> : null}

					{content}

					<Dialog.Close asChild>
						<button className="modal-close" aria-label="Close">
							<MdClose />
						</button>
					</Dialog.Close>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>

	</>
}

Modal.Close = Dialog.Close
