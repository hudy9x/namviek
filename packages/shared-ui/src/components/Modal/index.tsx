import * as Dialog from "@radix-ui/react-dialog";
import { MdClose } from "react-icons/md";
import "./styles.css";

interface ModalProps {
	triggerBy: React.ReactNode
	title: string
	desc?: string
	content: React.ReactNode
	backdrop?: boolean
}

export default function Modal({ triggerBy, title, desc, content, backdrop = true }: ModalProps) {
	return <>
		<Dialog.Root>
			<Dialog.Trigger asChild>
				{triggerBy}
			</Dialog.Trigger>
			<Dialog.Portal>
				{backdrop ? <Dialog.Overlay className="DialogOverlay" /> : null}
				<Dialog.Content className="DialogContent">
					{title ? <Dialog.Title className="DialogTitle">{title}</Dialog.Title> : null}
					{desc ?
						<Dialog.Description className="DialogDescription">
							{desc}
						</Dialog.Description> : null}

					{content}

					<Dialog.Close asChild>
						<button className="IconButton" aria-label="Close">
							<MdClose />
						</button>
					</Dialog.Close>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>

	</>
}

Modal.Close = Dialog.Close
